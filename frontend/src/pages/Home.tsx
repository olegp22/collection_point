
import { useNavigate } from 'react-router-dom';

import {
  Search,
  ChevronDown,
  MoreVertical,
} from 'lucide-react';

import { mockTestsData } from '../data/tests';

const StatusBadge = ({
  type,
  label,
}: {
  type: 'active' | 'draft' | 'archive';
  label: string;
}) => {
  const styles = {
    active: 'bg-[#12271F] text-[#3FB950]',
    draft: 'bg-dark-hover text-text-muted',
    archive: 'bg-dark-hover text-text-muted',
  };

  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium min-w-31.25 ${styles[type]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          type === 'active' ? 'bg-[#3FB950]' : 'bg-text-muted'
        }`}
      />
      {label}
    </div>
  );
};

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6">
      <div className="max-w-[1600px] w-full mx-auto flex-1 min-h-0 flex flex-col">

        {/* Заголовок */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 shrink-0">

          <div>
            <h1 className="text-2xl font-semibold text-text-main mb-1">
              Тестирования
            </h1>

            <p className="text-sm text-text-muted">
              Кампании: основной тест + дополнительные по условию
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              className="border border-dark-border bg-dark-panel hover:bg-dark-hover text-text-main px-3 py-2 rounded-lg text-sm transition-colors"
            >
              Отчёт
            </button>

            <button
              type="button"
              onClick={() => navigate('/testing/new')}
              className="bg-accent hover:bg-[#388BFD] text-dark-bg font-semibold px-3 py-2 rounded-lg text-sm transition-colors"
            >
              + Новое тестирование
            </button>

          </div>
        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 shrink-0">

          <div className="flex flex-wrap items-center gap-2">

            {/* Поиск */}
            <div className="relative w-full sm:w-75">

              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7681]" />

              <input
                type="text"
                placeholder="Поиск кампании..."
                className="w-full h-9 bg-input-bg border border-dark-border rounded-lg pl-9 pr-3 text-sm text-text-main placeholder:text-[#6E7681] outline-none focus:border-accent"
              />

            </div>

            {/* Статус */}
            <div className="relative">

              <select
                defaultValue=""
                className="appearance-none h-9 w-27 bg-input-bg border border-dark-border rounded-lg pl-3 pr-8 text-sm text-text-main outline-none focus:border-accent cursor-pointer"
              >
                <option value="">Статус</option>
                <option value="active">Активно</option>
                <option value="draft">Черновик</option>
                <option value="archive">Архив</option>
              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />

            </div>

            {/* Специальность */}
            <div className="relative">

              <select
                defaultValue=""
                className="appearance-none h-9 w-24.5 bg-input-bg border border-dark-border rounded-lg pl-3 pr-8 text-sm text-text-main outline-none focus:border-accent cursor-pointer"
              >
                <option value="">Спец.</option>
                <option>Аналитик</option>
                <option>Программист</option>
                <option>QA</option>
                <option>Тимлид</option>
              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />

            </div>

            {/* Период */}
            <div className="relative">

              <select
                defaultValue=""
                className="appearance-none h-9 w-28.5 bg-input-bg border border-dark-border rounded-lg pl-3 pr-8 text-sm text-text-main outline-none focus:border-accent cursor-pointer"
              >
                <option value="">Период</option>
                <option>Последняя неделя</option>
                <option>Последний месяц</option>
                <option>Последний год</option>
              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />

            </div>

          </div>

          <div className="text-xs text-text-muted whitespace-nowrap">
            Показано {mockTestsData.length} из 12
          </div>

        </div>

        {/* Прокручиваемая таблица */}
        <div className="flex-1 min-h-0 w-full overflow-auto">

          <table className="w-full min-w-237.5 text-left border-collapse">

            <thead className="sticky top-0 z-10 bg-dark-panel">

              <tr className="border-b border-dark-border text-xs text-text-muted uppercase tracking-wider">

                <th className="py-2.5 px-3 w-11.25 bg-dark-panel"></th>

                <th className="py-2.5 px-3 font-semibold bg-dark-panel">
                  Название кампании
                </th>

                <th className="py-2.5 px-3 font-semibold w-40 bg-dark-panel">
                  Состав
                </th>

                <th className="py-2.5 px-3 font-semibold w-37.5 bg-dark-panel">
                  Статус
                </th>

                <th className="py-2.5 px-3 font-semibold w-25 bg-dark-panel">
                  Прошли
                </th>

                <th className="py-2.5 px-3 font-semibold w-35 bg-dark-panel">
                  Дедлайн
                </th>

                <th className="py-2.5 px-3 w-11.25 bg-dark-panel"></th>

              </tr>

            </thead>

            <tbody className="divide-y divide-dark-hover">

              {mockTestsData.map((test) => (

                <tr
                  key={test.id}
                  onClick={() => navigate(`/testing/${test.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      navigate(`/testing/${test.id}`);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  className="group hover:bg-dark-panel transition-colors cursor-pointer"
                >

                  <td className="py-2.5 px-3">

                    <input
                      type="checkbox"
                      aria-label={`Выбрать ${test.title}`}
                      onClick={(event) => event.stopPropagation()}
                      className="w-4 h-4 accent-accent cursor-pointer"
                    />

                  </td>

                  <td className="py-2.5 px-3">

                    <div className="flex flex-col gap-0.5">

                      <span className="text-sm font-semibold text-text-main">
                        {test.title}
                      </span>

                      <span className="text-xs text-text-muted">
                        {test.subtitle}
                      </span>

                    </div>

                  </td>

                  <td className="py-2.5 px-3 text-sm text-text-main whitespace-nowrap">
                    {test.composition}
                  </td>

                  <td className="py-2.5 px-3">

                    <StatusBadge
                      type={test.statusType}
                      label={test.status}
                    />

                  </td>

                  <td className="py-2.5 px-3 text-sm text-text-main">
                    {test.passed}
                  </td>

                  <td className="py-2.5 px-3 text-sm text-text-muted whitespace-nowrap">
                    {test.endDate}
                  </td>

                  <td className="py-2.5 px-3 text-right">

                    <button
                      type="button"
                      aria-label={`Действия: ${test.title}`}
                      onClick={(event) => event.stopPropagation()}
                      className="text-text-muted hover:text-white transition-colors"
                    >
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
  );
};
