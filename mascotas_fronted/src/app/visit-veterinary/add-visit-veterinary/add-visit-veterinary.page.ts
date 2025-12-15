import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-visit-veterinary',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './add-visit-veterinary.page.html',
  styleUrls: ['./add-visit-veterinary.page.scss']
})
export class AddVisitVeterinaryPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;

  fecha = '';
  motivo = '';
  mascota_id: number | null = null;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const stored = localStorage.getItem('cuidador');
    if (!stored) {
      this.navCtrl.navigateRoot('/login');
      return;
    }
    const cuidador = JSON.parse(stored);
    this.cuidadorId = cuidador.id;
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.http.get<any[]>(`http://localhost:5000/api/mascotas/cuidador/${this.cuidadorId}`)
      .subscribe({
        next: data => this.mascotas = data,
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudieron cargar las mascotas',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
  }

  async guardar() {
    if (!this.mascota_id) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe seleccionar una mascota',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.fecha) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar una fecha',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.motivo.trim()) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar el motivo',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const data = {
      fecha: this.fecha,
      motivo: this.motivo,
      mascota_id: this.mascota_id
    };

    this.http.post('http://localhost:5000/api/visitas', data)
      .subscribe({
        next: () => this.navCtrl.navigateBack('/home-visit-veterinary'),
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo crear la visita veterinaria',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-visit-veterinary');
  }
}
