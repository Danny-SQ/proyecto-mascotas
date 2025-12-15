import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-vaccine',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-vaccine.page.html',
  styleUrls: ['./home-vaccine.page.scss']
})
export class HomeVaccinePage {
  vacunas: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');
    if (!cuidador?.id) return;

    this.http.get<any[]>(`http://localhost:5000/api/vacunas/cuidador/${cuidador.id}`)
      .subscribe(data => this.vacunas = data);
  }

  irAEditar(item: any) {
    this.navCtrl.navigateForward(`/edit-vaccine/${item.id}`);
  }

  async verDetalles(item: any) {
  const alert = await this.alertCtrl.create({
    header: 'Detalles de Vacuna',
    message: `
      Tipo: ${item.tipo}
      Dosis: ${item.dosis}
      Fecha Aplicación: ${item.fecha_aplicacion.substring(0, 10)}
    `,
    buttons: ['OK'],
    cssClass: 'pet-details-alert'
  });
  await alert.present();
  }


  async eliminar(id: number) {
  const confirm = await this.alertCtrl.create({
    header: '¿Eliminar?',
    message: '¿Deseas eliminar esta vacuna?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        handler: () => {
          this.http.delete(`http://localhost:5000/api/vacunas/${id}`)
            .subscribe(() => {
              this.navCtrl.navigateRoot('/home-vaccine');
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
