import React from 'react';
import AudioActions from '../actions/AudioActions';
import PlayerControllerStore from '../stores/PlayerControllerStore'

class Audio extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    PlayerControllerStore.addReplayListener(() => {
      this.refs.audio.currentTime = 0;
      this.refs.audio.play();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.refs.audio.load();
      this.refs.audio.play();
    }
  }
  render() {
    return (
      <audio preload="none" ref="audio" controls onEnded={AudioActions.ended}>
        <source src={this.props.data} type={this.props.type} />
      </audio>
    );
  }
}

export default Audio;
