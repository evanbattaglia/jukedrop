import alt from '../alt';

class AudioActions {
  constructor() {
    this.generateActions('ended');
  }
}

export default alt.createActions(AudioActions);
