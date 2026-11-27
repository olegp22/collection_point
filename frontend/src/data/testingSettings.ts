export interface TestingSettings {
  speciality: string;
  startDate: string;
  passingScore: number;
  passingPercent: number;
  maxPoints: number;
  correctPoints: string;
  incorrectPoints: string;
  partialPoints: string;
}

export const mockTestingSettings: TestingSettings = {
  speciality: 'Аналитик',
  startDate: '12.05.2025',
  passingScore: 70,
  passingPercent: 70,
  maxPoints: 100,
  correctPoints: '+5',
  incorrectPoints: '0',
  partialPoints: '+1',
};