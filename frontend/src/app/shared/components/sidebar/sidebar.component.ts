import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
    label: string;
    icon: string;
    route: string;
    adminOnly?: boolean;
    children?: MenuItem[];
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent {
    menuItems: MenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
            route: '/dashboard'
        },
        {
            label: 'Operações',
            icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
            route: '/parking-operations',
            children: [
                { label: 'Registrar Entrada', icon: '', route: '/parking-operations/entry' },
                { label: 'Sessões Ativas', icon: '', route: '/parking-operations/active-sessions' },
                { label: 'Pagamentos', icon: '', route: '/payments' }
            ]
        },
        {
            label: 'Gerenciamento',
            icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
            route: '/management',
            children: [
                { label: 'Vagas', icon: '', route: '/parking-spots' },
                { label: 'Tarifas', icon: '', route: '/tariffs' },
                { label: 'Clientes', icon: '', route: '/clients' },
                { label: 'Veículos', icon: '', route: '/vehicles' },
                { label: 'Reservas', icon: '', route: '/reservations' }
            ]
        },
        {
            label: 'Operadores',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
            route: '/operators',
            adminOnly: true
        },
        {
            label: 'Relatórios',
            icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
            route: '/reports',
            children: [
                { label: 'Relatório Diário', icon: '', route: '/reports/daily' },
                { label: 'Relatório Mensal', icon: '', route: '/reports/monthly' }
            ]
        }
    ];

    expandedItems: Set<string> = new Set();

    constructor(public authService: AuthService) { }

    toggleExpand(label: string): void {
        if (this.expandedItems.has(label)) {
            this.expandedItems.delete(label);
        } else {
            this.expandedItems.add(label);
        }
    }

    isExpanded(label: string): boolean {
        return this.expandedItems.has(label);
    }

    shouldShowItem(item: MenuItem): boolean {
        if (item.adminOnly) {
            return this.authService.isAdmin();
        }
        return true;
    }
}
