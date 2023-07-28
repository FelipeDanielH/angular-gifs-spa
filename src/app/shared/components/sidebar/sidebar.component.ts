import { Component, Input } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }


  get tags():string[] {
    return JSON.parse(localStorage.getItem('history')!)
  }

  searchByHistory(tag: string): void{
    this.gifsService.searchTag(tag)
  }

}
