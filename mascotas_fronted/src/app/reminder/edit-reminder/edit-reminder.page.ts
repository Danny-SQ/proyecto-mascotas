import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-reminder',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './edit-reminder.page.html',
  styleUrls: ['./edit-reminder.page.scss']
})
export class EditReminderPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;
  reminderId: number | null = null;

  titulo = '';
  tipo = '';
  fecha_hora = '';
  estado = '';
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

    this.reminderId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.reminderId) {
      this.navCtrl.navigateBack('/home-reminder');
      return;
    }

    this.cargarMascotas();
    this.cargarRecordatorio();
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

  cargarRecordatorio() {
    this.http.get<any>(`http://localhost:5000/api/recordatorios/${this.reminderId}`)
      .subscribe({
        next: data => {
          this.titulo = data.titulo;
          this.tipo = data.tipo;
          this.fecha_hora = data.fecha_hora;
          this.estado = data.estado;
          this.mascota_id = data.mascota_id;
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo cargar el recordatorio',
            buttons: ['OK']
          });
          await alert.present();
          this.navCtrl.navigateBack('/home-reminder');
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
    if (!this.titulo.trim()) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar el título',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.tipo.trim()) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar el tipo',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.fecha_hora) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar la fecha y hora',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const data = {
      titulo: this.titulo,
      tipo: this.tipo,
      fecha_hora: this.fecha_hora,
      estado: this.estado,
      mascota_id: this.mascota_id
    };

    this.http.put(`http://localhost:5000/api/recordatorios/${this.reminderId}`, data)
      .subscribe({
        next: () => this.navCtrl.navigateBack('/home-reminder'),
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
  this.navCtrl.navigateBack('/home-reminder');
  }
}
