import { UserActions } from './userActions';
import { UserState } from './models';


export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case 'set-user-loading':
      return { ...state, loading: action.isLoading };
    case 'set-user-data':
      return { ...state, ...action.data };
    case 'set-username':
      return { ...state, username: action.username };
    case 'set-is-loggedin':
      return { ...state, isLoggedin: action.loggedIn };

  }
}

