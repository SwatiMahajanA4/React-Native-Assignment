export const footerTabs = ['My Shifts', 'Available Shifts'];

export const findDay = (value: any) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  }).format(value);
};

export const hourFormat = (timeStamp: string) => {
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).format(new Date(timeStamp));
  return time;
};

export const bookingStatus = {
  booked: 'Booked',
  overlap: 'Overlapping',
  none: '',
};

export const date = new Date();
export const nextDate = new Date();
