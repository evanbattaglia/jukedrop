import React from 'react';
import ControlMetaActions from '../actions/ControlActions';
import CurrentSongStore from '../stores/CurrentSongStore'

class Audio extends React.Component {
  constructor(props) {
    super(props)
  }

  replay() {
    this.refs.audio.currentTime = 0;
    this.refs.audio.play();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.refs.audio.load();
      this.refs.audio.play();
    }
  }
  render() {
    return (
      <audio preload="none" ref="audio" controls onEnded={ControlMetaActions.songEnded}>
        <source src={this.props.data} type={this.props.type} />
      </audio>
    );
  }
}

export default Audio;
