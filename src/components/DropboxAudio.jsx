import React from 'react';
import Audio from './Audio.jsx';

import Dispatcher from '../Dispatcher';
import ActionConstants from '../constants/ActionConstants';

class DropboxAudio extends React.Component {
  constructor(props) {
    super(props);
    this.dropbox = props.dropbox;
    this.state = { status: 'initial', path: '' };
  }

  componentDidMount() {
    // TODO TODOFLUX Fluxize? at least Dropbox stuff should go in a source...
    // probably move this to store
    // maybe the current file name and status would be the state (store).
    // store could also be concerned with not playing until another has started, etc.
    Dispatcher.register(payload => {
      if (payload.actionType === ActionConstants.AUDIO_PLAY) {
        this.play(payload.path);
      }
    });
  }

  setStatus(status) {
    this.setState({ status });
  }

  play(path) { // TODO: better way to do this with props?
    this.setStatus('downloading');
    this.props.dropbox.filesDownload({path})
    .then(response => {
      this.setStatus('converting');
      const type = 'audio/mpeg'; // TOFIX when dropbox API improves
      const blob = new Blob([response], {type}) // force content-type
      const reader = new window.FileReader();
      reader.readAsDataURL(blob);
      return new Promise(resolve => reader.onloadend = () => resolve(reader.result, type));
    }).then((data, type) => {
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
        <Audio data={this.state.data} />
        <div>Status: {this.state.status}</div>
        <div>{this.state.path}</div>
      </div>
    );
  }
}

export default DropboxAudio;
