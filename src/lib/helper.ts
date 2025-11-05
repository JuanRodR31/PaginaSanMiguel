export function getUploadUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  const base = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080';
  const pathStr = String(path);
  
  // Si ya es una URL completa, devolverla tal cual
  if (pathStr.startsWith('http://') || pathStr.startsWith('https://')) {
    return pathStr;
  }
  
  // Si ya tiene el prefijo /uploads/, no agregarlo de nuevo
  if (pathStr.startsWith('/uploads/')) {
    return `${base.replace(/\/$/, '')}${pathStr}`;
  }
  
  // Si tiene el prefijo uploads/ sin barra inicial, agregar solo la barra
  if (pathStr.startsWith('uploads/')) {
    return `${base.replace(/\/$/, '')}/${pathStr}`;
  }
  
  // Si es solo el filename, agregar el prefijo /uploads/
  return `${base.replace(/\/$/, '')}/uploads/${pathStr.replace(/^\/+/, '')}`;
}