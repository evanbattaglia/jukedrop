import React from 'react';
import CurrentPlaylistActions from '../actions/CurrentPlaylistActions';
import ControlActions from '../actions/ControlActions';

class File extends React.Component {
  render() {
    return (
      <div className="dropboxFile">
        <div className={ this.props.name.match(/\.(mp3|ogg)$/i) ? 'iconMusic' : 'iconFile' } />
        <a href="#" className="dropboxName" onClick={this.props.onClick}>{this.props.name}</a>
        <a href="#" className="dropboxFileAdd" onClick={this.props.onClickAdd}>(add)</a>
        <a href="#" className="dropboxFileQueue" onClick={this.props.onClickEnqueue}>(queue)</a>
      </div>
    );
  }
}

export default File;
