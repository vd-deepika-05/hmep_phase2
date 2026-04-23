// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';

// export interface BreadcrumbItem {
//   label: string;
//   routerLink?: string;
// }


// export interface HeaderConfig {
//   title: string;
//   breadcrumbs: BreadcrumbItem[];
//   showAddButton: boolean;
//   addButtonLabel: string;
//   showFilter: boolean;


//   permissionModule?: string;
//   permissionAction?: string;
// }


// const ROUTE_CONFIG: Record<string, HeaderConfig> = {
//   '/login': {
//   title: 'Login',
//   breadcrumbs: [
//     { label: 'Authentication' },
//     { label: 'Login' }
//   ],
//   showAddButton: false,
//   addButtonLabel: '',
//   showFilter: false
// },

  

//  '/admin/users': {
//   title: 'User Management',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Admin Module' },
//     { label: 'User Management' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ Add User',
//   showFilter: false,


//   permissionModule: 'User Management',
//   permissionAction: 'create'
// },
//  '/admin/roles': {
//   title: 'Roles & Permissions',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Admin Module' },
//     { label: 'Roles & Permissions' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ Add Role',
//   showFilter: false,


//   permissionModule: 'User Management', 
//   permissionAction: 'create'
// },

 
//  '/master/customer': {
//   title: 'Customer & Branch',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Master Modules' },
//     { label: 'Customer & Branch' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ Add Customer',
//   showFilter: false,

 
//   permissionModule: 'User Management',
//   permissionAction: 'create'
// },
//  '/master/branch': {
//   title: 'Branch Master',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Master Modules' },
//     { label: 'Customer Branch ' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ Add Branch',
//   showFilter: false,

//   permissionModule: 'User Management',
//   permissionAction: 'create'
// },
//  '/master/employee': {
//   title: 'Employee Master',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Master Modules' },
//     { label: 'Employee Master' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ Add Employee',
//   showFilter: false,

//   permissionModule: 'User Management',
//   permissionAction: 'create'
// },
//  '/master/part-master': {
//   title: 'Part Master',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Master Modules' },
//     { label: 'Part Master' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ Add Part',
//   showFilter: false,

//   permissionModule: 'User Management',
//   permissionAction: 'create'
// },
//   '/master/reference': {
//     title: 'Reference Masters',
//     breadcrumbs: [
//       { label: 'Overview' },
//       { label: 'Master Modules' },
//       { label: 'Reference Masters' },
//     ],
//     showAddButton: false,
//     addButtonLabel: '+ Add Record',
//     showFilter: false,

//      permissionModule: 'User Management',
//   permissionAction: 'create'
//   },

//  '/project-layout/project-list': {
//   title: 'Project List',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Project' },
//     { label: 'Project List' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ New Project',
//   showFilter: false,

//   permissionModule: 'Projects',
//   permissionAction: 'create'
// },
//  '/project-layout/add-project': {
//   title: 'Add Project',
//   breadcrumbs: [
//     { label: 'Overview' },
//     { label: 'Project' },
//     { label: 'Add Project' },
//   ],
//   showAddButton: false,
//   addButtonLabel: '+ New Project',
//   showFilter: false,

//   permissionModule: 'Projects',
//   permissionAction: 'create'
// },




//   '/project-layout/work-order': {
//     title: 'Work Order',
//     breadcrumbs: [
//       { label: 'Overview' },
//       { label: 'Project' },
//       { label: 'Work Order' },
//     ],
//     showAddButton: false,
//     addButtonLabel: '+ New Work Order',
//     showFilter: false,
//      permissionModule: 'Projects',
//   permissionAction: 'create'
//   },
//    '/project-layout/owner-allocation': {
//     title: 'Owner Allocation',
//     breadcrumbs: [
//       { label: 'Overview' },
//       { label: 'Project' },
//       { label: 'Owner Allocation' },
//     ],
//     showAddButton: false,
//     addButtonLabel: '+ New Owner Allocation',
//     showFilter: false,
//      permissionModule: 'Projects',
//   permissionAction: 'create'
//   },
// };

// const DEFAULT_CONFIG: HeaderConfig = {
//   title: 'Dashboard',
//   breadcrumbs: [{ label: 'Overview' }, { label: 'Dashboard' }],
//   showAddButton: false,
//   addButtonLabel: '+ Add New',
//   showFilter: false,
// };


// @Injectable({ providedIn: 'root' })
// export class HeaderService {

//   private headerConfig = new BehaviorSubject<HeaderConfig>({ ...DEFAULT_CONFIG });
//   headerConfig$ = this.headerConfig.asObservable();

//   constructor(private router: Router) {
   
//     this.router.events
//       .pipe(filter(e => e instanceof NavigationEnd))
//      .subscribe((e: any) => {
//   let url = e.urlAfterRedirects?.split('?')[0] || '';


//   if (!url || url === '/') {
//     url = '/login';
//   }

//   const config = ROUTE_CONFIG[url] ?? DEFAULT_CONFIG;
//   this.headerConfig.next({ ...config });
// });
      
//   }


//   setPage(title: string, breadcrumbs: BreadcrumbItem[], options?: Partial<HeaderConfig>): void {
//     this.headerConfig.next({ ...DEFAULT_CONFIG, title, breadcrumbs, ...(options || {}) });
//   }

  
// }