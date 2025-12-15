import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-vaccine',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './delete-vaccine.page.html',
})
export class DeleteVaccinePage {
  vacunaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.vacunaId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.vacunaId) {
      this.navCtrl.navigateBack('/home-vaccine');
    }
  }

  async eliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Está seguro de eliminar esta vacuna?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:5000/vacunas/${this.vacunaId}`)
              .subscribe({
                next: () => this.navCtrl.navigateBack('/home-vaccine'),
                error: async () => {
                  const errAlert = await this.alertCtrl.create({
                    header: 'Error',
                    message: 'No se pudo eliminar la vacuna',
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
