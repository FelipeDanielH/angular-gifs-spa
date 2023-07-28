import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-gif',
  templateUrl: './card-gif.component.html'
})
export class CardGifComponent implements OnInit{
  @Input()
  public gif!: Gif

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Se requiere la propiedad Gif')
  }
}
