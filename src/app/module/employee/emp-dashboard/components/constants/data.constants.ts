export const TABS = [
  { label: 'Goals' },
  { label: 'Competencies' },
  { label: 'Confirmation' },
];

export const INDIVIDUAL_GOALS = [
  {
    id: 1,
    label: 'Schedule Adherence',
    weight: '30',
    employeeLevel: 'Met and Sometimes Exceeds Expectations',
    employeeComments: '',
    managerLevel: 'Met and Sometimes Exceeds Expectations',
    managerComments: '',
  },
  {
    id: 2,
    label: 'Customer Complaints',
    weight: '25',
    employeeLevel: 'Met Expectations',
    employeeComments: '',
    managerLevel: 'Did Not Meet Expectations',
    managerComments: '',
  },
  {
    id: 3,
    label: 'Lead Generation',
    weight: '25',
    employeeLevel: 'Met Expectations',
    employeeComments: '',
    managerLevel: 'Did Not Meet Expectations',
    managerComments: '',
  },
  {
    id: 4,
    label: 'Errors in Report',
    weight: '10',
    employeeLevel: 'Met Expectations',
    employeeComments: '',
    managerLevel: 'Met Expectations',
    managerComments: '',
  },
  {
    id: 5,
    label: 'Report Generation',
    weight: '10',
    employeeLevel: 'Met Expectations',
    employeeComments: '',
    managerLevel: 'Met Expectations',
    managerComments: '',
  },
];

export const COMPETENCIES = [
  {
    id: 1,
    label: 'Delivering',
    weight: '25',
    employeeLevel: 'Significant Strength',
    employeeComments: '',
    managerLevel: 'Development Needed',
    managerComments: '',
  },
  {
    id: 2,
    label: 'Business Thinking',
    weight: '25',
    employeeLevel: 'Significant Strength',
    employeeComments: '',
    managerLevel: 'Development Needed',
    managerComments: '',
  },
  {
    id: 3,
    label: 'Open to Opportunity',
    weight: '25',
    employeeLevel: 'Significant Strength',
    employeeComments: '',
    managerLevel: 'Growing Strength',
    managerComments: '',
  },
  {
    id: 4,
    label: 'Providing Direction',
    weight: '25',
    employeeLevel: 'Significant Strength',
    employeeComments: '',
    managerLevel: 'Development Needed',
    managerComments: '',
  },
];

export const REVIEW_DETAILS = {
  employeeName: 'John Doe',
  employeeId: 'EMP123',
  supervisor: 'Jane Doe',
  reviewYear: '2021-2022',
  startDate: '2021-01-01',
  endDate: '2022-01-01',
  competencies: COMPETENCIES,
  goals: INDIVIDUAL_GOALS,
}