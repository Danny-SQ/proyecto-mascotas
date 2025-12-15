import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-daily-activity',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './add-daily-activity.page.html',
  styleUrls: ['./add-daily-activity.page.scss']
})
export class AddDailyActivityPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;

  // Campos del formulario
  fecha = '';
  comidas_programadas: number | null = null;
  comidas_cumplidas: number | null = null;
  actividad_realizada = false;
  tiempo_actividad: number | null = null;
  observaciones = '';
  mascota_id: number | null = null;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const stored = localStorage.getItem('cuidador');
    if (stored) {
      const cuidador = JSON.parse(stored);
      this.cuidadorId = cuidador.id;
      this.cargarMascotas();
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  cargarMascotas() {
    this.http
      .get<any[]>(`http://localhost:5000/api/mascotas/cuidador/${this.cuidadorId}`)
      .subscribe(
        (data) => {
          this.mascotas = data;
        },
        async (error) => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudieron cargar las mascotas',
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
  }

  async guardarActividad() {
    if (!this.mascota_id) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe seleccionar una mascota',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const data = {
      fecha: this.fecha,
      comidas_programadas: this.comidas_programadas,
      comidas_cumplidas: this.comidas_cumplidas,
      actividad_realizada: this.actividad_realizada,
      tiempo_actividad: this.tiempo_actividad,
      observaciones: this.observaciones,
      mascota_id: this.mascota_id,
    };

    this.http.post('http://localhost:5000/api/actividades', data).subscribe(
      () => {
        this.navCtrl.navigateBack('/home-daily-activity');
      },
      async () => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo guardar la actividad',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-daily-activity');
  }
}
