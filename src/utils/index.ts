export const listNextDays = (days = 6): Date[] => {
  return Array.from({ length: days + 1 }, (_, idx) => addDaysToDate(idx))
}

export const getDayName = (date: Date): string =>  {
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export const getDateSuffix = (day: number): string => {

  const suffixes: any = {
    1: 'st',
    21: 'st',
    31: 'st',
    2: 'nd',
    22: 'nd',
    3: 'rd',
    23: 'rd',
  }
  if (!(day in suffixes)) {
    return 'th'
  }
  return suffixes[day];
}

export const addDaysToDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date
}
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
}
