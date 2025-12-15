import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-delete-deworming',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './delete-deworming.page.html',
})
export class DeleteDewormingPage {
  desparasitacionId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.desparasitacionId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.desparasitacionId) {
      this.navCtrl.navigateBack('/home-deworming');
    }
  }

  async eliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Está seguro de eliminar esta desparasitación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:5000/api/desparasitaciones/${this.desparasitacionId}`)
              .subscribe({
                next: () => this.navCtrl.navigateBack('/home-deworming'),
                error: async () => {
                  const errAlert = await this.alertCtrl.create({
                    header: 'Error',
                    message: 'No se pudo eliminar la desparasitación',
                    buttons: ['OK']
                  });
                  await errAlert.present();
                }
              });
          }
        }
      ]
    });
    await alert.present();
  }
}
