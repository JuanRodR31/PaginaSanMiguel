export interface Event {
  id: number;
  title: string;
  description?: string;
  event_date?: string;
  start_date?: string;
  startDate?: string;
  end_date?: string;
  endDate?: string;
  location?: string;
  photos?: string[]; 
  status?: string;
  link?: string; // Enlace de redes sociales o evento externo
  foundationId?: number | string | null;
}

export type EventCardProps = {
  event: Event;
  className?: string;
  onClick?: (eventId: number) => void;
};

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function formatDate(dateStr?: string | number | Date | null) {
  if (!dateStr && dateStr !== 0) return null;
  const d = dateStr instanceof Date ? dateStr : new Date(dateStr as any);
  if (Number.isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString('es-ES', {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function formatDateRange(start?: string | number | Date | null, end?: string | number | Date | null) {
  const ds = start ? (start instanceof Date ? start : new Date(start as any)) : null;
  const de = end ? (end instanceof Date ? end : new Date(end as any)) : null;
  if (ds && de && !Number.isNaN(ds.getTime()) && !Number.isNaN(de.getTime())) {
    const sameMonth = ds.getMonth() === de.getMonth() && ds.getFullYear() === de.getFullYear();
    const opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    if (sameMonth) {
      const startDay = ds.toLocaleDateString('es-ES', { day: "numeric" });
      const tail = de.toLocaleDateString('es-ES', { ...opts });
      return `${startDay}–${tail}`;
    }
    return `${ds.toLocaleDateString('es-ES', opts)} – ${de.toLocaleDateString('es-ES', opts)}`;
  }
  return formatDate(start ?? end ?? null);
}

export default function EventCard({ event, className, onClick }: EventCardProps) {
  const { id, title, description, event_date, location, photos, link: socialMediaLink } = event;
  const cover = photos && photos.length > 0 ? photos[0] : undefined;
  const startRaw = (event as any).start_date ?? (event as any).startDate ?? event_date ?? null;
  const endRaw = (event as any).end_date ?? (event as any).endDate ?? null;

  const dateHuman = formatDateRange(startRaw, endRaw);
  
  return (
    <article
      className={classNames(
        "group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm transition hover:shadow-md",
        "dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
      style={{ fontFamily: 'Montserrat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial' }}
      onClick={onClick ? () => onClick(id) : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
    >
      {/* Imagen de portada */}
      <div className="relative aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-800">
        {cover ? (
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
      </div>

      {/* Cuerpo */}
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        {/* Título */}
        <h3 className="text-lg font-bold leading-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>

        {/* Ubicación con icono */}
        {location && (
          <div className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" aria-hidden>
              <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5"/>
            </svg>
            <span>{location}</span>
          </div>
        )}

        {/* Fechas del evento */}
        {dateHuman && (
          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Fechas del evento:</span> {dateHuman}
          </div>
        )}

        {/* Descripción */}
        {description && (
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
        )}

        {/* Hipervínculo a redes sociales */}
        {socialMediaLink && (
          <a
            href={socialMediaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            onClick={(e) => e.stopPropagation()}
          >
            Mira más fotos del evento!
          </a>
        )}
      </div>
    </article>
  );
}