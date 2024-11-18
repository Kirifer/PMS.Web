export class Payload {
    name: string;
    departmentType: string;
    startYear: number;
    endYear: number;
    startDate: string; 
    endDate: string;
    employeeId: string;
    supervisorId: string;
    goals: Goal[];
    competencies: Competency[];
  
    constructor(
      name: string = "",
      departmentType: string = "",
      startYear: number = 0,
      endYear: number = 0,
      startDate: string = "",
      endDate: string = "",
      employeeId: string = "",
      supervisorId: string = "",
      goals: Goal[] = [new Goal()],
      competencies: Competency[] = [new Competency()]
    ) {
      this.name = name;
      this.departmentType = departmentType;
      this.startYear = startYear;
      this.endYear = endYear;
      this.startDate = startDate;
      this.endDate = endDate;
      this.employeeId = employeeId;
      this.supervisorId = supervisorId;
      this.goals = goals;
      this.competencies = competencies;
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
  
    constructor(
      orderNo: number = 0,
      goals: string = "",
      weight: number = 0,
      date: string = "",
      measure4: string = "",
      measure3: string = "",
      measure2: string = "",
      measure1: string = ""
    ) {
      this.orderNo = orderNo;
      this.goals = goals;
      this.weight = weight;
      this.date = date;
      this.measure4 = measure4;
      this.measure3 = measure3;
      this.measure2 = measure2;
      this.measure1 = measure1;
    }
}
  
export class Competency {
    competencyId: string;
    orderNo: number;
    weight: number;
  
    constructor(
      competencyId: string = "",
      orderNo: number = 0,
      weight: number = 0
    ) {
      this.competencyId = competencyId;
      this.orderNo = orderNo;
      this.weight = weight;
    }
}
  