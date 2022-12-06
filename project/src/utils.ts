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

const getScoresRating = (rating: number) => {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  }
  if (rating >= 3 && rating < 5) {
    return 'Normal';
  }
  if (rating >= 5 && rating < 8) {
    return 'Good';
  }
  if (rating >= 8 && rating < 10) {
    return 'Very good';
  }
  if (rating === 10) {
    return 'Awesome';
  }
  return 'NaN';
};

export { getFormatTime, getFormatHoursAndMinutes, getScoresRating };
