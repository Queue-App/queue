import React, { Component } from 'react';

class WaitTimesDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waitTimeList: [],
    };
  }

  updateWaitList() {
    // fetch request to display wait times
    const body = {
      venueId: this.props.venueId,
    };
    fetch('/dbRouter/getWaitTimes', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        const waitTimes = [];
        for (let i = 0; i <= data.length; i += 1) {
          if (data[i]) {
            const time = data[i].timestamp.split(/[- : T .]/);
            const timestamp = new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], time[5]));
            waitTimes.push(
              <div key={i}>
                {data[i].waittime}
                {' '}
                minutes - last updated
                {' '}
                {`${timestamp}`}
              </div>,
            );
          }
        }
        this.setState({
          waitTimeList: waitTimes,
        });
      })
      .catch((err) => {
        throw new Error(`getWaitTime func err when getting wait time: ${err}`);
      });
  }


  componentDidUpdate() {
    this.updateWaitList();
  }

  componentDidMount() {
    this.updateWaitList();
  }


  render() {
    return (
      <div>
        {/* // allows input of only numbers with max length 3; tel stands for telephone number; used for mobile */}
        <input type="number" name="WaitTime" placeholder="enter wait time in minutes" onChange={this.props.setWaitTime} />
        <input type="button" onClick={this.props.addWaitTime} value="Add Wait Time" />

        {/* render wait times pulled from sql database */}
        <div>
              Most Recent Wait Times
          {this.state.waitTimeList}
        </div>
      </div>
    );
  }
}

export default WaitTimesDisplay;
