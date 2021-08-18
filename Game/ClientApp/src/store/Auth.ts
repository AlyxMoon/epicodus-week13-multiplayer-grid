import {Action, Reducer} from 'redux';
import {AppThunkAction} from './';

export interface AuthState {
  user: User | null;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  positionX: number;
  positionY: number;
  totalMoves: number;
  playerColor: string;
}

export interface UserRegister {
  email: string;
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = UserRegisterAction | UserLoginAction | UserLogoutAction;

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

    const data = await response.json()
  },
  login: (): AppThunkAction < KnownAction > => (dispatch, getState) => {},
  logout: (): AppThunkAction < KnownAction > => (dispatch, getState) => {},
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: AuthState = {
  user: null,
};

export const reducer: Reducer<AuthState> = (state : AuthState | undefined, incomingAction : Action) : AuthState => {
  if (!state) 
    return unloadedState;
  


  const action = incomingAction as KnownAction;

  switch (action.type) {
    case 'REGISTER':
    case 'LOGIN':
    case 'LOGOUT':
  }

  return {
    user: {
      id: 0,
      email: '',
      username: '',
      positionX: 0,
      positionY: 0,
      totalMoves: 0,
      playerColor: 'black',
    },
  };
};
