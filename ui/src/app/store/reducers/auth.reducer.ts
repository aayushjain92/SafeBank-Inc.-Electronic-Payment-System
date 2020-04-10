import { AuthActions, LogoutActions } from '../actions';
import { User } from './../../model/user';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export function reducer(
  state = initialState,
  action: AuthActions.AuthActionsUnion | LogoutActions.LogoutActionsUnion
): State {
  switch (action.type) {
    case AuthActions.loginSuccess.type: {
      return {
        ...state,
        user: action.user,
      };
    }

    case LogoutActions.logout.type: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
