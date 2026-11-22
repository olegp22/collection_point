
import { useMemo, useState } from 'react';

import {
  Search,
  ChevronDown,
} from 'lucide-react';

import { mockTestsLibraryData } from '../data/testsLibrary';

type UsageFilter = 'all' | 'used' | 'unused';

const UsedInBadge = ({
  count,
}: {
  count: number | null;
}) => {
  if (count === null || count === 0) {
    return (
      <div className="flex items-center gap-2 px-2.5 py-1 rounded-md 
      text-sm font-medium w-full max-w-[220px] bg-[#21262D] text-[#8B949E]">
        <div className="w-2 h-2 rounded-full bg-[#8B949E] shrink-0" />
        не используется
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 
    rounded-md text-sm font-medium w-full max-w-[220px] 
    bg-[#172331] text-[#58A6FF]">
      <div className="w-2 h-2 rounded-full bg-[#58A6FF] shrink-0" />
      {count} {count === 1 ? 'кампания' : count >= 2 && count <= 4 ? 'кампании' : 'кампаний'}
    </div>
  );
};

export const Tests = () => {
  const [search, setSearch] = useState('');
  const [usageFilter, setUsageFilter] = useState<UsageFilter>('all');

  const filteredTests = useMemo(() => {
    return mockTestsLibraryData.filter((test) => {
      const value = search.toLowerCase().trim();

      const matchesSearch =
        test.title.toLowerCase().includes(value) ||
        test.subtitle.toLowerCase().includes(value);

      const matchesUsage =
        usageFilter === 'all' ||
        (usageFilter === 'used' && test.usedIn !== null && test.usedIn > 0) ||
        (usageFilter === 'unused' && (test.usedIn === null || test.usedIn === 0));

      return matchesSearch && matchesUsage;
    });
  }, [search, usageFilter]);

  return (
    <div className="h-full min-h-0 flex flex-col p-3 md:p-5 lg:p-6">

      <div className="max-w-[1600px] w-full mx-auto flex-1 min-h-0 flex flex-col">

        {/* Заголовок */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3 flex-shrink-0">

          <div>
            <h1 className="text-2xl font-semibold text-[#E6EDF3]">
              Библиотека тестов
            </h1>

            <p className="text-sm text-[#8B949E] mt-1">
              Переиспользуемые наборы вопросов
            </p>
          </div>

          <button
            type="button"
            className="h-[42px] bg-[#58A6FF] hover:bg-[#388BFD] 
            text-[#0D1117] font-semibold px-5 rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            + Новый тест
          </button>

        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-wrap items-center gap-3 mb-2 flex-shrink-0">

          <div className="relative w-full sm:w-[357px]">

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск названия..."
              className="w-full h-[40px] bg-[#010409] border 
              border-[#30363D] rounded-lg px-3.5 text-sm text-[#E6EDF3] 
              placeholder:text-[#6E7681] outline-none focus:border-[#58A6FF]"
            />

          </div>

          <div className="relative">

            <select
              value={usageFilter}
              onChange={(event) =>
                setUsageFilter(event.target.value as UsageFilter)
              }
              className="appearance-none h-[40px] w-[178px] bg-[#010409] 
              border border-[#30363D] rounded-lg pl-3 pr-10 text-sm 
              text-[#E6EDF3] outline-none focus:border-[#58A6FF] cursor-pointer"
            >
              <option value="all">Используется в</option>
              <option value="used">Используется</option>
              <option value="unused">Не используется</option>
            </select>

            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 
            -translate-y-1/2 text-[#8B949E] pointer-events-none" />

          </div>

        </div>

        {/* Прокручиваемая таблица */}
        <div className="flex-1 min-h-0 w-full overflow-auto">

          <table className="w-full min-w-[750px] table-fixed text-left border-collapse">

            <colgroup>
              <col className="w-[53%]" />
              <col className="w-[9%]" />
              <col className="w-[18%]" />
              <col className="w-[20%]" />
            </colgroup>

            <thead className="sticky top-0 z-10 bg-[#161B22]">

              <tr className="h-[40px] border-b border-[#30363D] text-xs text-[#8B949E] uppercase tracking-wider">

                <th className="py-2 px-4 font-semibold bg-[#161B22]">
                  Название
                </th>

                <th className="py-2 px-3 font-semibold bg-[#161B22]">
                  Вопр.
                </th>

                <th className="py-2 px-3 font-semibold bg-[#161B22]">
                  Используется в
                </th>

                <th className="py-2 px-3 font-semibold bg-[#161B22]">
                  Изменён
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTests.map((test) => (

                <tr
                  key={test.id}
                  className="h-[62px] border-b border-[#30363D] hover:bg-[#161B22] transition-colors"
                >

                  <td className="px-4 py-2">

                    <div className="flex flex-col gap-0.5">

                      <span className="text-sm font-medium text-[#E6EDF3]">
                        {test.title}
                      </span>

                      <span className="text-sm text-[#8B949E]">
                        {test.subtitle}
                      </span>

                    </div>

                  </td>

                  <td className="px-3 text-sm text-[#E6EDF3]">
                    {test.questionsCount}
                  </td>

                  <td className="px-3">
                    <UsedInBadge count={test.usedIn} />
                  </td>

                  <td className="px-3 text-sm text-[#8B949E] whitespace-nowrap">
                    {test.modifiedDate}
                  </td>

                </tr>

              ))}

              {filteredTests.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-sm text-[#8B949E]"
                  >
                    Тесты не найдены
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};
