import React from 'react';

class Audio extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.refs.audio.load();
      this.refs.audio.play();
    }
  }
  render() {
    return (
      <audio preload="none" ref="audio" controls>
        <source src={this.props.data} type={this.props.type} />
      </audio>
    );
  }
}

export default Audio;
