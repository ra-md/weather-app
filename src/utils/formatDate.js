const { lang } = document.querySelector('html');

export default function formatDate({ timestamp, options }) {
  const newDate = new Date(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp);
  return new Intl.DateTimeFormat(lang || 'en', options || { timeStyle: 'short', hour12: true }).format(newDate);
}
