import { combineReducers } from './combineReducers';
import { sessionsReducer } from './sessionReducers';
import { userReducer } from './userReducers';

import {Order, PropheticMessage, VerseOfToday,Event, Shopping, Teaching, UnlockedTeaching, Branch, UserAccount } from './models';

export const initialState: AppState = {
  data: {
    propheticmessage: {} as PropheticMessage,
    verseoftoday: {} as VerseOfToday,
    events: [] as Event[],
    shopping: [] as Shopping[],
    teachings: [] as Teaching[],
    myunlockedteachings: [] as number[],
    myOrders : [] as Order[],
    branches : [] as Branch[],
    loading: false,
    currentOrder : {} as Order,

  },

  user: {
    isLoggedin: false,
    username: "",
    loading: false,
    userData : {} as UserAccount
  }
};


export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer

});


export type AppState = ReturnType<typeof reducers>;