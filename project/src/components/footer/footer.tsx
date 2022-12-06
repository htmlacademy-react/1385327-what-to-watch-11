import Logo from '../logo/logo';
import Copyright from '../copyright/copyright';

function Footer(): JSX.Element {

  return (
    <footer className="page-footer">
      <Logo light />
      <Copyright />
    </footer>
  );
}

export default Footer;
