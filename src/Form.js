import React, { Component } from 'react';
import $ from 'jquery';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      justCreated: [],
      rootUrl: "http://short.ly:3001"
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
          ].slice(0,10),
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
      var short = <a href={items[i]['short']} target='_blank'> {items[i]['short']} </a>;

      list.push(<li className="result-item" key={i}>{long} -> {short}</li>);
    }
    var op = <ul id="shortened-url" visibility={this.state.justCreated.length > 1 ? 'visible' : undefined}> {list} </ul>;
    return op;
  }

  render() {
    return (
      <div>
        <form id="shorten-form" onSubmit={this.handleSubmit}>
          <input id="shorten-input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter URL" />
          <input id="shorten-submit" type="submit" />
        </form>
        <div id="results">
          { this.createList() }
        </div>
      </div>
    );
  }
}

export default Form
