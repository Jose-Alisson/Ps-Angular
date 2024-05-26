import { Component, inject } from '@angular/core';
import { SocketClientService } from '../../../shared/services/socket-client/socket-client.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.scss'
})
export class DashAdminComponent {

  private socket = inject(SocketClientService)
}
