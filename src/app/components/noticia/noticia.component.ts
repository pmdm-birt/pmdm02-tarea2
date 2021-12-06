import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Article } from './../../interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;    // Se le pasa este valor al usar el componente

  constructor(private gestionNoticiasLeer: GestionNoticiasLeerService, private alertController: AlertController) { }

  ngOnInit() {}

  // Al pulsar sobre borrar se abre una alerta para confirmarlo
  public onClick() {
    this.confirmarBorrar();
 
  }

  // Mensaje de alerta para confirmar el borrado
  async confirmarBorrar() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Borrar noticia?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            // console.log('Confirm Okay');
            this.gestionNoticiasLeer.borrarNoticia(this.noticia);     // Se llama al servicio que gestiona las noticias para leer y borrarla
          }
        }
      ]
    });

    await alert.present();
  }

}
