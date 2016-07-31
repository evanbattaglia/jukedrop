import ActionConstants from '../constants/ActionConstants';
import Dispatcher from '../Dispatcher';

export default {
  /**
   * @param {string} path
   */
  addToPlaylist(path) {
    Dispatcher.dispatch({
      actionType: ActionConstants.PLAYLIST_ADD_ITEM,
      path: path,
    });
  },

  /**
   *
   */
  removeFromPlaylist(path) {
    Dispatcher.dispatch({
      actionType: ActionConstants.PLAYLIST_REMOVE_ITEM,
      path: path,
    });
  },

};
