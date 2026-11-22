
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
    draft: 'bg-[#21262D] text-[#8B949E]',
    archive: 'bg-[#21262D] text-[#8B949E]',
  };

  return (
    <div className={`flex items-center gap-2 px-2.5 py-1 rounded-md 
    text-xs font-medium min-w-[125px] ${styles[type]}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          type === 'active' ? 'bg-[#3FB950]' : 'bg-[#8B949E]'
        }`}
      />
      {label}
    </div>
  );
};

export const Home = () => {
  return (
    <div className="h-full min-h-0 flex flex-col p-4 md:p-6">

      <div className="max-w-[1600px] w-full mx-auto flex-1 min-h-0 flex flex-col">

        {/* Заголовок */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 flex-shrink-0">

          <div>
            <h1 className="text-2xl font-semibold text-[#E6EDF3] mb-1">
              Тестирования
            </h1>

            <p className="text-sm text-[#8B949E]">
              Кампании: основной тест + дополнительные по условию
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              className="border border-[#30363D] bg-[#161B22] hover:bg-[#21262D]
              text-[#E6EDF3] px-3 py-2 rounded-lg text-sm transition-colors"
            >
              Отчёт
            </button>

            <button
              type="button"
              className="bg-[#58A6FF] hover:bg-[#388BFD] text-[#0D1117] 
              font-semibold px-3 py-2 rounded-lg text-sm transition-colors"
            >
              + Новое тестирование
            </button>

          </div>
        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 flex-shrink-0">

          <div className="flex flex-wrap items-center gap-2">

            <div className="relative w-full sm:w-[300px]">

              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7681]" />

              <input
                type="text"
                placeholder="Поиск кампании..."
                className="w-full h-9 bg-[#010409] border border-[#30363D] 
                rounded-lg pl-9 pr-3 text-sm text-[#E6EDF3] 
                placeholder:text-[#6E7681] outline-none focus:border-[#58A6FF]"
              />

            </div>

            <div className="relative">

              <select
                defaultValue=""
                className="appearance-none h-9 w-[108px] bg-[#010409] border 
                border-[#30363D] rounded-lg pl-3 pr-8 text-sm text-[#E6EDF3] 
                outline-none focus:border-[#58A6FF] cursor-pointer"
              >
                <option value="">Статус</option>
                <option value="active">Активно</option>
                <option value="draft">Черновик</option>
                <option value="archive">Архив</option>
              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 
              -translate-y-1/2 text-[#8B949E] pointer-events-none" />

            </div>

            <div className="relative">

              <select
                defaultValue=""
                className="appearance-none h-9 w-[98px] bg-[#010409] 
                border border-[#30363D] rounded-lg pl-3 pr-8 text-sm text-[#E6EDF3] outline-none focus:border-[#58A6FF] cursor-pointer"
              >
                <option value="">Спец.</option>
                <option>Аналитик</option>
                <option>Программист</option>
                <option>QA</option>
                <option>Тимлид</option>
              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 
              top-1/2 -translate-y-1/2 text-[#8B949E] pointer-events-none" />

            </div>

            <div className="relative">

              <select
                defaultValue=""
                className="appearance-none h-9 w-[114px] bg-[#010409] 
                border border-[#30363D] rounded-lg pl-3 pr-8 text-sm 
                text-[#E6EDF3] outline-none focus:border-[#58A6FF] cursor-pointer"
              >
                <option value="">Период</option>
                <option>Последняя неделя</option>
                <option>Последний месяц</option>
                <option>Последний год</option>
              </select>

              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 
              top-1/2 -translate-y-1/2 text-[#8B949E] pointer-events-none" />

            </div>

          </div>

          <div className="text-xs text-[#8B949E] whitespace-nowrap">
            Показано {mockTestsData.length} из 12
          </div>

        </div>

        {/* Прокручиваемая таблица */}
        <div className="flex-1 min-h-0 w-full overflow-auto">

          <table className="w-full min-w-[950px] text-left border-collapse">

            <thead className="sticky top-0 z-10 bg-[#161B22]">

              <tr className="border-b border-[#30363D] text-xs 
              text-[#8B949E] uppercase tracking-wider">

                <th className="py-2.5 px-3 w-[45px] bg-[#161B22]"></th>

                <th className="py-2.5 px-3 font-semibold bg-[#161B22]">
                  Название кампании
                </th>

                <th className="py-2.5 px-3 font-semibold w-[160px] bg-[#161B22]">
                  Состав
                </th>

                <th className="py-2.5 px-3 font-semibold w-[150px] bg-[#161B22]">
                  Статус
                </th>

                <th className="py-2.5 px-3 font-semibold w-[100px] bg-[#161B22]">
                  Прошли
                </th>

                <th className="py-2.5 px-3 font-semibold w-[140px] bg-[#161B22]">
                  Дедлайн
                </th>

                <th className="py-2.5 px-3 w-[45px] bg-[#161B22]"></th>

              </tr>

            </thead>

            <tbody className="divide-y divide-[#21262D]">

              {mockTestsData.map((test) => (

                <tr
                  key={test.id}
                  className="group hover:bg-[#161B22] transition-colors"
                >

                  <td className="py-2.5 px-3">

                    <input
                      type="checkbox"
                      aria-label={`Выбрать ${test.title}`}
                      className="w-4 h-4 accent-[#58A6FF] cursor-pointer"
                    />

                  </td>

                  <td className="py-2.5 px-3">

                    <div className="flex flex-col gap-0.5">

                      <span className="text-sm font-semibold text-[#E6EDF3]">
                        {test.title}
                      </span>

                      <span className="text-xs text-[#8B949E]">
                        {test.subtitle}
                      </span>

                    </div>

                  </td>

                  <td className="py-2.5 px-3 text-sm text-[#E6EDF3] whitespace-nowrap">
                    {test.composition}
                  </td>

                  <td className="py-2.5 px-3">

                    <StatusBadge
                      type={test.statusType}
                      label={test.status}
                    />

                  </td>

                  <td className="py-2.5 px-3 text-sm text-[#E6EDF3]">
                    {test.passed}
                  </td>

                  <td className="py-2.5 px-3 text-sm text-[#8B949E] whitespace-nowrap">
                    {test.endDate}
                  </td>

                  <td className="py-2.5 px-3 text-right">

                    <button
                      type="button"
                      aria-label={`Действия: ${test.title}`}
                      className="text-[#8B949E] hover:text-white transition-colors"
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
