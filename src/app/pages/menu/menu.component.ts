import { ImgService } from './../../shared/services/img/img.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { ProductService } from '../../shared/services/product/product.service';
import { Observable, map, of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, AsyncPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {

  public loading = true;
  public index = 0;
  public result: any[] = [];
  public result$: Observable<any[]> = of();

  public searchResult = '';

  private end = inject(ActivatedRoute);
  private productS = inject(ProductService);
  private router = inject(Router);
  private ImgService = inject(ImgService)
  private sanitizer = inject(DomSanitizer)

  ngOnInit(): void {
    this.end.queryParamMap.subscribe((params) => {
      let param = params.get('s');
      if (param) {
        this.searchResult = param;
        this.productS.search(param).subscribe({
          next: (data) => {
            this.result = data;
            this.loading = false
            this.result$ = new Observable(obs => {
              obs.next(this.result.slice(0, 12));
            })
          },
        });
      } else {
        this.productS
          .getByOffSet('467ef5a8-a298-416c-afb7-d3d6e0a02f7d', 0)
          .subscribe({next: (products) => {
            this.result = products;
            this.result$ = new Observable((obs) => {
              obs.next(this.result.slice(0, 12));
            });
            this.loading = false
          }});
      }
    });
  }

  navigate(id: string) {
    this.router.navigate(['/d/item'], {
      queryParams: {
        c: id,
      },
    });
  }

  next() {
    this.index += 12;
    this.result$ = new Observable((obs) => {
      obs.next(this.result.slice(this.index, 12));
    });
    if (this.index + 12 >= this.result.length) {
      this.find24Result();
    }
  }

  back() {
    this.index -= 12;
    this.find24Result();
  }

  find24Result() {
    this.productS
      .getByOffSet('467ef5a8-a298-416c-afb7-d3d6e0a02f7d', this.index)
      .subscribe((data) => {
        this.result = data;
        this.result$ = new Observable((obs) => {
          obs.next(this.result.slice(0, 12));
        });
      });
  }
}
