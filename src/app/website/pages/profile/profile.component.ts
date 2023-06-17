import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user: User | null = null;
  // Hmm this new way
  authService = inject(AuthService);

  public ngOnInit(): void {
    this.authService.profile().subscribe({
      next: (res) => this.user = res
    })
  }


}
