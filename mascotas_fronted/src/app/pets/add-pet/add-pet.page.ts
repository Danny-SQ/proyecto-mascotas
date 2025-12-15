import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss']
})
export class AddPetPage {
  nombre = '';
  especie = '';
  raza = '';
  fecha_nacimiento = new Date().toISOString(); 
  sexo = '';
  peso: number | null = null;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async agregarMascota() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');

    if (!cuidador?.id) {
      const alerta = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se encontró el cuidador en sesión',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    const mascota = {
      nombre: this.nombre,
      especie: this.especie,
      raza: this.raza,
      fecha_nacimiento: this.fecha_nacimiento,
      sexo: this.sexo,
      peso: this.peso,
      cuidador_id: cuidador.id
    };

    try {
      await this.http.post('http://localhost:5000/api/mascotas', mascota).toPromise();
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Mascota registrada correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/home');
    } catch {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo registrar la mascota',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-pet');
  }
}
