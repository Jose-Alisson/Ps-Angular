import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  @Input()
  title = ''

  @Input()
  active = false

  @Output()
  selectedEmmiter = new EventEmitter<string>()

  options = input([''])
}
