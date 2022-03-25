import { getUserData, setIsLoggedInData, setUsernameData } from './dataApi';
import { ActionType } from './types';
import { UserState } from './models';




export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  console.log("Loading user data from App.tsx")
  dispatch(setLoading(true));
  const data = await getUserData();
  console.log("User data are : ");
  console.log(data);
  
  dispatch(setUserData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-user-loading',
  isLoading
} as const);

export const setUserData = (data: Partial<UserState>) => ({
  type: 'set-user-data',
  data
} as const);

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false);
  dispatch(setUsername());
};

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn);
  return ({
    type: 'set-is-loggedin',
    loggedIn
  } as const)
};

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
  await setUsernameData(username);
  return ({
    type: 'set-username',
    username
  } as const);
};




export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setUserData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUsername>
