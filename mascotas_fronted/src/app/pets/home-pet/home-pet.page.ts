import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-pet',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './home-pet.page.html',
  styleUrls: ['./home-pet.page.scss']
})
export class HomePetPage {
  mascotas: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    const cuidador = JSON.parse(localStorage.getItem('cuidador') || '{}');
    if (!cuidador?.id) return;

    this.http.get<any[]>(`http://localhost:5000/api/mascotas/cuidador/${cuidador.id}`)
      .subscribe(data => this.mascotas = data);
  }

  irAEditarMascota(mascota: any) {
    this.navCtrl.navigateForward(`/edit-pet/${mascota.id}`);
  }

async verDetalles(mascota: any) {
  const alert = await this.alertCtrl.create({
    header: 'Detalles de la mascota',
    message: `
      Nombre: ${mascota.nombre}
      Especie: ${mascota.especie}
      Raza: ${mascota.raza}
      Fecha de Nacimiento: ${mascota.fecha_nacimiento.substring(0, 10)}
      Sexo: ${mascota.sexo}
      Peso: ${mascota.peso} kg
    `,
    buttons: ['OK'],
    cssClass: 'pet-details-alert'
  });
  await alert.present();
}

  irAHomePrincipal() {
  this.navCtrl.navigateRoot('/home');
  }
}
