import { Component, Output, EventEmitter } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
// import { HeaderService, HeaderConfig } from './header.service';
import { Observable } from 'rxjs';

import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() addNewClicked = new EventEmitter<void>();
userData: any;
  // headerConfig$: Observable<HeaderConfig>;

  constructor(
    private sidebarService: SidebarService,
    // private headerService: HeaderService,

   private loginService: LoginService, // ✅ Inject
    private router: Router               // ✅ Inject
  ) {
    // Assigned here so headerService is already initialized
    // this.headerConfig$ = this.headerService.headerConfig$;
  }
  
ngOnInit() {
    // Subscribe to user data
    this.loginService.user$.subscribe(user => {
      this.userData = user;
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  onAddNew(): void {
    this.addNewClicked.emit();
  }
   // Function to get initials for the avatar (e.g., "Deepika P" -> "DP")
  getInitials(name: string): string {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  // ✅ Add Logout Method
  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}



