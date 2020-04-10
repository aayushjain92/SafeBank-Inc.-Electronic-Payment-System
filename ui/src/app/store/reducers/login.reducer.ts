import { LoginPageActions, AuthActions } from '../actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function loginReducer(
  state = initialState,
  action:
    | AuthActions.AuthActionsUnion
    | LoginPageActions.LoginPageActionsUnion
): State {
  switch (action.type) {
    case LoginPageActions.login.type: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthActions.loginSuccess.type: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthActions.loginFailure.type: {
      return {
        ...state,
        error: action.error,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
