import React from 'react';

// TODO: namespacing???
// TODO: get rid of this
class DropboxAudioStatus extends React.Component {
  render() {
    return (
      <div>Status: {this.props.status}</div>
    );
  }
}

export default DropboxAudioStatus;
