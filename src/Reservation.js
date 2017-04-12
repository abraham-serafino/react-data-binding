import React, { Component } from 'react';
import bindModel from './bindModel.js';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
      guests: []
    };

    this.addGuest = this.addGuest.bind(this);
    this.summary = this.summary.bind(this);
    this.renderGuests = this.renderGuests.bind(this);
  }

  addGuest(event) {
    event.preventDefault();

    this.setState({
      guests: this.state.guests.concat({ name: 'John Smith' })
    });
  }

  summary() {
    const { isGoing } = this.state;

    const guestNames = this.state.guests.map(guest => guest.name);

    if (guestNames.length > 2) {
      const lastGuestName = guestNames.length - 1;
      guestNames[lastGuestName] = `and ${guestNames[lastGuestName]}`;
    }

    const guestSummary = (guestNames.length > 0 ? 'with ' : '') +
        (guestNames.length > 2 ? guestNames.join(', ') : guestNames.join(' '));

    if (!isGoing) {
      return `Not attending`;
    } else {
      return `Attending ${guestSummary}`;
    }
  }

  renderGuests(arrayItem) {
    const guests = [];

    for (let i = 0, iLen = this.state.guests.length; i < iLen; ++i) {
      guests.push(
          <p key={i}>
            <label>Guest {i + 1}:&nbsp;</label>
            <input type="text" {...arrayItem('guests', i, 'name')}
                   readOnly={!this.state.isGoing} />
            <br/>
          </p>
      );
    }

    return guests;
  }

  render() {
    const { model, arrayItem } = bindModel(this);

    return (
        <div>
          <form>
            <label>
              <input type='checkbox' {...model('isGoing')} />
              Attending&nbsp;
            </label>

            <button onClick={this.addGuest}>&nbsp;Add guest</button>
            { this.renderGuests(arrayItem) }
          </form>

          <label>{this.summary()}</label>
        </div>
    );
  }
}

export default Reservation;
