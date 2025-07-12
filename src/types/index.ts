// Location sharing types
export interface LocationData {
  userName: string;
  lat: number;
  lon: number;
}

// User feed types
export interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface Bank {
  cardType: string;
  cardNumber: string;
  currency: string;
}

export interface Company {
  title: string;
  name: string;
  department: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  university: string;
  company: Company;
  address: Address;
  bank?: Bank;
}

export interface UsersListResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
