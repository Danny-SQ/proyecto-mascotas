import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home-daily-activity',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-daily-activity.page.html',
  styleUrls: ['./home-daily-activity.page.scss']
})
export class HomeDailyActivityPage {
  actividades: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');
    if (!cuidador?.id) return;

    // Obtener todas las actividades de las mascotas del cuidador
    this.http.get<any[]>(`http://localhost:5000/api/actividades/cuidador/${cuidador.id}`)
      .subscribe(data => this.actividades = data);
  }

  irAEditar(actividad: any) {
    this.navCtrl.navigateForward(`/edit-daily-activity/${actividad.id}`);
  }

  async verDetalles(actividad: any) {
  const alert = await this.alertCtrl.create({
    header: 'Detalles de Actividad Diaria',
    message:
      'Fecha: ' + actividad.fecha + '\n\n' +
      'Comidas Programadas: ' + actividad.comidas_programadas + '\n\n' +
      'Comidas Cumplidas: ' + actividad.comidas_cumplidas + '\n\n' +
      'Actividad Realizada: ' + (actividad.actividad_realizada ? 'Sí' : 'No') + '\n\n' +
      'Tiempo Actividad: ' + actividad.tiempo_actividad + ' min\n\n' +
      'Observaciones: ' + (actividad.observaciones || 'Ninguna'),
    buttons: ['OK'],
    cssClass: 'pet-details-alert'
  });
  await alert.present();
  }


  async eliminar(id: number) {
  const confirm = await this.alertCtrl.create({
    header: '¿Eliminar?',
    message: '¿Deseas eliminar esta actividad diaria?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        handler: () => {
          this.http.delete(`http://localhost:5000/api/actividades/${id}`)
            .subscribe(() => {
              // Redirigir al home de actividades después de eliminar
              this.navCtrl.navigateRoot('/home-daily-activity');
            });
        }
      }
    ],
    cssClass: 'delete-alert'
  });
  await confirm.present();
}


  irAHomePrincipal() {
  this.navCtrl.navigateRoot('/home');
  }
}

