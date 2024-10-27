export class EmployeeObj {
    name: string;
    departmentType: string;
    startYear: number;
    endYear: number;
    startDate: CustomDate;  
    endDate: CustomDate;    
    employeeId: string;
    supervisorId: string;
    goals: Goal[];
    competencies: Competency[];
  
    constructor() {
        this.name = '';
        this.departmentType = '';
        this.startYear = 0;
        this.endYear = 0;
        this.startDate = new CustomDate();  
        this.endDate = new CustomDate();   
        this.employeeId = '';
        this.supervisorId = '';
        this.goals = [];
        this.competencies = [];
    }
}

export class Goal {
    orderNo: number;
    goals: string;
    weight: number;
    date: string;  
    measure4: string;
    measure3: string;
    measure2: string;
    measure1: string;
  
    constructor() {
        this.orderNo = 0;
        this.goals = '';
        this.weight = 0;
        this.date = '';  
        this.measure4 = '';
        this.measure3 = '';
        this.measure2 = '';
        this.measure1 = '';
    }
}

export class Competency {
    orderNo: number;
    competencyId: string;
    weight: number;
  
    constructor() {
        this.orderNo = 0;
        this.competencyId = '';
        this.weight = 0;
    }
}

export class CustomDate {  
    year: number;
    month: number;
    day: number;
    dayOfWeek: number; 

    constructor() {
        this.year = 0;
        this.month = 0;
        this.day = 0;
        this.dayOfWeek = 0; 
    }
}
