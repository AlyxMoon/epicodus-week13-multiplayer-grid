import {Action, Reducer} from 'redux';
import {AppThunkAction} from './';

export interface AuthState {
  user: User | null;
  errors: AuthError[];
}

export interface AuthError {
  code: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  userName: string;
  password?: string;
  positionX: number;
  positionY: number;
  totalMoves: number;
  playerColor: string;
}

export interface ApiRegisterResponse {
  result: {
    succeeded: boolean;
    errors: AuthError[];
  };
  user: User;
}

export interface UserRegister {
  email: string;
  userName: string;
  password: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}

interface UserRegisterAction {
  type: 'REGISTER';
  data: UserRegister;
}

interface UserLoginAction {
  type: 'LOGIN';
  data: UserLogin;
}

interface UserLogoutAction {
  type: 'LOGOUT';
}

interface UserSetUserAction {
  type: 'SET_USER';
  user: User;
}

interface UserSetErrorAction {
  type: 'SET_ERRORS';
  errors: AuthError[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = UserRegisterAction | UserLoginAction | UserLogoutAction | UserSetUserAction | UserSetErrorAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  register: (user : UserRegister): AppThunkAction < KnownAction > => async (dispatch, getState) => {
    const response: Response = await fetch('account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data: ApiRegisterResponse = await response.json()

    dispatch({
      type: 'SET_ERRORS',
      errors: data.result.errors,
    })

    if (data.result.succeeded) {
      dispatch({
        type: 'SET_USER',
        user: data.user,
      })
    }

    console.log('test result', data)
  },
  login: (): AppThunkAction < KnownAction > => (dispatch, getState) => {},
  logout: (): AppThunkAction < KnownAction > => (dispatch, getState) => {},
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: AuthState = {
  user: null,
  errors: [],
};

export const reducer: Reducer<AuthState> = (state : AuthState | undefined, incomingAction : Action) : AuthState => {
  if (!state) return unloadedState;

  const action = incomingAction as KnownAction;

  switch (action.type) {
    case 'SET_ERRORS':
      return {
        errors: action.errors,
        user: state.user,
      }
    case 'SET_USER':
      console.log('sanity check!', action.user)
      return {
        errors: state.errors,
        user: action.user,
      }
    case 'REGISTER':
    case 'LOGIN':
    case 'LOGOUT':
  }

  return state;
};
