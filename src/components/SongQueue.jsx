import React from 'react';
import SongQueueStore from '../stores/SongQueueStore';
import ControlMetaActions from '../actions/ControlMetaActions';
import {basename} from '../util'

class SongQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = SongQueueStore.getState(); // TODO simplifiy with AltContainer
    this.handleClickNext = this.handleClickNext.bind(this); // TODO simplify with AltContainer
    // In future we will have an action that plays an item from the queue...
  }

  handleClickNext(e) {
    e.preventDefault();
    ControlMetaActions.next();
  }

  componentDidMount() {
    // TODO simplify with AltContainer
    SongQueueStore.listen(this.setState.bind(this));
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
