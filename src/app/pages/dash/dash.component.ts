import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../../shared/comps/side-bar/side-bar.component";

@Component({
    selector: 'app-dash',
    standalone: true,
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss',
    imports: [RouterOutlet, RouterLink, ReactiveFormsModule, SideBarComponent]
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
