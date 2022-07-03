import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BeersService } from 'src/app/services/beers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})
export class GestionComponent implements OnInit {
  public beerForm!: FormGroup;
  public newBeer = this.beersService.beerData;
  public beerID = this.beersService.beerData.id;

  constructor(
    private formBuilder: FormBuilder,
    public beersService: BeersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.beersService.clearBeer();
    this.beerForm = this.formBuilder.group({
      beer: [this.newBeer.beer, [Validators.required]],
      brewery: [this.newBeer.brewery, [Validators.required]],
      style: [this.newBeer.style],
      cover: [this.newBeer.cover],
    });

    this.beerForm.valueChanges.subscribe((changes) => {
      this.newBeer = changes;
      console.log(this.newBeer);
    });
  }

  public onSubmit() {
    if (this.beerID !== 0) {
      this.beersService.editBeer(this.beerID, this.newBeer).subscribe();
      Swal.fire('Cerveza editada');
    } else {
      this.beersService.postBeer(this.newBeer).subscribe();
      Swal.fire('Cerveza creada');
    }

    this.beerForm.reset();

    this.router.navigate(['/beers']);
  }

  public delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Perderás el registro definitivamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.beersService.deleteBeer(this.beerID).subscribe();
        this.beerForm.reset();

        Swal.fire('Eliminado', 'Tu cerveza ha sido eliminada', 'success');
        this.router.navigate(['/beers']);
      }
    });
  }
}
