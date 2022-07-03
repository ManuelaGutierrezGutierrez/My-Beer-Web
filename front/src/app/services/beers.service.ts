import { IBeers } from './../models/beers.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BeersService {
  constructor(private httpClient: HttpClient) {}

  public beerData = {
    beer: '',
    brewery: '',
    style: '',
    cover: '',
    id: 0,
  };

  // Función para dejar en blanco el formulario

  public clearBeer() {
    this.beerData = {
      beer: '',
      brewery: '',
      style: '',
      cover: '',
      id: 0,
    };
  }

  // Cambiar el tipado!!!!!!!!!!!!

  public editItem(item: any) {
    this.beerData = item;
  }

  // Traer las cervezas

  public getBeers() {
    return this.httpClient.get('http://localhost:3000/beers');
  }

  // Añadir una cerveza

  public postBeer(newBeer: IBeers) {
    return this.httpClient.post('http://localhost:3000/beers', newBeer);
  }

  // Borrar una cerveza

  public deleteBeer(beerID: number) {
    return this.httpClient.delete('http://localhost:3000/beers/' + beerID);
  }

  // Editar una cerveza

  public editBeer(beerID: number, editedBeer: IBeers) {
    return this.httpClient.put(
      'http://localhost:3000/beers/' + beerID,
      editedBeer
    );
  }
}
