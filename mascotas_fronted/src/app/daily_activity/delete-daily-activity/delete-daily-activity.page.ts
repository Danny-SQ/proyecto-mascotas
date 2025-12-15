import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-daily-activity',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `<ion-content class="ion-padding"><ion-button expand="full" color="danger" (click)="eliminar()">Eliminar Actividad</ion-button></ion-content>`
})
export class DeleteDailyActivityPage {
  id: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  }

  async eliminar() {
    try {
      await this.http.delete(`http://localhost:5000/api/actividades/${this.id}`).toPromise();
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Actividad eliminada',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/home');
    } catch {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo eliminar',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-daily-activity');
  }
}
