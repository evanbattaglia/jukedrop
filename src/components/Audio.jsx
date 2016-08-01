import React from 'react';
import AudioActions from '../actions/AudioActions';

class Audio extends React.Component {
  constructor() {
    this.handleOnEnded = this.handleOnEnded.bind(this);
  }

  handleOnEnded() {
    AudioActions.ended();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.refs.audio.load();
      this.refs.audio.play();
    }
  }
  render() {
    return (
      <audio preload="none" ref="audio" controls>
        <source src={this.props.data} type={this.props.type} onended={this.handleOnEnded} />
      </audio>
    );
  }
}

export default Audio;
