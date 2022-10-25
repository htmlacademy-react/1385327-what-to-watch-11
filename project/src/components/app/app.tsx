import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  title: string;
  genre: string;
  year: number;
  posterImage: string;

}

function App(props: AppScreenProps): JSX.Element {

  const { title, genre, year, posterImage } = props;

  return (
    <MainScreen
      title={title}
      genre={genre}
      year={year}
      posterImage={posterImage}
    />
  );
}

export default App;
