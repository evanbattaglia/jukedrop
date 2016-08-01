import ActionConstants from '../constants/ActionConstants';
import Dispatcher from '../Dispatcher';

export default {
  /**
   * @param {string} path
   * rename to load?
   */
  play(path) {
    Dispatcher.dispatch({
      actionType: ActionConstants.AUDIO_PLAY,
      path: path,
    });
  },

  /**
   * trigger when the playing comes to an end.
   */
  ended() {
    Dispatcher.dispatch({
      actionType: ActionConstants.AUDIO_ENDED,
    });
  }
};
