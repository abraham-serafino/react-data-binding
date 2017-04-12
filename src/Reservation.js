import React, { Component } from 'react';
import bindModel from './bindModel.js';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.summary = this.summary.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value) {
    switch (key) {
      case 'isGoing':
        if (!value) {
          this.setState({ numberOfGuests: 0 });
        }
        break;

      case 'numberOfGuests':
        if (value > 0) {
          this.setState({ isGoing: true });
        }
        break;
    }
  }

  summary() {
    const { isGoing, numberOfGuests } = this.state;

    if (!isGoing) {
      return 'Not attending';
    } else {
      return `Attending with ${numberOfGuests} guest${numberOfGuests === '1' ? '' : 's'}`;
    }
  }

  render() {
    const model = bindModel(this);

    return (
        <div>
          <form>
            <label>
              <input type="checkbox" {...model("isGoing")} />
              Attending
            </label>
            <br />
            <label>
              Number of guests:
              <input type="number" {...model('numberOfGuests')} />
            </label>
          </form>
          <label>{this.summary()}.</label>
        </div>
    );
  }
}

export default Reservation;
