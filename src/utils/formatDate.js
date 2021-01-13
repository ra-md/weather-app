export default function formatDate({ timestamp, options }) {
  const newDate = new Date(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp);
  return new Intl.DateTimeFormat('en', options).format(newDate);
}
