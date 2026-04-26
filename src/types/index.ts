export type Locale = 'pt' | 'en';

export type Gender = 'feminino' | 'masculino' | 'unissex';
export type Concentration = 'EDT' | 'EDP' | 'Parfum' | 'Cologne' | 'EDC';
export type OlfactoryFamily =
  | 'Floral'
  | 'Floral Aldeído'
  | 'Oriental'
  | 'Madeiroso'
  | 'Aromático'
  | 'Cítrico'
  | 'Gourmand'
  | 'Aquático'
  | 'Fougère'
  | 'Chypre';

export interface OlfactoryNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  volumes: string[];
  concentration: Concentration;
  gender: Gender;
  olfactoryFamily: OlfactoryFamily;
  notes: OlfactoryNotes;
  description: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  volume: string;
  quantity: number;
  gender: Gender;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type PaymentMethod = 'pix' | 'credit' | 'debit' | 'boleto';

export interface Brand {
  id: string;
  name: string;
  country: string;
  description: string;
}

export interface FilterState {
  brand: string;
  gender: string;
  concentration: string;
  family: string;
  priceMin: number;
  priceMax: number;
  sort: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
}
