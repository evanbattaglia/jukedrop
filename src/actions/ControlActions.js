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
  /**
   * @param {string} path
   */
  addSongToQueue(path) {
    Dispatcher.dispatch({
      actionType: ActionConstants.CONTROL_ADD_SONG_TO_QUEUE,
      path: path,
    });
  },
};
