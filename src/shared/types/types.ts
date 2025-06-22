export interface User {
  id: number;
  photo: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  zipcode: string;
}

export type SortField = 'id' | 'name' | 'zipcode';
export type FilterField = 'name' | 'email' | 'phone'; 