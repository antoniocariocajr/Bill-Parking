import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { Client } from '../../../shared/models/models';

@Component({
    selector: 'app-client-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
    clients: Client[] = [];
    filteredClients: Client[] = [];
    loading = false;
    showModal = false;
    isEditing = false;
    clientForm: FormGroup;
    searchTerm = '';

    constructor(
        private clientService: ClientService,
        private toastService: ToastService,
        private fb: FormBuilder
    ) {
        this.clientForm = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
            isActive: [true]
        });
    }

    ngOnInit(): void {
        this.loadClients();
    }

    loadClients(): void {
        this.loading = true;
        this.clientService.getAll().subscribe({
            next: (clients) => {
                this.clients = clients;
                this.filteredClients = clients;
                this.loading = false;
            },
            error: () => {
                this.toastService.error('Erro ao carregar clientes');
                this.loading = false;
            }
        });
    }

    filterClients(): void {
        if (!this.searchTerm) {
            this.filteredClients = this.clients;
            return;
        }
        const term = this.searchTerm.toLowerCase();
        this.filteredClients = this.clients.filter(client =>
            client.name.toLowerCase().includes(term) ||
            client.cpf.includes(term) ||
            client.email.toLowerCase().includes(term)
        );
    }

    openModal(client?: Client): void {
        this.isEditing = !!client;
        if (client) {
            this.clientForm.patchValue(client);
        } else {
            this.clientForm.reset({ isActive: true });
        }
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
    }

    onSubmit(): void {
        if (this.clientForm.invalid) return;

        const request = this.isEditing
            ? this.clientService.update(this.clientForm.value.id, this.clientForm.value)
            : this.clientService.create(this.clientForm.value);

        request.subscribe({
            next: () => {
                this.toastService.success(this.isEditing ? 'Cliente atualizado!' : 'Cliente criado!');
                this.closeModal();
                this.loadClients();
            },
            error: () => this.toastService.error('Erro ao salvar cliente')
        });
    }

    deleteClient(id: string): void {
        if (!confirm('Excluir este cliente?')) return;
        this.clientService.delete(id).subscribe({
            next: () => {
                this.toastService.success('Cliente excluído!');
                this.loadClients();
            },
            error: () => this.toastService.error('Erro ao excluir cliente')
        });
    }

    toggleActive(client: Client): void {
        const isActive = !client.isActive;
        this.clientService.update(client.id!, { ...client, isActive: isActive }).subscribe({
            next: () => {
                this.toastService.success(`Cliente ${isActive ? 'ativado' : 'desativado'}!`);
                this.loadClients();
            },
            error: () => this.toastService.error('Erro ao atualizar status')
        });
    }
}
