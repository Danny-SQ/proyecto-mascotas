import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-vaccine',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './edit-vaccine.page.html',
  styleUrls: ['./edit-vaccine.page.scss']
})
export class EditVaccinePage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;
  vacunaId: number | null = null;

  tipo = '';
  fecha_aplicacion = '';
  dosis = '';
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

    this.vacunaId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.vacunaId) {
      this.navCtrl.navigateBack('/home-vaccine');
      return;
    }

    this.cargarMascotas();
    this.cargarVacuna();
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

  cargarVacuna() {
    this.http.get<any>(`http://localhost:5000/api/vacunas/${this.vacunaId}`)
      .subscribe({
        next: data => {
          this.tipo = data.tipo;
          this.fecha_aplicacion = data.fecha_aplicacion;
          this.dosis = data.dosis;
          this.mascota_id = data.mascota_id;
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo cargar la vacuna',
            buttons: ['OK']
          });
          await alert.present();
          this.navCtrl.navigateBack('/home-vaccine');
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
    if (!this.tipo.trim()) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar el tipo de vacuna',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.fecha_aplicacion) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar la fecha de aplicación',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const data = {
      tipo: this.tipo,
      fecha_aplicacion: this.fecha_aplicacion,
      dosis: this.dosis,
      mascota_id: this.mascota_id
    };

    this.http.put(`http://localhost:5000/api/vacunas/${this.vacunaId}`, data)
      .subscribe({
        next: () => this.navCtrl.navigateBack('/home-vaccine'),
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
  this.navCtrl.navigateBack('/home-vaccine');
  }
}
