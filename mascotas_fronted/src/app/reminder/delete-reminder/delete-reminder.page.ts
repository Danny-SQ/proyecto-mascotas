import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-reminder',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './delete-reminder.page.html',
})
export class DeleteReminderPage {
  reminderId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.reminderId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.reminderId) {
      this.navCtrl.navigateBack('/home-reminder');
    }
  }

  async eliminar() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Está seguro de eliminar este recordatorio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:5000/api/recordatorios/${this.reminderId}`)
              .subscribe({
                next: () => this.navCtrl.navigateBack('/home-reminder'),
                error: async () => {
                  const errAlert = await this.alertCtrl.create({
                    header: 'Error',
                    message: 'No se pudo eliminar el recordatorio',
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
