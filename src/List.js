import React, { Component } from 'react';
import $ from 'jquery';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: '',
      path: props.path,
      longkey: props.longkey,
      shortkey: props.shortkey,
    }

    this.createList = this.createList.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: this.state.path,
      success: ((response) => {

        this.setState({items: response})
        console.log(this.state)
      }),
      error: ((response) => { console.log(response) })
    })
  }

  createList() {
    var rows = [];

    for(var i = 0; i < this.state.items.length; i++) {
      var long = this.state.items[i][this.state.longkey];
      var short = <a href={this.state.items[i][this.state.shortkey]} target='_blank'> {this.state.items[i][this.state.shortkey]} </a>;

      rows.push(<tr key={i}><td>{short}</td><td>{long}</td></tr>)
    }

    // var op = <ul id="shortened-url-list"> {list} </ul>;
    return (
      <div id="results-table">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

  render() { return this.createList() }
}

export default List
