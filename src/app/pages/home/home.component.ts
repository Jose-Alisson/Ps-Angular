import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CepComponent } from "../../shared/comps/cep/cep.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CurrencyPipe, CepComponent]
})
export class HomeComponent {

}
