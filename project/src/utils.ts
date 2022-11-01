export const getFormatTime = (time: number) => {

  if (time >= 60) {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    return `${hours}:${minutes}:00`;
  } else {
    return `${time}:00`;
  }
};
