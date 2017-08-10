import React, { Component } from 'react';
import bindModel from './bindModel.js';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
      guests: [],
      name: {
        firstName: '',
        lastName: ''
      }
    };

    this.addGuest = this.addGuest.bind(this);
    this.summary = this.summary.bind(this);
    this.renderGuests = this.renderGuests.bind(this);
  }

  addGuest(event) {
    event.preventDefault();

    this.setState({
      guests: this.state.guests.concat({
        firstName: 'John',
        lastName: 'Smith'
      })
    });
  }

  summary() {
    const { isGoing, name } = this.state;
    const { firstName, lastName } = name;

    const guestNames = this.state.guests.map(guest =>
        `${guest.firstName} ${guest.lastName}`);

    if (guestNames.length > 1) {
      const lastGuestName = guestNames.length - 1;
      guestNames[lastGuestName] = `and ${guestNames[lastGuestName]}`;
    }

    const guestSummary = (guestNames.length > 0 ? 'with ' : '') +
        (guestNames.length > 2 ? guestNames.join(', ') : guestNames.join(' '));

    if (!isGoing) {
      return `${firstName} ${lastName} is not attending`;
    } else {
      return `${firstName} ${lastName} is attending ${guestSummary}`;
    }
  }

  renderGuests(arrayItem) {
    const guests = [];

    for (let i = 0, iLen = this.state.guests.length; i < iLen; ++i) {
      guests.push(
          <p key={i}>
            <label>Guest {i + 1} (First Name):&nbsp;</label>
            <input type="text" {...arrayItem('guests', i, 'firstName')}
                   readOnly={!this.state.isGoing} />
            <br/>
            <label>(Last Name):&nbsp;</label>
            <input type="text" {...arrayItem('guests', i, 'lastName')}
                   readOnly={!this.state.isGoing} />
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
            <label>Your first name:&nbsp;</label>
            <input type="text" {...model('name.firstName')} />
            <br/>
            <label>Your last name:&nbsp;</label>
            <input type="text" {...model('name.lastName')} />

            <br/><br/>

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
