import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import $ from 'jquery';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootUrl: "http://short.ly:3001",
      created: []
    }

    this.handleFile = this.handleFile.bind(this);
    this.createMultiple = this.createMultiple.bind(this);
  }

  createMultiple(index, row) {
    row = row.split(',')[0]
    $.ajax({
      method: 'POST',
      url: `${this.state.rootUrl}/links?url=${row}`,
      success: ((response) => {
        this.setState(prevState => ({
          created: [
            ...prevState.created,
            {
              'long_url': row,
              'short_url': response
            }
          ]
        }))
      }),
      error: ((response) => { console.log(response) })
    });
  }

  handleFile(file) {
    var reader = new FileReader();
    this.setState({created: []})
    var $that = this
    reader.onload = function(e) {
      var rows = reader.result.split('\n');
      $.each(rows, $that.createMultiple)
    }
    reader.readAsText(file[0]);
  }

  createList() {
    var rows = [];

    for(var i = 0; i < this.state.created.length; i++) {
      var long = this.state.created[i]['long_url'];
      var short = <a href={this.state.created[i]['short_url']} target='_blank'> {this.state.created[i]['short_url']} </a>;

      rows.push(<tr key={i}><td>{short}</td><td>{long}</td></tr>)
    }

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  render() {
    var params = {

    }
    return(
      <div>
        <ReactFileReader handleFiles={this.handleFile} fileTypes={'.csv'}>
          <button id="upload-button" className='btn'>Upload CSV</button>
        </ReactFileReader>
        <div id="upload-results"> {this.createList()} </div>
      </div>
    )
  }
}

export default Upload
