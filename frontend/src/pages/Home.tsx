import React from 'react';
import { 
  Search, Bell, HelpCircle, Home as HomeIcon, 
  ChevronDown, MoreVertical
} from 'lucide-react';

import { mockTestsData } from '../data/tests';

const StatusBadge = ({ type, label }: { type: string, label: string }) => {
  const styles = {
    active: "bg-[#1C3A2B] text-[#4ADE80]",
    draft: "bg-[#21262D] text-[#8B949E]",
    archive: "bg-[#21262D] text-[#8B949E]",
  };

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium w-max ${styles[type as keyof typeof styles]}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${type === 'active' ? 'bg-[#4ADE80]' : 'bg-[#8B949E]'}`}></div>
      {label}
    </div>
  );
};

export const Home = () => {
  return (
    // Убрали flex-row для всего экрана, теперь это flex-col
    <div className="flex flex-col h-screen w-full overflow-hidden bg-dark-bg">
      
      {/* --- ВЕРХНЯЯ ШАПКА (На всю ширину) --- */}
      <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 border-b border-dark-border bg-dark-panel relative z-20">
        
        {/* Левая часть: Логотип */}
        <div className="flex items-center gap-3 z-10">
          <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="24" fill="#58A6FF" />
            <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" fill="#0D1117" stroke="#0D1117" strokeWidth="4" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold text-sm">testcore</span>
        </div>

        {/* Центральная часть: Поиск (Абсолютное центрирование) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[40vw]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#58A6FF]" />
          <input 
            type="text" 
            placeholder="поиск..." 
            className="w-full bg-input-bg border border-dark-border text-sm rounded-md py-2 pl-9 pr-4 focus:outline-none focus:border-accent text-text-main placeholder:text-text-muted"
          />
        </div>

        {/* Правая часть: Иконки */}
        <div className="flex items-center gap-4 text-text-muted z-10">
          <button className="hover:text-text-main transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="hover:text-text-main transition-colors"><HelpCircle className="w-5 h-5" /></button>
          <div className="w-8 h-8 rounded-full bg-dark-border flex items-center justify-center text-xs text-text-main cursor-pointer">
            ИП
          </div>
        </div>
      </header>

      {/* --- ОСНОВНАЯ ЧАСТЬ (Сайдбар + Контент) --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* САЙДБАР */}
        <aside className="w-[240px] flex-shrink-0 bg-dark-panel flex flex-col border-r border-dark-border">
          <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-white hover:bg-dark-hover rounded-lg transition-colors text-sm">
              <HomeIcon className="w-4 h-4" /> Обзор
            </a>
            <a href="#" className="flex items-center justify-between px-3 py-2 bg-[#0D1117] text-white rounded-lg text-sm border-l-2 border-accent">
              <span>Тестирования</span>
              <span className="text-xs text-accent">4</span>
            </a>
            <a href="#" className="flex items-center justify-between px-3 py-2 text-text-muted hover:text-white hover:bg-dark-hover rounded-lg transition-colors text-sm">
              <span>Тесты</span>
              <span className="text-xs bg-dark-border px-1.5 py-0.5 rounded text-text-muted">12</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-text-muted hover:text-white hover:bg-dark-hover rounded-lg transition-colors text-sm">
              <span>Результаты</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-text-muted hover:text-white hover:bg-dark-hover rounded-lg transition-colors text-sm">
              <span>Студенты</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-text-muted hover:text-white hover:bg-dark-hover rounded-lg transition-colors text-sm">
              <span>Настройки</span>
            </a>
            <div className="w-full border-t border-[#21262D] mt-2"></div>
          </nav>
        </aside>

        {/* КОНТЕНТ */}
        <main className="flex-1 flex flex-col min-w-0 overflow-auto">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold mb-1">Тестирования</h1>
                  <p className="text-sm text-text-muted">Кампании: основной тест + дополнительные по условию</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="border border-dark-border text-text-main hover:bg-dark-hover px-4 py-2 rounded-md text-sm transition-colors">
                    Отчет
                  </button>
                  <button className="bg-accent hover:bg-[#4b90e6] text-[#0D1117] font-semibold px-4 py-2 rounded-md text-sm transition-colors">
                    + Новое тестирование
                  </button>
                </div>
              </div>

              {/* Фильтры */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                      type="text" 
                      placeholder="Поиск" 
                      className="w-full bg-input-bg border border-dark-border text-sm rounded-md py-2 pl-9 pr-4 focus:outline-none focus:border-accent text-white placeholder:text-text-muted"
                    />
                  </div>
                  
                  <div className="relative">
                    <select className="appearance-none bg-input-bg border border-dark-border text-sm rounded-md py-2 pl-3 pr-10 focus:outline-none focus:border-accent text-white w-32 cursor-pointer">
                      <option>Статус</option>
                      <option>Активно</option>
                      <option>Черновик</option>
                      <option>Архив</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select className="appearance-none bg-input-bg border border-dark-border text-sm rounded-md py-2 pl-3 pr-10 focus:outline-none focus:border-accent text-white w-32 cursor-pointer">
                      <option>Спец.</option>
                      <option>Аналитик</option>
                      <option>Программист</option>
                      <option>QA</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select className="appearance-none bg-input-bg border border-dark-border text-sm rounded-md py-2 pl-3 pr-10 focus:outline-none focus:border-accent text-white w-32 cursor-pointer">
                      <option>Период</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  </div>
                </div>
                
                <div className="text-sm text-text-muted">
                  Показано 4 из 12
                </div>
              </div>

              {/* Таблица */}
              <div className="w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-dark-border text-xs text-text-muted uppercase tracking-wider bg-dark-table">
                      <th className="py-3 px-4 w-12 rounded-l-md">
                        <div className="w-4 h-4 rounded border border-[#4A4B52] bg-dark-bg"></div>
                      </th>
                      <th className="py-3 px-4 font-medium">Название кампании</th>
                      <th className="py-3 px-4 font-medium">Состав</th>
                      <th className="py-3 px-4 font-medium">Статус</th>
                      <th className="py-3 px-4 font-medium">Прошли</th>
                      <th className="py-3 px-4 font-medium">Дедлайн</th>
                      <th className="py-3 px-4 w-12 rounded-r-md"></th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-dark-border">
                    {mockTestsData.map((test) => (
                      <tr key={test.id} className="hover:bg-[#161B22] transition-colors group">
                        <td className="py-4 px-4">
                          <div className="w-4 h-4 rounded border border-[#4A4B52] bg-dark-bg group-hover:border-accent cursor-pointer"></div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-text-main mb-0.5">
                              <span className="whitespace-nowrap">{test.title}</span>
                            </div>
                            <span className="text-xs text-text-muted">{test.subtitle}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-text-main whitespace-nowrap">
                          {test.composition}
                        </td>
                        <td className="py-4 px-4">
                          <StatusBadge type={test.statusType} label={test.status} />
                        </td>
                        <td className="py-4 px-4 text-sm text-text-main">
                          {test.passed}
                        </td>
                        <td className="py-4 px-4 text-sm text-text-main whitespace-nowrap">
                          {test.endDate}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="text-text-muted hover:text-text-main transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};