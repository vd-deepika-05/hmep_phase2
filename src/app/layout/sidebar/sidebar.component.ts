import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  isCollapsed: boolean = false;
  isMobile: boolean = false;

  private serviceSub!: Subscription;
  private routerSub!: Subscription;
  private readonly MOBILE_BREAKPOINT = 1024;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkScreenSize();

    // Sync isCollapsed with SidebarService (header hamburger button drives this)
    this.serviceSub = this.sidebarService.sidebarState$.subscribe(state => {
      this.isCollapsed = state;
    });

    // On mobile: collapse after navigation
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile) {
          this.sidebarService.setState(true);
        }
      });
  }

  ngOnDestroy(): void {
    this.serviceSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;

    if (this.isMobile && !wasMobile) {
      this.sidebarService.setState(true);   // entering mobile → hide sidebar
    }
    if (!this.isMobile && wasMobile) {
      this.sidebarService.setState(false);  // back to desktop → show sidebar
    }
  }

  /** Backdrop click — closes sidebar on mobile */
  closeSidebar(): void {
    this.sidebarService.setState(true);
  }

  /** Nav link clicked on mobile — close sidebar */
  onNavClick(): void {
    if (this.isMobile) {
      this.sidebarService.setState(true);
    }
  }
}