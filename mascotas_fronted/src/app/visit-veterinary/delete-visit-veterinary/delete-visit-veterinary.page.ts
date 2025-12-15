import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-visit-veterinary',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './delete-visit-veterinary.page.html',
})
export class DeleteVisitVeterinaryPage {
  visitaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.visitaId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.visitaId) {
      this.navCtrl.navigateBack('/home-visit-veterinary');
    }
  }

  async eliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Está seguro de eliminar esta visita veterinaria?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:5000/api/visitas/${this.visitaId}`)
              .subscribe({
                next: () => this.navCtrl.navigateBack('/home-visit-veterinary'),
                error: async () => {
                  const errAlert = await this.alertCtrl.create({
                    header: 'Error',
                    message: 'No se pudo eliminar la visita veterinaria',
                    buttons: ['OK'],
                    cssClass: 'pet-details-alert'
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
