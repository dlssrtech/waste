export type Role = "super_admin" | "operations_admin" | "finance_admin" | "support_agent";
export type CountryCode = "GH" | "NG" | "CI";
export type PickupStatus = "pending_assignment" | "assigned" | "in_progress" | "completed" | "cancelled" | "disputed" | "quote_review";
export type CollectorStatus = "pending_approval" | "approved" | "suspended" | "rejected";
export type Availability = "online" | "assigned" | "offline";
export type PaymentStatus = "successful" | "pending" | "failed" | "refunded";

export interface Country {
  id: string;
  code: CountryCode;
  name: string;
  currency: string;
  taxRate: number;
  active: boolean;
  paymentProviders: string[];
}

export interface SackType {
  id: string;
  countryId: string;
  name: "Small" | "Medium" | "Large";
  price: number;
  stockReceived: number;
  stockSold: number;
}

export interface Collector {
  id: string;
  countryId: string;
  name: string;
  phone: string;
  vehicleType: string;
  status: CollectorStatus;
  availability: Availability;
  rating: number;
  earnings: number;
  activeJobs: number;
  completedJobs: number;
  latitude: number;
  longitude: number;
}

export interface Customer {
  id: string;
  countryId: string;
  name: string;
  phone: string;
  address: string;
  walletBalance: number;
  totalSpend: number;
  status: "active" | "suspended";
}

export interface Pickup {
  id: string;
  countryId: string;
  customerId: string;
  collectorId?: string;
  source: "mobile" | "sms" | "admin";
  type: "sack" | "special";
  status: PickupStatus;
  pickupWindow: "morning" | "afternoon" | "evening";
  address: string;
  sackSummary: string;
  amount: number;
  proofPhotos: string[];
  createdAt: string;
}

export interface Payment {
  id: string;
  countryId: string;
  customerId: string;
  method: "momo" | "card" | "wallet" | "cash" | "bank";
  status: PaymentStatus;
  amount: number;
  createdAt: string;
}

export interface PlatformSettings {
  assignmentMode: "manual" | "automatic";
  collectorLocationIntervalSeconds: number;
  defaultCountryId: string;
  smsProvider: string;
  proofPhotosRequired: number;
}
