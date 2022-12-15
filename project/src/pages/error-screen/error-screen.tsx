import './error-screen.css';

function ErrorScreen(): JSX.Element | null {

  return (
    <div className="user-page">
      <main>
        <h1 className="page-title">Failed to load data from server, please try again later!</h1>
      </main>
    </div>
  );
}

export default ErrorScreen;
