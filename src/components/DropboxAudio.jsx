import React from 'react';
import Audio from './Audio.jsx';

// TODO: this whole file is all very non-flux-like / non-alt-like...
// it would be pretty coimplicated to fix though

import DropboxSource from '../sources/DropboxSource'

import CurrentSongStore from '../stores/CurrentSongStore';

class DropboxAudio extends React.Component {
  constructor(props) {
    super(props);
    this.dropbox = props.dropbox;
    this.state = CurrentSongStore.getState();
  }

  componentDidMount() {
    CurrentSongStore.listen(this.updateFromState.bind(this));
  }

  updateFromState(state) {
    this.setState({status: state.status, loadingSong: state.loadingSong});

    if (state.shouldReloadSong && state.path) {
      if (state.path === this.state.path) {
        // Don't reinsert data, just replay song.
        this.refs.audio.replay();
      } else {
        // Play new song (new data)
        this.setState(state);
      }
    }
  }

  render() {
    return (
      <div className="dropboxAudio">
        <Audio ref="audio" data={this.state.data} />
        <div>Status: {this.state.status} {this.state.loadingSong}</div>
        <div>Playing: {this.state.path}</div>
      </div>
    );
  }
}

export default DropboxAudio;
