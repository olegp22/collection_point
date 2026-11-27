export interface Speciality {
  id: number;
  title: string;
  value: string;
}

export const mockSpecialities: Speciality[] = [
  {
    id: 1,
    title: 'Аналитик',
    value: 'analyst',
  },
  {
    id: 2,
    title: 'Тимлид',
    value: 'teamlead',
  },
  {
    id: 3,
    title: 'Программист',
    value: 'developer',
  },
  {
    id: 4,
    title: 'Дизайнер',
    value: 'designer',
  },
  {
    id: 5,
    title: 'QA',
    value: 'qa',
  },
];