import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './edit-pet.page.html',
  styleUrls: ['./edit-pet.page.scss']
})
export class EditPetPage implements OnInit {
  mascotaId: number | null = null;
  mascota: any = {
    nombre: '',
    especie: '',
    raza: '',
    fecha_nacimiento: '',
    sexo: '',
    peso: null,
    cuidador_id: null
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.mascotaId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.mascotaId) {
      try {
        const res = await this.http.get<any>(`http://localhost:5000/api/mascotas/${this.mascotaId}`).toPromise();
        this.mascota = { ...res };
      } catch {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo cargar la mascota.',
          buttons: ['OK'],
        });
        await alert.present();
        this.navCtrl.back();
      }
    }
  }

  async actualizarMascota() {
    try {
      await this.http.put(`http://localhost:5000/api/mascotas/${this.mascotaId}`, this.mascota).toPromise();

      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Mascota actualizada correctamente',
        buttons: ['OK'],
      });
      await alert.present();

      this.navCtrl.navigateRoot('/home');
    } catch {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo actualizar la mascota',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  irAHomeFuncionalidad() {
  this.navCtrl.navigateBack('/home-pet');
  }
}
