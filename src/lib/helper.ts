export function getUploadUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  const base = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080';
  return `${base.replace(/\/$/, '')}/uploads/${String(path).replace(/^\/+/, '')}`;
}