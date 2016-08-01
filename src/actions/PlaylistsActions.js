import ActionConstants from '../constants/ActionConstants';
import Dispatcher from '../Dispatcher';

export default {
  // TODO: dry up

  /**
   * @param {string} name
   */
  addPlaylist(name) {
    Dispatcher.dispatch({
      actionType: ActionConstants.PLAYLISTS_ADD,
      name,
    });
  },

  /**
   * @param {string} name
   */
  deletePlaylist(name) {
    Dispatcher.dispatch({
      actionType: ActionConstants.PLAYLISTS_DELETE,
      name,
    });
  },

  choosePlaylist(name) {
    Dispatcher.dispatch({
      actionType: ActionConstants.PLAYLISTS_CHOOSE,
      name,
    });
  }

};
