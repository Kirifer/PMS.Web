export interface IUserData {
    id: string;  
    name: string;
    departmentType: string;
    startYear: number;
    endYear: number;
    startDate: {
        year: number;
        month: number;
        day: number;
        dayOfWeek: number;
        dayOfYear: number;
        dayNumber: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
        dayOfWeek: number;
        dayOfYear: number;
        dayNumber: number;
    };
    employeeId: string; 
    supervisorId: string;  
    isActive: boolean;
    isDeleted: boolean;
    goals: {
        id: string;
        orderNo: number;
        goals: string;
        weight: number;
        date: string;
        measure4: string;
        measure3: string;
        measure2: string;
        measure1: string;
    }[];
    competencies: {
        id: string;
        competency: {
            id: string;
            competency: string;
            level: string;
            description: string;
            isActive: boolean;
        };
        weight: number;
        orderNo: number;
    }[];
}
