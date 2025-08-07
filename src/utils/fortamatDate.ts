export function formatDate(date: string, complete?: boolean): string {
    const [year, month, day] = date.split('-');
    return complete ? `${day}/${month}/${year}` : `${day}/${month}`
}

export function formatWeekday(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const weekDay = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });
  return (weekDay);
}