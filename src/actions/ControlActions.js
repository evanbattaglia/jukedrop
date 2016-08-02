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
  addToQueue(paths) {
    if (!Array.isArray(paths)) paths = [paths];
    Dispatcher.dispatch({
      actionType: ActionConstants.CONTROL_ADD_TO_QUEUE,
      paths,
    });
  },

  next() {
    Dispatcher.dispatch({
      actionType: ActionConstants.CONTROL_NEXT,
    })
  }
};
