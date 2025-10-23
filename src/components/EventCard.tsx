// Tipografía: si aún no tienes Montserrat cargada globalmente,
// agrega esto en tu index.html (o usa next/font en Next.js):
// <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />

export interface Event {
  id: number;
  title: string;
  description?: string;
  event_date?: string; // ISO date string (e.g., "2025-11-05")
  location?: string;
  photos?: string[]; // URLs
}

export type EventCardProps = {
  event: Event;
  className?: string;
  onClick?: (eventId: number) => void;
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr; // devuelve lo que venga si no es parseable
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export default function EventCard({ event, className, onClick }: EventCardProps) {
  const { id, title, description, event_date, location, photos } = event;
  const cover = photos && photos.length > 0 ? photos[0] : undefined;
  const dateHuman = formatDate(event_date);

  return (
    <article
      className={classNames(
        "group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm transition hover:shadow-md",
        "dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
      style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial' }}
      onClick={() => onClick?.(id)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
    >
      {/* Imagen de portada */}
      <div className="relative aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-800">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400 dark:text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-10 w-10">
              <path fill="currentColor" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v9.59l-2.3-2.3a1 1 0 0 0-1.4 0L11 17l-2.3-2.3a1 1 0 0 0-1.4 0L5 16V5z"/>
            </svg>
          </div>
        )}

        {/* Fecha como badge, si existe */}
        {dateHuman && (
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-700 backdrop-blur dark:bg-neutral-900/80 dark:text-neutral-200">
            {dateHuman}
          </div>
        )}
      </div>

      {/* Cuerpo */}
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <h3 className="text-lg font-bold leading-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>

        {location && (
          <div className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5"/>
            </svg>
            <span className="truncate">{location}</span>
          </div>
        )}

        {description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
        )}

        {/* Mini galería si hay más fotos */}
        {photos && photos.length > 1 && (
          <div className="mt-1 flex gap-2 overflow-x-auto pb-1">
            {photos.slice(1, 6).map((src, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={idx}
                src={src}
                alt={`${title} – foto ${idx + 2}`}
                className="h-16 w-24 flex-none rounded-md object-cover ring-1 ring-neutral-200/60 dark:ring-neutral-800"
                loading="lazy"
              />
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between">
          <a
            href={`#/events/${id}`}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
          >
            Ver detalles
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path fill="currentColor" d="M9 18l6-6-6-6v12z"/>
            </svg>
          </a>

          {/* Id visible en pequeño para debugging */}
          <span className="text-xs text-neutral-500 dark:text-neutral-400">#{id}</span>
        </div>
      </div>
    </article>
  );
}
