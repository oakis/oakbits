export const formatDate = (dateString: string): string =>
  new Intl.DateTimeFormat("sv-SE").format(new Date(dateString));
