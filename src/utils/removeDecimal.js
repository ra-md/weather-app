export default function removeDecimal(num) {
  if (num != null) {
    const tem = num.toString();
    const dot = tem.indexOf('.');
    return tem.slice(0, dot === -1 ? undefined : dot);
  }

  return '';
}
