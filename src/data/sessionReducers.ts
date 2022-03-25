import { SessionsActions } from './sessionActions';
import { AppIfcmState } from './models';

export const sessionsReducer = (state: AppIfcmState, action: SessionsActions) => {
    switch (action.type) {
      case 'set-app-loading': {
        return { ...state, loading: action.isLoading };
      }
      case 'set-app-data': {
        return { ...state, ...action.data };
      }
     
    
    }
  }