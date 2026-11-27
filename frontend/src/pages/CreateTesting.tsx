
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockTestsLibraryData } from '../data/testsLibrary';
import { mockSpecialities } from '../data/specialities';

export const CreateTesting = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedTest, setSelectedTest] = useState<number | null>(
    mockTestsLibraryData[0]?.id ?? null
  );

  const filteredTests = useMemo(() => {
    const value = search.toLowerCase().trim();

    return mockTestsLibraryData.filter(
      (test) =>
        test.title.toLowerCase().includes(value) ||
        test.subtitle.toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-dark-bg">
      <div className="flex h-15 shrink-0 items-center border-b border-dark-hover px-6 md:px-8">
        <div className="flex items-center gap-2.5 text-2xl">
          <span className="text-[#6E7681]">testcore</span>

          <span className="text-[#484F58]">›</span>

          <button
            type="button"
            onClick={() => navigate('/testing')}
            className="text-[#6E7681] hover:text-text-main"
          >
            Тестирования
          </button>

          <span className="text-[#484F58]">›</span>

          <span className="text-text-main">
            Новое тестирование
          </span>
        </div>
      </div>

      {/* Этапы создания */}
      <div className="flex h-12.5 shrink-0 items-center border-b border-dark-border bg-dark-panel px-5 md:px-8">
        <div className="mx-auto grid w-full max-w-262.5 grid-cols-4">
          {/* Этап 1 */}
          <div className="flex items-center gap-2.5 border-r border-dark-border">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#238636] bg-[#123D25] text-sm text-[#3FB950]">
              ✓
            </div>

            <span className="text-xs text-text-muted">
              Основное
            </span>
          </div>

          {/* Этап 2 */}
          <div className="flex items-center gap-2.5 border-r border-dark-border px-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-semibold text-dark-bg">
              2
            </div>

            <span className="text-xs font-semibold text-text-main">
              Основной тест
            </span>
          </div>

          {/* Этап 3 */}
          <div className="flex items-center gap-2.5 border-r border-dark-border px-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-dark-border bg-[#1C2128] text-sm text-[#6E7681]">
              3
            </div>

            <span className="text-xs text-[#6E7681]">
              Доп. тесты
            </span>
          </div>

          {/* Этап 4 */}
          <div className="flex items-center gap-2.5 px-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-dark-border bg-[#1C2128] text-sm text-[#6E7681]">
              4
            </div>

            <span className="text-xs text-[#6E7681]">
              Публикация
            </span>
          </div>
        </div>
      </div>

      {/* Основное содержимое */}
      <div className="min-h-0 flex-1 overflow-auto px-5 pb-5 pt-2 md:px-8">
        <div className="mx-auto max-w-278.75">
          {/* Заголовок */}
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-text-main">
              Выберите основной тест
            </h1>

            <p className="mt-1 text-xs text-text-muted">
              Проходит каждый студент
            </p>
          </div>

          {/* Поиск и фильтры */}
          <div className="mb-4 flex flex-wrap gap-2.5">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск теста..."
              className="h-8.5 w-full rounded-lg border border-dark-border bg-input-bg px-3 text-xs text-text-main outline-none placeholder:text-[#6E7681] focus:border-accent sm:w-85.75"
            />

            <select
              defaultValue=""
              className="h-8.5 w-43 cursor-pointer rounded-lg border border-dark-border bg-input-bg px-3 text-xs text-text-muted outline-none focus:border-accent"
            >
              <option value="">Спец.</option>

              {mockSpecialities.map((speciality) => (
                <option key={speciality.id} value={speciality.value}>
                  {speciality.title}
                </option>
              ))}
            </select>
          </div>

          {/* Карточки тестов */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {filteredTests.map((test) => {
              const isSelected = selectedTest === test.id;

              return (
                <button
                  key={test.id}
                  type="button"
                  onClick={() => setSelectedTest(test.id)}
                  className={`min-h-14.5 rounded-lg border px-3.5 py-2 text-left transition-colors ${
                    isSelected
                      ? 'border-accent bg-dark-panel'
                      : 'border-dark-border bg-dark-panel hover:border-[#484F58]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-4.25 w-4.25 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-accent'
                          : 'border-[#6E7681]'
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                      )}
                    </div>

                    <span className="text-sm font-semibold text-text-main">
                      {test.title}
                    </span>
                  </div>

                  <p className="ml-6.25 mt-1 text-xs text-text-muted">
                    {test.questionsCount} вопр. · {test.subtitle}
                  </p>
                </button>
              );
            })}

            {/* Создание нового теста */}
            <button
              type="button"
              onClick={() => navigate('/tests')}
              className="flex min-h-14.5 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-dark-border bg-dark-panel transition-colors hover:border-accent"
            >
              <span className="text-sm font-medium text-accent">
                + Создать новый тест
              </span>

              <span className="text-xs text-[#6E7681]">
                Откроется библиотека тестов
              </span>
            </button>
          </div>

          {/* Кнопки управления */}
          <div className="mt-7 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/testing')}
              className="h-8.5 rounded-lg border border-dark-border bg-dark-panel px-3.5 text-xs text-text-main transition-colors hover:bg-dark-hover"
            >
              ← Назад
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/testing')}
                className="h-8.5 rounded-lg border border-dark-border bg-dark-panel px-3.5 text-xs text-text-main transition-colors hover:bg-dark-hover"
              >
                Черновик
              </button>

              <button
                type="button"
                disabled={selectedTest === null}
                className="h-8.5 rounded-lg bg-accent px-4 text-xs font-semibold text-dark-bg transition-colors hover:bg-[#388BFD] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Далее →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
