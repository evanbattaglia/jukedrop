import React from 'react';

class Audio extends React.Component {
  handleOnEnded() {
    if (this.refs.audioLoopCheck.checked) {
      this.refs.audio.play();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.refs.audio.load();
      this.refs.audio.play();
    }
  }
  render() {
    return (
      <div>
        <audio preload="none" ref="audio" controls onEnded={this.handleOnEnded.bind(this)}>
          <source src={this.props.data} type={this.props.type} />
        </audio>
        <input ref="audioLoopCheck" type="checkbox" id="audioLoopCheck" />
        <label htmlFor="audioLoopCheck">Loop</label>
      </div>
    );
  }
}

export default Audio;
