import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  cuidador = {
    nombre_completo: '',
    correo: '',
    contrasena: '',
    telefono: '',
    rol: '',
    direccion: '',
    foto_perfil: ''
  };

  constructor(private http: HttpClient, private navCtrl: NavController, private alertCtrl: AlertController) {}

  async registrar() {
    try {
      await this.http.post<any>('http://localhost:5000/api/cuidadores', this.cuidador).toPromise();
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Registro completado',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateRoot('/login');

      // Después de navegar con éxito, también podemos limpiar el formulario
      this.resetForm();
      
    } catch (err) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo registrar',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Nuevo método para restablecer el formulario
  resetForm() {
    this.cuidador = {
      nombre_completo: '',
      correo: '',
      contrasena: '',
      telefono: '',
      rol: '',
      direccion: '',
      foto_perfil: ''
    };
  }

  // Hook del ciclo de vida de Ionic para restablecer el formulario
  // cuando el usuario navega fuera de la página
  ionViewWillLeave() {
    this.resetForm();
  }
}
