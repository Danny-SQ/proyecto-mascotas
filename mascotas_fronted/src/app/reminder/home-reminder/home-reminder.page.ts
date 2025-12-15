import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-reminder',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-reminder.page.html',
  styleUrls: ['./home-reminder.page.scss']
})
export class HomeReminderPage {
  recordatorios: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');
    if (!cuidador?.id) return;

    this.http.get<any[]>(`http://localhost:5000/api/recordatorios/cuidador/${cuidador.id}`)
      .subscribe(data => this.recordatorios = data);
  }

  irAEditar(item: any) {
    this.navCtrl.navigateForward(`/edit-reminder/${item.id}`);
  }

  async verDetalles(item: any) {
  const alert = await this.alertCtrl.create({
    header: 'Detalles del Recordatorio',
    message:
      'Título: ' + item.titulo + '\n\n' +
      'Tipo: ' + item.tipo + '\n\n' +
      'Fecha y Hora: ' + item.fecha_hora + '\n\n' +
      'Estado: ' + item.estado,
    buttons: ['OK'],
    cssClass: 'pet-details-alert'
  });
  await alert.present();
  }


  async eliminar(id: number) {
    const confirm = await this.alertCtrl.create({
      header: '¿Eliminar?',
      message: '¿Deseas eliminar este recordatorio?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:5000/api/recordatorios/${id}`)
              .subscribe(() => this.ionViewWillEnter());
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
