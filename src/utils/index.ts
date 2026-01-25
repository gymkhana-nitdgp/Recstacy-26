export const formatDisplayDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const formatDateRange = (date1: Date, date2: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
  
  // Format the parts: "DD MMM"
  const start = new Intl.DateTimeFormat('en-GB', options).format(date1);
  const end = new Intl.DateTimeFormat('en-GB', options).format(date2);
  
  // Extract the year from the first date
  const year = date1.getFullYear();

  return `${start} - ${end}, ${year}`;
};

export const get12Hour = (date: Date): string => {
  const hours = date.getHours();
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12; // Converts 0 to 12
  
  return `${hour12} ${period}`;
};