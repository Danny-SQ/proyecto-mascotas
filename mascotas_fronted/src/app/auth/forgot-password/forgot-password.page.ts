import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  correo = '';

  constructor(private alertCtrl: AlertController) {}

  async recuperar() {
    const alert = await this.alertCtrl.create({
      header: 'Recuperación',
      message: 'Se ha enviado un correo (simulado) a: ' + this.correo,
      buttons: ['OK']
    });
    await alert.present();
  }
}