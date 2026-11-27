
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
    <aside className="w-55 max-w-[25vw] min-w-45 shrink-0 bg-[#161B22] border-r border-dark-border flex flex-col">

      <nav className="flex-1 py-5 px-3 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `min-h-11 flex items-center justify-between px-3 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-dark-hover text-text-main border-l-[3px] border-accent'
                  : 'text-text-muted hover:text-text-main hover:bg-dark-hover'
              }`
            }
          >
            <span>{item.title}</span>

            {item.count && (
              <span className="text-xs text-accent">
                {item.count}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};
