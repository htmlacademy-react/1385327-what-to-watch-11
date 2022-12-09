import './loading-spinner.css';

function LoadingSpinner(): JSX.Element {

  return (
    <div className="spinner">
      <span className="visually-hidden">Spinner</span>
      <div className="refreshing-loader"></div>
    </div>
  );
}

export default LoadingSpinner;
