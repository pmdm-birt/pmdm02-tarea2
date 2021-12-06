import { Article } from './../../interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  @Input() listaNoticias: Article[];      // Se recibe este valor cuando se usa el componente

  constructor() { }

  ngOnInit() {}

}
