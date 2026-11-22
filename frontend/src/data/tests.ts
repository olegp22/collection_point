export interface TestItem {
  id: number;
  title: string;
  subtitle: string;
  composition: string;
  status: string;
  passed: string;
  endDate: string;
  statusType: 'active' | 'draft' | 'archive';
}

export const mockTestsData: TestItem[] = [
  { 
    id: 1, 
    title: 'Набор аналитиков · весна 2025', 
    subtitle: 'Аналитик · ссылка активна', 
    composition: '1 осн + 1 доп', 
    status: 'Активно', 
    passed: '248', 
    endDate: '20.05.2025', 
    statusType: 'active' 
  },
  { 
    id: 2, 
    title: 'Стажёры-разработчики', 
    subtitle: 'Программист · черновик', 
    composition: '1 осн', 
    status: 'Черновик', 
    passed: '—', 
    endDate: '—', 
    statusType: 'draft' 
  },
  { 
    id: 3, 
    title: 'QA-инженеры · отбор', 
    subtitle: 'QA · ссылка активна', 
    composition: '1 осн + 2 доп', 
    status: 'Активно', 
    passed: '87', 
    endDate: '30.05.2025', 
    statusType: 'active' 
  },
  { 
    id: 4, 
    title: 'Тимлиды · внутренний', 
    subtitle: 'Тимлид · архив', 
    composition: '1 осн', 
    status: 'Архив', 
    passed: '64', 
    endDate: '01.04.2025', 
    statusType: 'archive' 
  },
];