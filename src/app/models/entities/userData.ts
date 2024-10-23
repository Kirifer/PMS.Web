export interface IUserData {
    id: number,
    selectedDepartment: string,
    employeeName: string,
    supervisor: string,
    reviewYear: string,
    startDate: string,
    endDate: string,
    activeSupervisor: boolean;
    goals: { goalId: number; description: string; completed: boolean }[];
    competencies: { competencyId: number; description: string; level: number }[];
}