import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-deworming',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-deworming.page.html',
  styleUrls: ['./home-deworming.page.scss']
})
export class HomeDewormingPage {
  desparasitaciones: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');
    if (!cuidador?.id) return;

    this.http.get<any[]>(`http://localhost:5000/api/desparasitaciones/cuidador/${cuidador.id}`)
      .subscribe(data => this.desparasitaciones = data);
    
  }

  irAEditar(item: any) {
    this.navCtrl.navigateForward(`/edit-deworming/${item.id}`);
  }

  async verDetalles(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Detalles de Desparasitación',
      message:
        'Tipo: ' + item.tipo + '\n\n' +
        'Producto Utilizado: ' + item.producto_utilizado + '\n\n' +
        'Fecha Aplicación: ' + item.fecha_aplicacion,
      buttons: ['OK'],
      cssClass: 'pet-details-alert' // Aquí se agrega la clase CSS para aplicar los estilos
    });
    await alert.present();
  }

  async eliminar(id: number) {
    const confirm = await this.alertCtrl.create({
      header: '¿Eliminar?',
      message: '¿Deseas eliminar esta desparasitación?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:5000/api/desparasitaciones/${id}`)
              .subscribe(() => {
                this.navCtrl.navigateRoot('/home-deworming');
              });
          }
        }
      ]
    });
    await confirm.present();
  }
}
