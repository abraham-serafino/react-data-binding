import React, { Component } from 'react';
import bindModel from './bindModel.js';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
      guest1: { name: 'Alice' },
      guest2: { name: 'Bob' }
    };

    this.summary = this.summary.bind(this);
  }

  summary() {
    const { isGoing } = this.state;
    const { guest1, guest2 } = this.state;

    if (!isGoing) {
      return `Not attending.`;
    } else {
      return `Attending with ${guest1.name} and ${guest2.name}.`;
    }
  }

  render() {
    const model = bindModel(this);

    return (
      <div>
        <form>
          <label>
            <input type='checkbox' {...model('isGoing')} />
            Attending&nbsp;
          </label>

          <p>
            <label>Guest 1:&nbsp;</label>
            <input type="text" {...model('guest1.name')} readOnly={!this.state.isGoing} />
            <br/>
          </p>

          <p>
            <label>Guest 2:&nbsp;</label>
            <input type="text" {...model('guest2.name')} readOnly={!this.state.isGoing} />
            <br/>
          </p>
        </form>

        <label>{this.summary()}</label>
      </div>
    );
  }
}

export default Reservation;
