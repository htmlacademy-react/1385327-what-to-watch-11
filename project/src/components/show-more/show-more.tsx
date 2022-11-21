type ShowMoreProps = {
  onClick: () => void;
}

function ShowMore({onClick}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClick}>
        Show more
      </button>
    </div>
  );
}

export default ShowMore;
