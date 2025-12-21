import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, ToastComponent],
    template: `
    <div class="min-h-screen bg-gray-50">
      <app-navbar></app-navbar>
      <div class="flex h-[calc(100vh-4rem)]">
        <app-sidebar></app-sidebar>
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-toast></app-toast>
    </div>
  `,
    styles: []
})
export class LayoutComponent { }
