import React from 'react';
import Audio from './Audio.jsx';

import DropboxSource from '../sources/DropboxSource'

import CurrentSongStore from '../stores/CurrentSongStore';

class DropboxAudio extends React.Component {
  constructor(props) {
    super(props);
    this.dropbox = props.dropbox;
    this.state = { status: 'initial', path: '' };
  }

  componentDidMount() {
    CurrentSongStore.listen(state => this.play(state.currentSong));
  }

  // TODO: this bit of status is anti-flux?
  // TODO: yes, need to move status into a store
  setStatus(status) {
    this.setState({ status });
  }

  play(path) { // TODO: better way to do this with props?
    if (!path) return;

    if (path === this.state.path) {
      // don't redownload
      // TODO: there must be a better way
      this.refs.audio.replay();
      return;
    }

    this.setStatus('downloading');
    // TODO altize, using source success/error. should be easy now
    DropboxSource.filesDownload.remote({ currentSong: path })
    .then((data, type) => {
      this.setState({status: 'loaded', data, type, path});
    })
    .catch(function(error) {
      this.setStatus('errored');
      console.log(error);
    });
  }

  render() {
    return (
      <div className="dropboxAudio">
        <Audio ref="audio" data={this.state.data} />
        <div>Status: {this.state.status}</div>
        <div>{this.state.path}</div>
      </div>
    );
  }
}

export default DropboxAudio;
