
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { mockTestsData } from '../data/tests';
import { mockTestsLibraryData } from '../data/testsLibrary';
import { mockSpecialities } from '../data/specialities';
import { mockTestingSettings } from '../data/testingSettings';

type Tab =
  | 'Основное'
  | 'Состав'
  | 'Проверка'
  | 'Публикация'
  | 'Результаты';

type CalculationMethod = 'points' | 'percent';

const tabs: Tab[] = [
  'Основное',
  'Состав',
  'Проверка',
  'Публикация',
  'Результаты',
];

const inputClass =
  'h-[34px] w-full rounded-md border border-dark-border bg-input-bg px-3 text-sm text-text-main outline-none focus:border-accent';

const labelClass = 'mb-1 block text-xs text-text-muted';

const cardClass =
  'min-w-0 rounded-lg border border-dark-border bg-dark-panel p-3.5';

function TestingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const testing = mockTestsData.find(
    (item) => item.id === Number(id),
  );

  const [activeTab, setActiveTab] = useState<Tab>('Основное');

  // Основные настройки
  const [title, setTitle] = useState(testing?.title ?? '');
  const [description, setDescription] = useState(
    testing?.subtitle ?? '',
  );
  const [speciality, setSpeciality] = useState(
    mockTestingSettings.speciality
  );
  const [status, setStatus] = useState(testing?.status ?? 'Активно');

  const [startDate, setStartDate] = useState(
    mockTestingSettings.startDate
  );

  const [endDate, setEndDate] = useState(
    testing?.endDate || '20.05.2025',
  );

  const [afterMessage, setAfterMessage] = useState(
    'Спасибо за прохождение! Ждём на стажировке.',
  );

  // Состав
  const [showPrimaryTest, setShowPrimaryTest] = useState(true);
  const [showAdditionalTest, setShowAdditionalTest] = useState(true);

  const [passingScore, setPassingScore] = useState(
    String(mockTestingSettings.passingScore)
  );

  // Проверка
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethod>('points');

  const [passingPercent, setPassingPercent] = useState(
    String(mockTestingSettings.passingPercent)
  );

  const [maxPoints, setMaxPoints] = useState(
    String(mockTestingSettings.maxPoints)
  );

  const [correctPoints, setCorrectPoints] = useState(
    mockTestingSettings.correctPoints
  );

  const [incorrectPoints, setIncorrectPoints] = useState(
    mockTestingSettings.incorrectPoints
  );

  const [partialPoints, setPartialPoints] = useState(
    mockTestingSettings.partialPoints
  );

  const [syncScore, setSyncScore] = useState(true);
  const [partialScoring, setPartialScoring] = useState(true);
  const [thresholdEnabled, setThresholdEnabled] = useState(true);
  const [requiredQuestions, setRequiredQuestions] = useState(true);
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);

  const primaryTest =
    mockTestsLibraryData.find((item) =>
      item.title.toLowerCase().includes('основы алгоритмов'),
    ) ?? mockTestsLibraryData[0];

  const additionalTest =
    mockTestsLibraryData.find((item) =>
      item.title.toLowerCase().includes('sql для аналитика'),
    ) ?? mockTestsLibraryData[1];

  if (!testing) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-dark-bg text-text-main">
        <h1 className="text-xl font-semibold">
          Тестирование не найдено
        </h1>

        <button
          type="button"
          onClick={() => navigate('/testing')}
          className="rounded-md bg-[#238636] px-4 py-2 text-sm text-white hover:bg-[#2EA043]"
        >
          Вернуться к тестированиям
        </button>
      </div>
    );
  }

  const openTestsLibrary = () => navigate('/tests');

  const handlePassingScoreChange = (value: string) => {
    setPassingScore(value);

    if (syncScore && maxPoints) {
      const percent = Math.round(
        (Number(value) / Number(maxPoints)) * 100,
      );

      setPassingPercent(
        String(Number.isFinite(percent) ? percent : 0),
      );
    }
  };

  const handlePassingPercentChange = (value: string) => {
    setPassingPercent(value);

    if (syncScore && maxPoints) {
      const points = Math.round(
        (Number(value) / 100) * Number(maxPoints),
      );

      setPassingScore(
        String(Number.isFinite(points) ? points : 0),
      );
    }
  };

  const handleMaxPointsChange = (value: string) => {
    setMaxPoints(value);

    if (syncScore && value) {
      const points = Math.round(
        (Number(passingPercent) / 100) * Number(value),
      );

      setPassingScore(
        String(Number.isFinite(points) ? points : 0),
      );
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-dark-bg text-text-main">
      {/* Заголовок страницы */}
      <div className="shrink-0 px-5 pb-2 pt-2 md:px-7">
        <div className="mb-3 flex items-center gap-2 overflow-hidden text-sm">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="shrink-0 text-[#6E7681] hover:text-text-main"
          >
            testcore
          </button>

          <span className="text-[#484F58]">›</span>

          <button
            type="button"
            onClick={() => navigate('/testing')}
            className="shrink-0 text-[#6E7681] hover:text-text-main"
          >
            Тестирования
          </button>

          <span className="text-[#484F58]">›</span>

          <span className="truncate text-[#C9D1D9]">
            {testing.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-text-main md:text-2xl">
            {title}
          </h1>

          <span
            className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium ${
              status.toLowerCase().includes('актив')
                ? 'bg-[#0D2818] text-[#3FB950]'
                : 'bg-dark-hover text-text-muted'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status.toLowerCase().includes('актив')
                  ? 'bg-[#3FB950]'
                  : 'bg-text-muted'
              }`}
            />
            {status}
          </span>
        </div>

        <p className="mt-1.5 text-xs text-text-muted">
          {speciality} · ссылка активна до {endDate} · {testing.passed} прошли
        </p>
      </div>

      {/* Навигация по вкладкам */}
      <div className="flex h-10.5 shrink-0 items-center gap-6 overflow-x-auto border-b border-dark-border px-5 md:px-7">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`relative h-full shrink-0 text-sm transition-colors ${
              activeTab === tab
                ? 'font-medium text-text-main'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            {tab}

            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-0.75 w-full rounded-t-full bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Основное содержимое */}
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-5 pb-3 pt-3 md:px-7 md:pt-4">
        <div className="mx-auto w-full max-w-375">
          {/* ОСНОВНОЕ */}
          {activeTab === 'Основное' && (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <section className={cardClass}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                  Основное
                </h2>

                <div className="mb-3">
                  <label className={labelClass}>
                    Название кампании *
                  </label>

                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Специальность
                    </label>

                    <select
                      value={speciality}
                      onChange={(event) =>
                        setSpeciality(event.target.value)
                      }
                      className={inputClass}
                    >
                      {mockSpecialities.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Статус</label>

                    <select
                      value={status}
                      onChange={(event) =>
                        setStatus(event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Активно</option>
                      <option>Черновик</option>
                      <option>Архив</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Описание</label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    rows={3}
                    className="min-h-17.5 w-full resize-y rounded-md border border-dark-border bg-input-bg px-3 py-2 text-sm text-text-main outline-none focus:border-accent"
                  />
                </div>
              </section>

              <section className={cardClass}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                  Сроки
                </h2>

                <div className="mb-3">
                  <label className={labelClass}>Период</label>

                  <div className="grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] items-center gap-2">
                    <input
                      value={startDate}
                      onChange={(event) =>
                        setStartDate(event.target.value)
                      }
                      className={inputClass}
                      placeholder="ДД.ММ.ГГГГ"
                    />

                    <span className="text-center text-lg text-text-muted">
                      →
                    </span>

                    <input
                      value={endDate}
                      onChange={(event) =>
                        setEndDate(event.target.value)
                      }
                      className={inputClass}
                      placeholder="ДД.ММ.ГГГГ"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Сообщение после
                  </label>

                  <textarea
                    value={afterMessage}
                    onChange={(event) =>
                      setAfterMessage(event.target.value)
                    }
                    rows={3}
                    className="min-h-17.5 w-full resize-y rounded-md border border-dark-border bg-input-bg px-3 py-2 text-sm text-text-main outline-none focus:border-accent"
                  />
                </div>
              </section>
            </div>
          )}

          {/* СОСТАВ */}
          {activeTab === 'Состав' && (
            <div className="flex flex-col gap-3">
              <section className="rounded-lg border border-[#23466B] bg-dark-panel p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    ОСНОВНОЙ · 1
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPrimaryTest(false)}
                    className="rounded-md border border-dark-border px-4 py-1.5 text-xs text-[#F85149] hover:border-[#F85149]"
                  >
                    Удалить
                  </button>
                </div>

                {showPrimaryTest && primaryTest ? (
                  <div className="flex flex-wrap items-center gap-3 rounded-md bg-input-bg p-2.5">
                    <div className="h-9.5 w-9.5 shrink-0 rounded-lg bg-dark-hover" />

                    <div className="min-w-37.5 flex-1">
                      <p className="text-sm font-semibold">
                        {primaryTest.title}
                      </p>

                      <p className="mt-0.5 text-xs text-text-muted">
                        {primaryTest.questionsCount} вопросов · 30 мин · 100 б
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={openTestsLibrary}
                        className="rounded-md border border-dark-border bg-dark-panel px-3 py-1.5 text-xs hover:bg-dark-hover"
                      >
                        Открыть
                      </button>

                      <button
                        type="button"
                        onClick={openTestsLibrary}
                        className="rounded-md border border-dark-border bg-dark-panel px-3 py-1.5 text-xs hover:bg-dark-hover"
                      >
                        Заменить
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openTestsLibrary}
                    className="w-full rounded-md border border-dashed border-dark-border p-3 text-sm text-text-muted hover:border-accent"
                  >
                    Выбрать основной тест
                  </button>
                )}

                <div className="mt-2 text-xs text-text-muted">
                  Порог прохождения:{' '}
                  <span className="font-semibold text-text-main">
                    {passingScore} баллов
                  </span>
                </div>
              </section>

              <div className="flex items-center justify-center py-0.5 text-sm text-[#6E7681]">
                ↓ при баллах ниже порога ↓
              </div>

              <section className="rounded-lg border border-[#493765] bg-dark-panel p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#BC8CFF]">
                    ◆ ДОПОЛНИТЕЛЬНЫЕ · {showAdditionalTest ? '1' : '0'}
                  </div>

                  <button
                    type="button"
                    onClick={openTestsLibrary}
                    className="rounded-md border border-dark-border px-3 py-1.5 text-xs text-[#BC8CFF] hover:border-[#BC8CFF]"
                  >
                    + Добавить доп. тест
                  </button>
                </div>

                {showAdditionalTest && additionalTest && (
                  <div className="flex flex-wrap items-center gap-3 rounded-md bg-input-bg p-2.5">
                    <div className="h-9.5 w-9.5 shrink-0 rounded-lg bg-dark-hover" />

                    <div className="min-w-37.5 flex-1">
                      <p className="text-sm font-semibold">
                        {additionalTest.title}
                      </p>

                      <p className="mt-0.5 text-xs text-text-muted">
                        {additionalTest.questionsCount} вопросов · порог 70 б
                      </p>

                      <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#30230A] px-2 py-1 text-[11px] text-[#D29922]">
                        ⚠ если баллы ниже 70 · срок 3 дня
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('Проверка')}
                        className="rounded-md border border-dark-border bg-dark-panel px-3 py-1.5 text-xs hover:bg-dark-hover"
                      >
                        Настроить
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowAdditionalTest(false)}
                        className="rounded-md border border-dark-border bg-dark-panel px-3 py-1.5 text-sm text-[#F85149] hover:bg-[#F85149]/10"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={openTestsLibrary}
                  className="mt-2 flex w-full items-center gap-3 rounded-md border border-dashed border-dark-border p-2.5 text-left hover:border-[#BC8CFF]"
                >
                  <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-md border border-dashed border-dark-border text-xl text-[#484F58]">
                    +
                  </span>

                  <span>
                    <span className="block text-sm font-semibold text-text-muted">
                      Добавить ещё один доп. тест
                    </span>

                    <span className="mt-0.5 block text-xs text-[#6E7681]">
                      Для второй попытки или другой ветки
                    </span>
                  </span>
                </button>
              </section>
            </div>
          )}

          {/* ПРОВЕРКА */}
          {activeTab === 'Проверка' && (
            <div className="flex flex-col gap-3">
              <div className="flex min-h-10.5 items-center rounded-md border border-[#23466B] bg-[#101923] px-3 py-2 text-xs text-text-muted">
                <span className="mr-1.5 text-text-muted">ⓘ</span>
                Эти настройки применяются только к этой кампании. Сам тест в библиотеке остаётся неизменным.
              </div>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <section className={cardClass}>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                    Порог прохождения
                  </h2>

                  <div className="mb-3">
                    <label className={labelClass}>
                      Проходной балл *
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={passingScore}
                      onChange={(event) =>
                        handlePassingScoreChange(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-2">
                    <label className={labelClass}>
                      Проходной %
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={passingPercent}
                      onChange={(event) =>
                        handlePassingPercentChange(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#C9D1D9]">
                    <input
                      type="checkbox"
                      checked={syncScore}
                      onChange={(event) =>
                        setSyncScore(event.target.checked)
                      }
                      className="h-4.5 w-4.5 accent-accent"
                    />
                    синхронизировать балл и %
                  </label>
                </section>

                <section className={cardClass}>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                    Способ подсчёта
                  </h2>

                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="calculationMethod"
                        checked={calculationMethod === 'points'}
                        onChange={() => setCalculationMethod('points')}
                        className="h-4.25 w-4.25 accent-accent"
                      />
                      Сумма баллов
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="calculationMethod"
                        checked={calculationMethod === 'percent'}
                        onChange={() => setCalculationMethod('percent')}
                        className="h-4.25 w-4.25 accent-accent"
                      />
                      Процент
                    </label>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Максимум баллов за тест
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={maxPoints}
                      onChange={(event) =>
                        handleMaxPointsChange(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </section>
              </div>

              <section className={cardClass}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                  Начисление и условия
                </h2>

                <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <label className={labelClass}>
                      Правильный ответ
                    </label>

                    <input
                      value={correctPoints}
                      onChange={(event) =>
                        setCorrectPoints(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Неправильный ответ
                    </label>

                    <input
                      value={incorrectPoints}
                      onChange={(event) =>
                        setIncorrectPoints(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Частично верный
                    </label>

                    <input
                      value={partialPoints}
                      onChange={(event) =>
                        setPartialPoints(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#C9D1D9]">
                    <input
                      type="checkbox"
                      checked={partialScoring}
                      onChange={(event) =>
                        setPartialScoring(event.target.checked)
                      }
                      className="h-4.5 w-4.5 accent-accent"
                    />
                    частичное начисление (не уходит в минус)
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#C9D1D9]">
                    <input
                      type="checkbox"
                      checked={thresholdEnabled}
                      onChange={(event) =>
                        setThresholdEnabled(event.target.checked)
                      }
                      className="h-4.5 w-4.5 accent-accent"
                    />
                    набран порог баллов
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#C9D1D9]">
                    <input
                      type="checkbox"
                      checked={requiredQuestions}
                      onChange={(event) =>
                        setRequiredQuestions(event.target.checked)
                      }
                      className="h-4.5 w-4.5 accent-accent"
                    />
                    пройдены обязательные вопросы
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#C9D1D9]">
                    <input
                      type="checkbox"
                      checked={timeLimitEnabled}
                      onChange={(event) =>
                        setTimeLimitEnabled(event.target.checked)
                      }
                      className="h-4.5 w-4.5 accent-accent"
                    />
                    уложился во время
                  </label>
                </div>
              </section>
            </div>
          )}

          {/* ПУБЛИКАЦИЯ */}
          {activeTab === 'Публикация' && (
            <section className={cardClass}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                Публикация
              </h2>

              <div className="rounded-md border border-dark-border bg-dark-bg p-3">
                <p className="text-sm font-medium">
                  Ссылка на тестирование
                </p>

                <p className="mt-1 break-all text-xs text-text-muted">
                  Ссылка появится после публикации тестирования.
                </p>
              </div>
            </section>
          )}

          {/* РЕЗУЛЬТАТЫ */}
          {activeTab === 'Результаты' && (
            <section className={cardClass}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-text-muted">
                Результаты тестирования
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-md border border-dark-border bg-dark-bg p-3">
                  <p className="text-xs text-text-muted">
                    Прошли тестирование
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    {testing.passed}
                  </p>
                </div>

                <div className="rounded-md border border-dark-border bg-dark-bg p-3">
                  <p className="text-xs text-text-muted">Статус</p>

                  <p className="mt-1 text-sm font-medium">
                    {status}
                  </p>
                </div>

                <div className="rounded-md border border-dark-border bg-dark-bg p-3">
                  <p className="text-xs text-text-muted">
                    Дата окончания
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {endDate || 'Не указана'}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export { TestingDetails };
