import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CepComponent } from "../../shared/comps/cep/cep.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CurrencyPipe, CepComponent, RouterLink, CommonModule]
})
export class HomeComponent {

}
