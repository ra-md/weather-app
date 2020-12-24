const { lang } = document.querySelector('html');

export default function formatDate({ timestamp, options }) {
  const newDate = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat(lang || 'en', options || { timeStyle: 'short', hour12: true }).format(newDate);
}
