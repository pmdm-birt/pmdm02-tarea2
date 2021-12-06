import { Article } from './../interfaces/interfaces';
import { GestionStorageService } from './gestion-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {
  // Se crea el array que va almacenar las noticias
  private noticiasLeer: Article [] = [];

  constructor(private gestionStorage: GestionStorageService) {
    // Se recuperan los datos que hubiera en Storage
    let datosPromesa: Promise<Article[]> = gestionStorage.getObject("noticiasLeer");
    datosPromesa.then( datos => {
      if (datos) {
        // console.log(datos);
        this.noticiasLeer.push(...datos);
      }
    });
    
  }

  // Se busca un artículo en el array
  public buscar(item: Article): number  {
    let indice: number = this.noticiasLeer.findIndex(
      function(cadaArticulo) { 
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    //let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }

  // Se añade la noticia al array y se actualiza en Storage
  public addNoticia(item) {
      this.noticiasLeer.push(item);
      this.gestionStorage.setObject("noticiasLeer", this.noticiasLeer);
      // console.log(this.noticiasLeer);
  }

  // Se busca la noticia en el array y se borra
  public borrarNoticia(item) {
    let indice = this.buscar(item);
    this.noticiasLeer.splice(indice, 1);
    this.gestionStorage.setObject("noticiasLeer", this.noticiasLeer);
    // console.log(this.noticiasLeer);
  }

  // Devuelve el contenido del array
  public getNoticias() {
    return this.noticiasLeer;
  }
}
