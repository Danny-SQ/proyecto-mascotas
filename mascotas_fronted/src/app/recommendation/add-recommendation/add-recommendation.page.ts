import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-recommendation',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './add-recommendation.page.html',
  styleUrls: ['./add-recommendation.page.scss']
})
export class AddRecommendationPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;

  tipo = '';
  texto = '';
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
    if (!this.tipo.trim()) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar el tipo',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.texto.trim()) {
      const alert = await this.alertCtrl.create({
        header: 'Validación',
        message: 'Debe ingresar el texto',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const data = {
      tipo: this.tipo,
      texto: this.texto,
      mascota_id: this.mascota_id
    };

    this.http.post('http://localhost:5000/api/recomendaciones', data)
      .subscribe({
        next: () => this.navCtrl.navigateBack('/home-recommendation'),
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo crear la recomendación',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-recommendation');
  }
}
