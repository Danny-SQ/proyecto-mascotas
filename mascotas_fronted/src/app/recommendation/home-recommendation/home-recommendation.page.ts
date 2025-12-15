import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-recommendation',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-recommendation.page.html',
  styleUrls: ['./home-recommendation.page.scss']
})
export class HomeRecommendationPage {
  recomendaciones: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');
    if (!cuidador?.id) return;

    this.http.get<any[]>(`http://localhost:5000/api/recomendaciones/cuidador/${cuidador.id}`)
      .subscribe(data => this.recomendaciones = data);
  }

  irAEditar(recomendacion: any) {
    this.navCtrl.navigateForward(`/edit-recommendation/${recomendacion.id}`);
  }

  async verDetalles(item: any) {
  const alert = await this.alertCtrl.create({
    header: 'Detalles de la Recomendación',
    message:
      'Tipo: ' + item.tipo + '\n\n' +
      'Texto: ' + item.texto,
    buttons: ['OK'],
    cssClass: 'pet-details-alert'
  });
  await alert.present();
  }


  async eliminar(id: number) {
  const confirm = await this.alertCtrl.create({
    header: '¿Eliminar?',
    message: '¿Deseas eliminar esta recomendación?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        handler: () => {
          this.http.delete(`http://localhost:5000/api/recomendaciones/${id}`)
            .subscribe(() => {
              this.navCtrl.navigateRoot('/home-recommendation');
            });
        }
      }
    ]
  });
  await confirm.present();
  }


  irAHomePrincipal() {
  this.navCtrl.navigateRoot('/home');
  }
}
