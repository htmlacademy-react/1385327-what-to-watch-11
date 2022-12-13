import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';
import { UserData } from '../../types/types';
import { UserState } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../mocks/mocks';

const userData: UserData = makeFakeUser();

describe('Reducer: user', () => {
  let state: UserState;

  beforeEach(() => {
    state = {authorizationStatus: AuthorizationStatus.Unknown, authorizedUser: null};
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authorizedUser: null});
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set UserData if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: userData}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authorizedUser: userData});
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authorizedUser: null});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: userData}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authorizedUser: userData});
    });

    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authorizedUser: null});
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authorizedUser: null});
    });
  });

});
