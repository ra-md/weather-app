export default function removeDecimal(num) {
  if (num != null) {
    const strNum = num.toString();
    const dot = strNum.indexOf('.');
    return Number(strNum.slice(0, dot === -1 ? undefined : dot));
  }

  return '';
}
