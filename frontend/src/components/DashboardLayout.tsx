
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-dark-bg text-text-main overflow-hidden">

      {/* Шапка */}
      <Header />

      {/* Основная область */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Боковая панель */}
        <Sidebar />

        {/* Контент */}
        <main className="flex-1 min-w-0 min-h-0 overflow-hidden bg-dark-bg">
          <Outlet />
        </main>

      </div>

      {/* Футер */}
      <footer className="h-18.75 shrink-0 border-t border-dark-hover bg-dark-bg px-6 py-3 flex items-center">

        <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto">

          {/* Логотип */}
          <div className="flex items-center gap-3 shrink-0">

            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <polygon
                  points="12,2 20,7 20,17 12,22 4,17 4,7"
                  fill="#0D1117"
                />
              </svg>
            </div>

            <span className="text-base font-semibold">
              testcore
            </span>

          </div>

          {/* Команда */}
          <div className="text-center text-xs text-text-muted leading-5">

            <p>
              Тимлид: Радыно Екатерина; Аналитик: Гашкова Полина;
              Дизайнер: Канонерова Анастасия;
            </p>

            <p>
              Frontend-разработчик: Дарыбаева Розалина;
              Backend-разработчик: Протопопов Олег.
            </p>

            <p className="text-[#6E7681]">
              ©Testcore 2026
            </p>

          </div>

          <div className="w-9 shrink-0" />

        </div>

      </footer>

    </div>
  );
};
