import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-deworming',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './edit-deworming.page.html',
  styleUrls: ['./edit-deworming.page.scss']
})
export class EditDewormingPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;
  desparasitacionId: number | null = null;

  tipo = '';
  producto_utilizado = '';
  fecha_aplicacion = '';
  mascota_id: number | null = null;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    const stored = localStorage.getItem('cuidador');
    if (!stored) {
      this.navCtrl.navigateRoot('/login');
      return;
    }
    const cuidador = JSON.parse(stored);
    this.cuidadorId = cuidador.id;

    this.desparasitacionId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.desparasitacionId) {
      this.navCtrl.navigateBack('/home-deworming');
      return;
    }

    this.cargarMascotas();
    this.cargarDesparasitacion();
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

  cargarDesparasitacion() {
    this.http.get<any>(`http://localhost:5000/api/desparasitaciones/${this.desparasitacionId}`)
      .subscribe({
        next: data => {
          this.tipo = data.tipo;
          this.producto_utilizado = data.producto_utilizado;
          this.fecha_aplicacion = data.fecha_aplicacion;
          this.mascota_id = data.mascota_id;
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo cargar la desparasitación',
            buttons: ['OK']
          });
          await alert.present();
          this.navCtrl.navigateBack('/home-deworming');
        }
      });
  }

  async guardarCambios() {
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

    this.http.put(`http://localhost:5000/api/desparasitaciones/${this.desparasitacionId}`, data)
      .subscribe({
        next: () => this.navCtrl.navigateBack('/home-deworming'),
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudieron guardar los cambios',
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
