import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../shared/comps/side-bar/side-bar.component';
import { CartComponent } from '../../shared/comps/cart/cart.component';

@Component({
  selector: 'app-dash',
  standalone: true,
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    SideBarComponent,
    CartComponent,
    RouterLinkActive
  ],
})
export class DashComponent {

  @ViewChild('searchEspaded')
  private searchEspaded?: ElementRef<HTMLDivElement>

  private router = inject(Router);
  private form = inject(FormBuilder);

  public searchControl = this.form.control('', []);

  search(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.router.navigate(['/d/menu'], {
        queryParams: {
          s: this.searchControl.value,
        },
      });

        this.searchEspaded?.nativeElement?.classList?.remove('active')
    }
  }
}
