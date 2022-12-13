import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutAction } from '../../store/api-actions';
import { getIsAuthorized, getAuthorizedUser } from '../../store/user-process/selector';

function UserBlock(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(getIsAuthorized);
  const authorizedUser = useAppSelector(getAuthorizedUser);

  if (isAuthorized) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={() => navigate(AppRoute.MyList)}>
            <img src={authorizedUser?.avatarUrl} alt={authorizedUser?.name} width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link
            to='/'
            className="user-block__link"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            Sign out
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <div className="user-block">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </div>
    );
  }
}

export default UserBlock;
