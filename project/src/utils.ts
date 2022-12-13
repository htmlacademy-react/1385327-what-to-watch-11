import { Rating } from './const';

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
  if (rating >= Rating.Bad && rating < Rating.Normal) {
    return 'Bad';
  }
  if (rating >= Rating.Normal && rating < Rating.Good) {
    return 'Normal';
  }
  if (rating >= Rating.Good && rating < Rating.VeryGood) {
    return 'Good';
  }
  if (rating >= Rating.VeryGood && rating < Rating.Awesome) {
    return 'Very good';
  }
  if (rating === Rating.Awesome) {
    return 'Awesome';
  }
  return 'NaN';
};

export { getFormatHoursAndMinutes, getScoresRating };
