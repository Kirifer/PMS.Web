export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  isSupervisor: boolean;
  dateCreated?: string; 
}

export interface UserRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  name?: string;
  isActive?: boolean;
  is_deleted?: boolean;
  isSupervisor: boolean;
  dateCreated?: string; 
}
