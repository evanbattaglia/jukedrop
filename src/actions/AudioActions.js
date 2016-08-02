import ActionConstants from '../constants/ActionConstants';
import Dispatcher from '../Dispatcher';

export default {
  /**
   * trigger when the playing comes to an end.
   */
  ended() {
    Dispatcher.dispatch({
      actionType: ActionConstants.AUDIO_ENDED,
    });
  }
};
