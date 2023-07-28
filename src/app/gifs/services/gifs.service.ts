import { SearchResponse,Gif } from './../interfaces/gifs.interfaces'
import { Injectable } from '@angular/core'
import { HttpClient,HttpParams } from '@angular/common/http'


@Injectable({ providedIn: 'root' })
export class GifsService {

  // Variables
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = []
  private apiKey: string = 'Deq3UeMV1h0L2eVWh8TIBsFpMQ4yTMmi'
  private serviceUrl:string ='https://api.giphy.com/v1/gifs'

  // Constructor
  constructor( private http: HttpClient){
    this.loadLocalStorage()

  }

  // Getters
  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  //Metodos
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10)
    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  loadLocalStorage(): void{
    if (!localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    if( this._tagsHistory.length === 0) return
    this.searchTag(this._tagsHistory[0])
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', tag)
      .set('api_key', this.apiKey )

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe( resp => {
      this.gifList = resp.data
      console.log(resp.data);
    })


  }
}
