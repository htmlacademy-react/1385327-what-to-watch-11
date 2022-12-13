import { useRef, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { AuthData } from '../../types/types';
import { AppRoute, AuthorizationStatus, ErrorMessage, EMAIL_PATTERN, PASSWORD_PATTERN, SingInField } from '../../const';

import { loginAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selector';

import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';

function getSignInErrorMessage(inputId: string): string {
  if (inputId === SingInField.UserEmail) {
    return ErrorMessage.InvalidEmail;
  }
  if (inputId === SingInField.UserPassword) {
    return ErrorMessage.InvalidPassword;
  }
  return '';
}

function SingInScreen(): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errFieldId, setErrFieldId] = useState('');

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {

      if (!EMAIL_PATTERN.test(loginRef.current?.value)) {
        setErrFieldId(SingInField.UserEmail);
        return;
      }
      if (!PASSWORD_PATTERN.test(passwordRef.current?.value)) {
        setErrFieldId(SingInField.UserPassword);
        return;
      }

      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. Login</title>
      </Helmet>
      <header className="page-header user-page__head">
        <div className="logo">
          <Logo />
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>

          <div className="sign-in__message">
            <p>{getSignInErrorMessage(errFieldId)}</p>
          </div>

          <div className={`sign-in__field ${errFieldId === SingInField.UserEmail ? 'sign-in__field--error' : ''}`}>
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={loginRef} required />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field ${errFieldId === SingInField.UserPassword ? 'sign-in__field--error' : ''}`}>
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} required />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" >Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SingInScreen;
