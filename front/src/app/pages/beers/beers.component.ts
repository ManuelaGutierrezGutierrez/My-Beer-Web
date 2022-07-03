import { BeersService } from './../../services/beers.service';
import { IBeers } from './../../models/beers.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss'],
})
export class BeersComponent implements OnInit {
  public beersList: IBeers[] = [];

  public filteredBeers: IBeers[];
  public keyWord: string;

  constructor(private beersService: BeersService, private router: Router) {
    this.filteredBeers = this.beersList;
    this.keyWord = '';
  }

  ngOnInit(): void {
    this.beersService.getBeers().subscribe((data: any) => {
      this.beersList = data;
    });
  }

  public catchBeer(beer: IBeers) {
    this.beersService.editItem(beer);
    this.router.navigate(['/gestion']);
  }

  public onChangeFilter(keyWord: string) {
    const newBeerList: IBeers[] = this.beersList.filter(
      (beer) =>
        beer.beer.toLowerCase().includes(keyWord.trim().toLowerCase()) ||
        beer.brewery.toLowerCase().includes(keyWord.trim().toLowerCase()) ||
        beer.style.toLowerCase().includes(keyWord.trim().toLowerCase())
    );
    this.filteredBeers = newBeerList;
  }
}
