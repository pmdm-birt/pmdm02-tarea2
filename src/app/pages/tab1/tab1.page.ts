import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Array para la cabecera de las noticias
  categorias: string[] = ["general", "business", "technology", "science", "sports"];

  // Atributos para generar la consulta REST
  // Están almacenados en los ficheros de la carpeta enviroments
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  // Creo e inicializo un array vacío
  listaNoticias: Article[] = [];

  constructor(private obtenerDatos: HttpClient, public gestionNoticiasLeer: GestionNoticiasLeerService) {
    // this.cargarFichero();
    this.cargarCategoria(this.categorias[0]); 
  }

  ngOnInit() {
        
  }

  // Lee el fichero con los artículos y los guarda en el array "listaNoticias"
  private cargarFichero() {

    let respuesta: Observable<RespuestaNoticias> = this.obtenerDatos.get<RespuestaNoticias>("/assets/datos/articulos.json");

    respuesta.subscribe( resp => {
      if (resp) {
        // console.log("Noticias", resp);
        this.listaNoticias.push(... resp.articles);
      }
    } );
  }

  // Comprueba si se ha seleccionado o no el artículo y en función de ello añade o borra la noticia
  // Para ello, utiliza la información del evento
  public check(eventoRecibido, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeer.addNoticia(item);
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
    
  }

  // En función de la categoría elegida se realiza la consulta REST correspondiente
  public cambiarCategoria(eventoRecibido) {
    this.listaNoticias = [];
    this.cargarCategoria(eventoRecibido.detail.value);
  }

  // Se realiza la consulta REST de una categoría
  // Se concatena la URL, la categoría y la apiKey
  private cargarCategoria(categoria: string) {
    let respuesta: Observable<RespuestaNoticias> = this.obtenerDatos.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?category=" + categoria + "&apiKey=" + this.apiKey);

    respuesta.subscribe( resp => {
      // console.log("Noticias", resp);
      this.listaNoticias.push(... resp.articles);
    } );
  }

  // Comprueba si un artículo está en la lista para leer 
  // Devuelve true o false para marcar el check
  public buscar(articulo: Article): boolean {
    let indice = this.gestionNoticiasLeer.buscar(articulo);
    if (indice == -1) {
      return false;
    }
    return true;
  }
}
