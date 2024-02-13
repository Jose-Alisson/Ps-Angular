import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {

  public searchResult = ""

  private end = inject(ActivatedRoute);

  ngOnInit(): void {
    this.end.queryParamMap.subscribe(params => {
      this.searchResult = (params.get('s') ?? '')
     })
  }
}
