import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingSessionService } from '../services/parking-session.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ParkingSession, SessionStatus } from '../../../shared/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-sessions.component.html'
})
export class ActiveSessionsComponent implements OnInit {
  sessions: ParkingSession[] = [];
  loading = false;

  constructor(
    private sessionService: ParkingSessionService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    this.loading = true;
    this.sessionService.getActiveSessions().subscribe({
      next: (data) => {
        this.sessions = data;
        this.loading = false;
      },
      error: () => {
        this.toastService.error('Erro ao carregar sessões ativas');
        this.loading = false;
      }
    });
  }

  processExit(sessionId: string) {
    this.router.navigate(['/parking-operations/exit', sessionId]);
  }
}
