
import { useMemo, useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { mockTestsLibraryData } from '../data/testsLibrary';

type UsageFilter = 'all' | 'used' | 'unused';

const UsedInBadge = ({
  count,
}: {
  count: number | null;
}) => {
  if (count === null || count === 0) {
    return (
      <div className="flex w-full max-w-55 items-center gap-2 rounded-md bg-dark-hover px-2.5 py-1 text-sm font-medium text-text-muted">
        <div className="h-2 w-2 shrink-0 rounded-full bg-text-muted" />
        не используется
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-55 items-center gap-2 rounded-md bg-[#172331] px-2.5 py-1 text-sm font-medium text-accent">
      <div className="h-2 w-2 shrink-0 rounded-full bg-accent" />
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
    <div className="flex h-full min-h-0 flex-col p-3 md:p-5 lg:p-6">

      <div className="mx-auto flex w-full max-w-400 min-h-0 flex-1 flex-col">

        {/* Заголовок */}
        <div className="mb-3 flex shrink-0 flex-wrap items-start justify-between gap-3">

          <div>
            <h1 className="text-2xl font-semibold text-text-main">
              Библиотека тестов
            </h1>

            <p className="mt-1 text-sm text-text-muted">
              Переиспользуемые наборы вопросов
            </p>
          </div>

          <button
            type="button"
            className="h-10 shrink-0 whitespace-nowrap rounded-lg bg-accent px-5 text-sm font-semibold text-dark-bg transition-colors hover:bg-[#388BFD]"
          >
            + Новый тест
          </button>

        </div>

        {/* Поиск и фильтры */}
        <div className="mb-2 flex shrink-0 flex-wrap items-center gap-3">

          <div className="relative w-full sm:w-89.25">

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск названия..."
              className="h-10 w-full rounded-lg border border-dark-border bg-input-bg px-3.5 text-sm text-text-main placeholder:text-[#6E7681] outline-none focus:border-accent"
            />

          </div>

          <div className="relative">

            <select
              value={usageFilter}
              onChange={(event) =>
                setUsageFilter(event.target.value as UsageFilter)
              }
              className="h-10 w-44.5 cursor-pointer appearance-none rounded-lg border border-dark-border bg-input-bg pl-3 pr-10 text-sm text-text-main outline-none focus:border-accent"
            >
              <option value="all">Используется в</option>
              <option value="used">Используется</option>
              <option value="unused">Не используется</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

          </div>

        </div>

        {/* Прокручиваемая таблица */}
        <div className="min-h-0 w-full flex-1 overflow-auto">

          <table className="w-full min-w-187.5 table-fixed border-collapse text-left">

            <colgroup>
              <col className="w-[53%]" />
              <col className="w-[9%]" />
              <col className="w-[18%]" />
              <col className="w-[20%]" />
            </colgroup>

            <thead className="sticky top-0 z-10 bg-dark-panel">

              <tr className="h-10 border-b border-dark-border text-xs uppercase tracking-wider text-text-muted">

                <th className="bg-dark-panel px-4 py-2 font-semibold">
                  Название
                </th>

                <th className="bg-dark-panel px-3 py-2 font-semibold">
                  Вопр.
                </th>

                <th className="bg-dark-panel px-3 py-2 font-semibold">
                  Используется в
                </th>

                <th className="bg-dark-panel px-3 py-2 font-semibold">
                  Изменён
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTests.map((test) => (

                <tr
                  key={test.id}
                  className="h-15.5 border-b border-dark-border transition-colors hover:bg-dark-panel"
                >

                  <td className="px-4 py-2">

                    <div className="flex flex-col gap-0.5">

                      <span className="text-sm font-medium text-text-main">
                        {test.title}
                      </span>

                      <span className="text-sm text-text-muted">
                        {test.subtitle}
                      </span>

                    </div>

                  </td>

                  <td className="px-3 text-sm text-text-main">
                    {test.questionsCount}
                  </td>

                  <td className="px-3">
                    <UsedInBadge count={test.usedIn} />
                  </td>

                  <td className="whitespace-nowrap px-3 text-sm text-text-muted">
                    {test.modifiedDate}
                  </td>

                </tr>

              ))}

              {filteredTests.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-sm text-text-muted"
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
