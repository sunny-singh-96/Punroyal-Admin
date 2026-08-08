const PLACEHOLDER_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Ctext x='50' y='50' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='12'%3ENo image%3C/text%3E%3C/svg%3E";

export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return PLACEHOLDER_SVG;
  if (path.startsWith('http')) return path;
  return `/uploads/${path}`;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://placehold.co/600x600/F3F4F6/1F2937?text=No+Image';
};