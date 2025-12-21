import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { DashboardStats } from '../../shared/models/models';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {
    stats: DashboardStats = {
        totalSpots: 0,
        freeSpots: 0,
        occupiedSpots: 0,
        reservedSpots: 0,
        activeSessions: 0,
        todayRevenue: 0
    };
    loading = true;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.loadStats();
    }

    loadStats(): void {
        // For now, using mock data since backend endpoint might not exist yet
        // this.dashboardService.getStats().subscribe({
        //   next: (stats) => {
        //     this.stats = stats;
        //     this.loading = false;
        //   },
        //   error: () => {
        //     this.loading = false;
        //   }
        // });

        // Mock data for demonstration
        setTimeout(() => {
            this.stats = {
                totalSpots: 100,
                freeSpots: 45,
                occupiedSpots: 40,
                reservedSpots: 10,
                activeSessions: 40,
                todayRevenue: 2450.50
            };
            this.loading = false;
        }, 500);
    }

    get occupancyRate(): number {
        if (this.stats.totalSpots === 0) return 0;
        return (this.stats.occupiedSpots / this.stats.totalSpots) * 100;
    }
}
