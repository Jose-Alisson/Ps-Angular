import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ModalComponent {

  @Input()
  public title = ""

  @Input()
  public active = false

  public width = input('500px')

  x = 0
  y = 0

  toogleActive() {
    this.active = !this.active
  }

  setActive(active: boolean) {
    this.active = active
  }

  // drag(event: MouseEvent){
  //   console.log(event)
  //   this.x = event.screenX
  //   this.y = event.screenY

  //   let element = (event.target as HTMLDivElement)
  //   element.s
  // }

  private offsetX: number = 0;
  private offsetY: number = 0;

  left = '50%'
  top = '50%'

  onDragStart(event: DragEvent) {
    this.offsetX = event.clientX - (event.target as HTMLElement).getBoundingClientRect().left;
    this.offsetY = event.clientY - (event.target as HTMLElement).getBoundingClientRect().top;
  }

  onDrag(event: DragEvent) {
    event.preventDefault();
    const x = event.clientX - this.offsetX;
    const y = event.clientY - this.offsetY;
    this.left = `${x}px`;
    this.top = `${y}px`;
  }

  onDragEnd(event: DragEvent) {
    // Cleanup if needed
  }
}
