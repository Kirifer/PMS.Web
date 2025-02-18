export interface PerformanceRecord {
    id: string;
    name: string;
    departmentType: string;
    startYear: number;
    endYear: number;
    startDate: string;
    endDate: string;
    supervisorId: string;
    employee: {
      id: string;
      fullName: string;
    };
    supervisor: {
      id: string;
      fullName: string;
    };
    goals: Goal[];
    competencies: Competency[];
    supervisorFullName: string;
  }
  export interface User {
    id: string;
    fullname: string;
  }
  
  export interface Goal {
    id: string;
    orderNo: number;
    goals: string;
    weight: number;
    date: string;
    measure4: string;
    measure3: string;
    measure2: string;
    measure1: string;
  }
  
  export interface Competency {
    id: string;
    competencyId: string;
    orderNo: number;
    weight: number;
    competency: competency;
  }
  
  export interface competency {
    id: string;
    description: string;
    competency: string;
    level: string;
    isActive: boolean;
  }