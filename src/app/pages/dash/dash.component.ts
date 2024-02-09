import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss',
})
export class DashComponent {
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
    }
  }
}
