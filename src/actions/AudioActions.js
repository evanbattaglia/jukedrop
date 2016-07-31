import ActionConstants from '../constants/ActionConstants';
import Dispatcher from '../Dispatcher';

export default {
  /**
   * @param {string} path
   */
  play(path) {
    Dispatcher.dispatch({
      actionType: ActionConstants.AUDIO_PLAY,
      path: path,
    });
  },
};
