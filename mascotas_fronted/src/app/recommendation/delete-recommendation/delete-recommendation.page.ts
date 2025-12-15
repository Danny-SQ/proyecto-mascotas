import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-recommendation',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './delete-recommendation.page.html',
})
export class DeleteRecommendationPage {
  recommendationId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.recommendationId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.recommendationId) {
      this.navCtrl.navigateBack('/home-recommendation');
    }
  }

  async eliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Está seguro de eliminar esta recomendación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:5000/api/recomendaciones/${this.recommendationId}`)
              .subscribe({
                next: () => this.navCtrl.navigateBack('/home-recommendation'),
                error: async () => {
                  const errAlert = await this.alertCtrl.create({
                    header: 'Error',
                    message: 'No se pudo eliminar la recomendación',
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
