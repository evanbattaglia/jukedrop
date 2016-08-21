import React from 'react';
import CurrentSongStore from '../stores/CurrentSongStore';
import ControlActions from '../actions/ControlActions';
import {basename} from '../util'

class SongQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = { queue: [] }
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext(e) {
    e.preventDefault();
    ControlActions.next();
  }

  componentDidMount() {
    // TODO this
    //CurrentSongStore.addQueueChangeListener(() => {
    //  this.setState({ queue: CurrentSongStore.getQueue() });
    //});
  }

  render() {
    return (
      <div className="songQueue">
        <h2>
          Song Queue
          &nbsp;
          <a href="#" onClick={this.handleClickNext}>&gt;&gt;</a>
        </h2>
        {
          this.state.queue.map(path =>
            <div key={path}>{basename(path)}</div>
          )
        }
      </div>
    );
  }
}

export default SongQueue;
