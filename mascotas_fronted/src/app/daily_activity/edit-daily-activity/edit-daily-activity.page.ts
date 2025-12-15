import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-daily-activity',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './edit-daily-activity.page.html',
  styleUrls: ['./edit-daily-activity.page.scss']
})
export class EditDailyActivityPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;

  actividadId: number | null = null;

  // Campos formulario
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

    this.actividadId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.actividadId) {
      this.navCtrl.navigateBack('/home-daily-activity');
      return;
    }

    this.cargarMascotas();
    this.cargarActividad();
  }

  cargarMascotas() {
    this.http
      .get<any[]>(`http://localhost:5000/api/mascotas/cuidador/${this.cuidadorId}`)
      .subscribe({
        next: (data) => (this.mascotas = data),
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudieron cargar las mascotas',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }

  cargarActividad() {
    this.http
      .get<any>(`http://localhost:5000/api/actividades/${this.actividadId}`)
      .subscribe({
        next: (data) => {
          this.fecha = data.fecha;
          this.comidas_programadas = data.comidas_programadas;
          this.comidas_cumplidas = data.comidas_cumplidas;
          this.actividad_realizada = data.actividad_realizada;
          this.tiempo_actividad = data.tiempo_actividad;
          this.observaciones = data.observaciones;
          this.mascota_id = data.mascota_id;
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo cargar la actividad',
            buttons: ['OK'],
          });
          await alert.present();
          this.navCtrl.navigateBack('/home-daily-activity');
        },
      });
  }

  async guardarCambios() {
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

    this.http
      .put(`http://localhost:5000/api/actividades/${this.actividadId}`, data)
      .subscribe({
        next: () => {
          this.navCtrl.navigateBack('/home-daily-activity');
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudieron guardar los cambios',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-daily-activity');
  }
}
