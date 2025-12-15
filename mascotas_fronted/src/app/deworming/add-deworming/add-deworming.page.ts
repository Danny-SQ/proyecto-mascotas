import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-deworming',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './add-deworming.page.html',
  styleUrls: ['./add-deworming.page.scss']
})
export class AddDewormingPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;

  tipo = '';
  producto_utilizado = '';
  fecha_aplicacion = '';
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
    if (!this.fecha_aplicacion) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar una fecha de aplicación',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const data = {
      tipo: this.tipo,
      producto_utilizado: this.producto_utilizado,
      fecha_aplicacion: this.fecha_aplicacion,
      mascota_id: this.mascota_id
    };

    this.http.post('http://localhost:5000/api/desparasitaciones', data)
      .subscribe({
        next: () => this.navCtrl.navigateBack('/home-deworming'),
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo crear la desparasitación',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-deworming');
  }
}
