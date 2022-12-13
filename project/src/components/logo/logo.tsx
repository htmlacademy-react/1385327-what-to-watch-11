type LogoProps = {
  light?: boolean;
}

function Logo({light = false}: LogoProps): JSX.Element {

  const linkClass = `logo__link ${light ? 'logo__link--light' : ''}`;

  return (
    <div className="logo">
      <a className={linkClass} href="/">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
}

export default Logo;
