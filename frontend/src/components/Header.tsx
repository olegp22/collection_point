
import { HelpCircle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-17 shrink-0 flex items-center justify-between 
    px-7 border-b border-dark-border bg-[#161B22] relative z-20">

      {/* Логотип */}
      <div className="flex items-center gap-3 min-w-55">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <polygon
              points="12,2 20,7 20,17 12,22 4,17 4,7"
              fill="#0D1117"
            />
          </svg>
        </div>

        <span className="font-semibold text-base">
          testcore
        </span>
      </div>

      {/* Поиск */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[min(40%,650px)]">
        <input
          type="text"
          placeholder="Поиск..."
          className="w-full h-9.75 bg-input-bg border border-dark-border 
          rounded-lg pl-3 pr-4 text-sm text-text-main placeholder:text-[#6E7681] 
          outline-none focus:border-accent"
        />
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-5 min-w-25 justify-end">

        <button
          type="button"
          aria-label="Помощь"
          className="text-text-main hover:text-accent"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Профиль"
          className="w-9 h-9 rounded-full border border-dark-border 
          bg-dark-hover text-xs text-text-muted hover:border-accent"
        >
          ИП
        </button>

      </div>

    </header>
  );
};
