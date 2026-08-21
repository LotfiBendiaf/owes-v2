export const DEFAULT_PAGE_SIZE = 20;

export function normalizePage(value: string | string[] | undefined) {
  const page = typeof value === "string" ? Number.parseInt(value, 10) : 1;
  return Number.isFinite(page) && page > 0 ? page : 1;
}

export function totalPages(total: number, pageSize = DEFAULT_PAGE_SIZE) {
  return Math.max(1, Math.ceil(total / pageSize));
}
