import React, { Component } from 'react';
import $ from 'jquery';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      justCreated: [],
      rootUrl: "http://localhost:3001"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createList = this.createList.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    $.ajax({
      method: 'POST',
      url: `${this.state.rootUrl}/links?url=${this.state.value}`,
      success: ((response) => {
        this.setState(prevState => ({
          justCreated: [
            {
              'long': this.state.value,
              'short': response
            },
            ...prevState.justCreated
          ],
          value: '',
        }))
      }),
      error: ((response) => { console.log(response) })
    })
    event.preventDefault();
  }

  createList() {
    var list = [];
    var items = this.state.justCreated;
    for(var i = 0; i < items.length; i++) {
      var long = items[i]['long'];
      var short = <a href={items[i]['short']}> {items[i]['short']} </a>;

      list.push(<li key={i}>{long} -> {short}</li>);
    }
    var op = <ul id="shortened-url" visibility={this.state.justCreated.length > 1 ? 'visible' : undefined}> {list} </ul>;
    return op;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter URL" />
          <input type="submit" />
        </form>
        { this.createList() }
      </div>
    );
  }
}

export default Form
