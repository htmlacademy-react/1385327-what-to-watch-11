const getFormatTime = (time: number) => {

  if (time >= 60) {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    return `${hours}:${minutes}:00`;
  } else {
    return `${time}:00`;
  }
};

const getFormatHoursAndMinutes = (time: number) => {

  if (time >= 60) {
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    return `${hours}h ${minutes}m`;
  } else {
    return `${time}m`;
  }
};

export { getFormatTime, getFormatHoursAndMinutes };
