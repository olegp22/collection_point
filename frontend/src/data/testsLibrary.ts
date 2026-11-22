export interface TestLibraryItem {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  questionsCount: number;
  usedIn: number | null;
  modifiedDate: string;
}

export const mockTestsLibraryData: TestLibraryItem[] = [
  {
    id: 1,
    title: 'Основы алгоритмов',
    subtitle: 'Тест на базовые структуры данных',
    icon: '🧩',
    questionsCount: 20,
    usedIn: 2,
    modifiedDate: '15.05.2025',
  },
  {
    id: 2,
    title: 'SQL для аналитика',
    subtitle: 'SELECT, JOIN, агрегаты',
    icon: '📊',
    questionsCount: 10,
    usedIn: 1,
    modifiedDate: '14.05.2025',
  },
  {
    id: 3,
    title: 'Python: базовый',
    subtitle: 'Синтаксис, типы, функции',
    icon: '🐍',
    questionsCount: 15,
    usedIn: null,
    modifiedDate: '10.05.2025',
  },
  {
    id: 4,
    title: 'Управление командой',
    subtitle: 'Менеджмент, коммуникация',
    icon: '👥',
    questionsCount: 25,
    usedIn: 1,
    modifiedDate: '05.05.2025',
  },
];