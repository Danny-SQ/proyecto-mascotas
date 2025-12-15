import { Component } from '@angular/core';
import { IonicModule, NavController, ActionSheetController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  cuidador: any = {};

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController // Inyecta ActionSheetController
  ) {}

  ionViewWillEnter() {
    const stored = localStorage.getItem('cuidador');
    if (stored) {
      this.cuidador = JSON.parse(stored);
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: this.cuidador.nombre_completo,
      subHeader: this.cuidador.direccion,
      cssClass: 'profile-action-sheet', // Agregamos la clase CSS
      buttons: [
        {
          text: 'Editar perfil',
          icon: 'create-outline',
          handler: () => {
            this.irAEditarPerfil();
          },
        },
        {
          text: 'Cerrar sesión',
          role: 'destructive',
          icon: 'log-out-outline',
          handler: () => {
            this.cerrarSesion();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
        },
      ],
    });
    await actionSheet.present();
  }

  irAHome() {
    this.navCtrl.navigateRoot('/home');
  }

  irAEditarPerfil() {
    this.navCtrl.navigateForward('/caregiver-edit');
  }

  irAGestionMascotas() {
    this.navCtrl.navigateForward('/home-pet');
  }

  irAAgregarMascotas() {
    this.navCtrl.navigateForward('/add-pet');
  }

  irAGestionActividades() {
    this.navCtrl.navigateForward('/home-daily-activity');
  }

  irAGestionDesparasitaciones() {
    this.navCtrl.navigateForward('/home-deworming');
  }

  irAGestionVisitas() {
    this.navCtrl.navigateForward('/home-visit-veterinary');
  }

  irAGestionVacunas() {
    this.navCtrl.navigateForward('/home-vaccine');
  }

  irAGestionRecordatorios() {
    this.navCtrl.navigateForward('/home-reminder');
  }

  irAGestionRecomendaciones() {
    this.navCtrl.navigateForward('/home-recommendation');
  }

  irAGestionServicios() {
    // lógica para navegar a servicios
  }

  irAGestionGraficos() {
    // lógica para navegar a gráficos
  }

  cerrarSesion() {
    localStorage.removeItem('cuidador');
    this.navCtrl.navigateRoot('/login');
  }
}
