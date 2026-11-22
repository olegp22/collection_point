
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    title: 'Обзор',
    path: '/',
    end: true,
  },
  {
    title: 'Тестирования',
    path: '/testing',
    count: '4',
  },
  {
    title: 'Тесты',
    path: '/tests',
    count: '12',
  },
  {
    title: 'Результаты',
    path: '/results',
  },
  {
    title: 'Студенты',
    path: '/students',
  },
  {
    title: 'Настройки',
    path: '/settings',
  },
];

export const Sidebar = () => {
  return (
    <aside className="w-[220px] max-w-25vw] min-w-[180px] 
    flex-shrink-0 bg-[#161B22] border-r border-[#30363D] flex flex-col">
      <nav className="flex-1 py-5 px-3 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `min-h-[44px] flex items-center justify-between px-3 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#21262D] text-[#E6EDF3] border-l-[3px] border-[#58A6FF]'
                  : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]'
              }`
            }
          >
            <span>{item.title}</span>

            {item.count && (
              <span className="text-xs text-[#58A6FF]">
                {item.count}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
