import { User } from "@app/core/models/performance.interface";

export const EMPLOYEE_INITIAL_STATE = {
  startDate: '',
  endDate: '',
};

export const EMPLOYEE_DATA_INITIAL_STATE = {
  id: '',
  name: '',
  departmentType: '',
  startYear: 0,
  endYear: 0,
  supervisorId: '',
  employee: {
    id: '',
    fullName: '',
  },
  supervisor: {
    id: '',
    fullName: '',
  },
  startDate: '',
  endDate: '',
  activeSupervisor: false,
  supervisorFullname: '',
  
};

export const LOOKUP_SUPERVISORS = [
  {
    id: '',
    fullName: '',
  },
];

export const COMPETENCY_DATA_INITIAL_STATE = Array(4)
  .fill({
    competencyId: '',
    weight: 0,
  })
  .map((item, index) => ({ ...item, orderNo: index + 1 }));

export const GOALS_DATA_INITIAL_STATE = Array(5)
  .fill({
    orderNo: 0,
    goals: '',
    weight: 0,
    date: '',
    measure4: '',
    measure3: '',
    measure2: '',
    measure1: '',
  })
  .map((item, index) => ({ ...item, orderNo: index + 1 }));

  export const LOOKUP_USERS: User[] = [
    { id: '', fullname: '' },
    { id: '', fullname: '' },
    { id: '', fullname: '' },
  ];

export const TABS = [
  { label: 'Employee Details' },
  { label: 'Goals' },
  { label: 'Competencies' },
  { label: 'Confirmation' },
];