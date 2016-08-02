import ActionConstants from '../constants/ActionConstants';
import Dispatcher from '../Dispatcher';

export default {
  /**
   * @param {string} path
   */
  loadSong(path) {
    Dispatcher.dispatch({
      actionType: ActionConstants.CONTROL_LOAD_SONG,
      path: path,
    });
  },
};
