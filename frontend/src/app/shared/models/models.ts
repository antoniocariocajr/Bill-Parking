// Enums
export enum Role {
    ADMIN = 'ADMIN',
    OPERATOR = 'OPERATOR',
    CLIENT = 'CLIENT'
}

export enum VehicleType {
    CAR = 'CAR',
    MOTORCYCLE = 'MOTORCYCLE',
    TRUCK = 'TRUCK'
}

export enum SpotStatus {
    FREE = 'FREE',
    OCCUPIED = 'OCCUPIED',
    RESERVED = 'RESERVED',
    BLOCKED = 'BLOCKED'
}

export enum SessionStatus {
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
    CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
    CASH = 'CASH',
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
    PIX = 'PIX'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    REFUNDED = 'REFUNDED'
}

export enum ReservationStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

// Entities
export interface User {
    id?: string;
    email: string;
    name: string;
    password?: string;
    role: Role;
    enabled: boolean;
    createdAt?: string;
    lastModifiedAt?: string;
}

export interface Client {
    id?: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
    vehicles?: Vehicle[];
    isActive: boolean;
    createdAt?: string;
    lastModifiedAt?: string;
}

export interface Vehicle {
    id?: string;
    licensePlate: string;
    brand: string;
    model: string;
    color: string;
    owner?: Client;
    type: VehicleType;
    createdAt?: string;
    updatedAt?: string;
}

export interface ParkingSpot {
    id?: string;
    code: string;
    type: VehicleType;
    status: SpotStatus;
    covered: boolean;
    createdAt?: string;
    lastModifiedAt?: string;
}

export interface Tariff {
    id?: string;
    vehicleType: VehicleType;
    hourlyRate: number;
    dailyRate: number;
    monthlyRate: number;
    validFrom: string;
    validUntil: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ParkingSession {
    id?: string;
    vehicle: Vehicle;
    spot: ParkingSpot;
    entryTime: string;
    exitTime?: string;
    status: SessionStatus;
    operator?: User;
    hourlyRate: number;
    totalAmount?: number;
    createdAt?: string;
    lastModifiedAt?: string;
}

export interface Payment {
    id?: string;
    session: ParkingSession;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    paidAt?: string;
    transactionId?: string;
    createdAt?: string;
    lastModifiedAt?: string;
}

export interface Reservation {
    id?: string;
    client: Client;
    spot: ParkingSpot;
    reservedFrom: string;
    reservedUntil: string;
    status: ReservationStatus;
    createdAt?: string;
    lastModifiedAt?: string;
}

// DTOs
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface DashboardStats {
    totalSpots: number;
    freeSpots: number;
    occupiedSpots: number;
    reservedSpots: number;
    activeSessions: number;
    todayRevenue: number;
}

export interface ReportData {
    period: string;
    totalSessions: number;
    totalRevenue: number;
    revenueByMethod: { [key: string]: number };
    revenueByVehicleType: { [key: string]: number };
    dailyBreakdown?: { date: string; sessions: number; revenue: number }[];
}
