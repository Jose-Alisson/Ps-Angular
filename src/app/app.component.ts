import { CurrencyPipe, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {

  private vs = inject(ViewportScroller);

  cardCurrent = 0;

  ngAfterViewInit(): void {}

  scrollToElement(id: string) {
    let comp = document.getElementById(`${id}`);

    if (comp) {
      let y = comp.getBoundingClientRect().y;
      this.vs.scrollToPosition([0, !!y ? y - 85 : 0]);
      return;
    }

    this.vs.scrollToPosition([0, 0]);
  }

  selectCard(index: number) {
    this.cardCurrent = index;
    this.moverSlider(0);
  }

  moverSlider(count: number) {
    this.cardCurrent += count;

    let carrosselWrapper = document.querySelector('.slider') as HTMLDivElement;
    let cards = carrosselWrapper.children; //document.querySelectorAll('.card-product');

    if (this.cardCurrent > cards.length - 1) {
      this.cardCurrent = 0;
    }
    if (this.cardCurrent < 0) {
      this.cardCurrent = cards.length - 1;
    }
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove('current');
    }

    const posicaoCard =
      (cards[this.cardCurrent] as HTMLDivElement).offsetLeft -
      carrosselWrapper.offsetLeft;

    const posicaoCentralizada =
      posicaoCard -
      carrosselWrapper.offsetWidth / 2 +
      (cards[this.cardCurrent] as HTMLDivElement).offsetWidth / 2;

    carrosselWrapper.scrollTo({
      left: posicaoCentralizada,
      behavior: 'smooth',
    });
    cards[this.cardCurrent].classList.add('current');
  }
}
