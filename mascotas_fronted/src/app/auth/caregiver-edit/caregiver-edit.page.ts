import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-caregiver-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './caregiver-edit.page.html',
  styleUrls: ['./caregiver-edit.page.scss']
})
export class CaregiverEditPage {
  cuidador: any = {};

  constructor(private http: HttpClient, private navCtrl: NavController, private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    const stored = localStorage.getItem('cuidador');
    if (stored) {
      this.cuidador = JSON.parse(stored);
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  async guardarCambios() {
    try {
      await this.http.put(`http://localhost:5000/api/cuidadores/${this.cuidador.id}`, this.cuidador).toPromise();
      localStorage.setItem('cuidador', JSON.stringify(this.cuidador));
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Perfil actualizado',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.back();
    } catch {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo actualizar',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
