import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  root: undefined, // 'login' / 'after-login'
  menuOpened: false,
  user: { username: '', password: '' },
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root,
      });
    case types.MENU_TOGGLED:
      action.tracker.trackEvent(
        'sideMenu',
        !state.menuOpened ? 'opened' : 'closed'
      );
      return state.merge({
        menuOpened: !state.menuOpened,
      });
      case types.UPDATE_USER:
      return state.merge({
        user: { ...state.user, ...action.fields },
      });
    default:
      return state;
  }
}
