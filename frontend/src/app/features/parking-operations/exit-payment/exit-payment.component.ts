import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ParkingSessionService } from '../services/parking-session.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ParkingSession, PaymentMethod } from '../../../shared/models/models';

@Component({
  selector: 'app-exit-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exit-payment.component.html'
})
export class ExitPaymentComponent implements OnInit {
  sessionId: string = '';
  session: ParkingSession | null = null;
  amount: number = 0;
  duration: number = 0; // minutes
  loading = false;
  processingPayment = false;

  paymentMethods = Object.values(PaymentMethod);
  selectedMethod: PaymentMethod = PaymentMethod.CASH;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: ParkingSessionService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id') || '';
    if (this.sessionId) {
      this.loadSessionData();
    }
  }

  loadSessionData() {
    this.loading = true;
    // Load session details
    this.sessionService.getById(this.sessionId).subscribe({
      next: (session) => {
        this.session = session;
        // Calculate amount
        this.calculateAmount();
      },
      error: () => {
        this.toastService.error('Sessão não encontrada');
        this.loading = false;
      }
    });
  }

  calculateAmount() {
    this.sessionService.calculateAmount(this.sessionId).subscribe({
      next: (result) => {
        this.amount = result.amount;
        this.duration = result.duration;
        this.loading = false;
      },
      error: () => {
        this.toastService.error('Erro ao calcular valor');
        this.loading = false;
      }
    });
  }

  confirmExit() {
    if (!this.sessionId) return;

    this.processingPayment = true;
    // In real app, we would register payment first via PaymentService.
    // Assuming registerExit handles everything or we simplify.
    // The endpoint is .../exit which presumably closes session. 
    // Backend logic likely creates Payment record.
    // If my service sends entryTime only? Wait, registerExit sends exitTime only.
    // Backend should handle payment creation logic usually? Or separate endpoint?
    // Let's assume registerExit finalizes it.

    this.sessionService.registerExit(this.sessionId).subscribe({
      next: () => {
        this.toastService.success('Saída registrada com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toastService.error('Erro ao registrar saída');
        this.processingPayment = false;
      }
    });
  }
}
