import {Action, Reducer} from 'redux'
import {AppThunkAction} from './'

export interface AuthState {
  user: User | null,
  errors: AuthError[],
}

export interface AuthError {
  code: string,
  description: string,
}

export interface User {
  id: string,
  email: string,
  userName: string,
  password?: string,
  positionX: number,
  positionY: number,
  totalMoves: number,
  playerColor: string,
}

export interface ApiLoginResponse {
  result: {
    succeeded: boolean,
  },
  user: User,
  token: string,
}

export interface ApiRegisterResponse {
  result: {
    succeeded: boolean,
    errors: AuthError[],
  },
  user: User,
}

export interface UserRegister {
  email: string,
  userName: string,
  password: string,
}

export interface UserLogin {
  userName: string,
  password: string,
}

interface UserRegisterAction {
  type: 'REGISTER',
  data: UserRegister,
}

interface UserLoginAction {
  type: 'LOGIN',
  data: UserLogin,
}

interface UserLogoutAction {
  type: 'LOGOUT',
}

interface UserSetUserAction {
  type: 'SET_USER',
  user: User,
}

interface UserClearUserAction {
  type: 'CLEAR_USER',
}

interface UserSetErrorAction {
  type: 'SET_ERRORS',
  errors: AuthError[],
}

interface UserClearErrorsAction {
  type: 'CLEAR_ERRORS',
}

type KnownAction = 
  UserRegisterAction | 
  UserLoginAction | 
  UserLogoutAction | 
  UserSetUserAction | 
  UserSetErrorAction | 
  UserClearUserAction | 
  UserClearErrorsAction

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
  },

  login: (user: UserLogin): AppThunkAction <KnownAction> => async (dispatch, getState) => {
    const response: Response = await fetch('account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data: ApiLoginResponse = await response.json()

    if (data.result.succeeded) {
      dispatch({
        type: 'SET_USER',
        user: data.user,
      })

      localStorage.setItem('token', data.token)
    }
  },

  logout: (): AppThunkAction <KnownAction> => async (dispatch, getState) => {
    await fetch('account/logout')

    dispatch({ type: 'CLEAR_USER' })
    dispatch({ type: 'CLEAR_ERRORS' })

    localStorage.removeItem('token')
  },
}

const unloadedState: AuthState = {
  user: null,
  errors: [],
}

export const reducer: Reducer<AuthState> = (state : AuthState | undefined, incomingAction : Action) : AuthState => {
  if (!state) return unloadedState

  const action = incomingAction as KnownAction

  switch (action.type) {
    case 'SET_ERRORS':
      return {
        errors: action.errors,
        user: state.user,
      }
    case 'SET_USER':
      return {
        errors: state.errors,
        user: action.user,
      }
    case 'CLEAR_ERRORS':
      return {
        errors: [],
        user: state.user,
      }
    case 'CLEAR_USER':
      return {
        errors: state.errors,
        user: null,
      }
  }

  return state
}
