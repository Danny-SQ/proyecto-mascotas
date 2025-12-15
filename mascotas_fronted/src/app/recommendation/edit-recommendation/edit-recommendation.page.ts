import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recommendation',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './edit-recommendation.page.html',
  styleUrls: ['./edit-recommendation.page.scss']
})
export class EditRecommendationPage {
  mascotas: any[] = [];
  cuidadorId: number | null = null;
  recommendationId: number | null = null;

  tipo = '';
  texto = '';
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

    this.recommendationId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.recommendationId) {
      this.navCtrl.navigateBack('/home-recommendation');
      return;
    }

    this.cargarMascotas();
    this.cargarRecomendacion();
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

  cargarRecomendacion() {
    this.http.get<any>(`http://localhost:5000/api/recomendaciones/${this.recommendationId}`)
      .subscribe({
        next: data => {
          this.tipo = data.tipo;
          this.texto = data.texto;
          this.mascota_id = data.mascota_id;
        },
        error: async () => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo cargar la recomendación',
            buttons: ['OK']
          });
          await alert.present();
          this.navCtrl.navigateBack('/home-recommendation');
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

    this.http.put(`http://localhost:5000/api/recomendaciones/${this.recommendationId}`, data)
      .subscribe({
        next: () => this.navCtrl.navigateBack('/home-recommendation'),
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
  this.navCtrl.navigateBack('/home-recommendation');
  }
}
