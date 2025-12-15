import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-visit-veterinary',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-visit-veterinary.page.html',
  styleUrls: ['./home-visit-veterinary.page.scss']
})
export class HomeVisitVeterinaryPage {
  visitas: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');
    if (!cuidador?.id) return;

    this.http.get<any[]>(`http://localhost:5000/api/visitas/cuidador/${cuidador.id}`)
      .subscribe(data => this.visitas = data);
  }

  irAEditar(item: any) {
    this.navCtrl.navigateForward(`/edit-visit-veterinary/${item.id}`);
  }

  async verDetalles(item: any) {
  const alert = await this.alertCtrl.create({
    header: 'Detalles de Visita Veterinaria',
    message:
      'Fecha: ' + item.fecha + '\n\n' +
      'Motivo: ' + item.motivo,
    buttons: ['OK'],
    cssClass: 'pet-details-alert'
  });
  await alert.present();
  }


  async eliminar(id: number) {
  const confirm = await this.alertCtrl.create({
    header: '¿Eliminar?',
    message: '¿Deseas eliminar esta visita veterinaria?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Eliminar',
        handler: () => {
          this.http.delete(`http://localhost:5000/api/visitas/${id}`)
            .subscribe(() => {
              this.navCtrl.navigateRoot('/home-visit-veterinary');
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
