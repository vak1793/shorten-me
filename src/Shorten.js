import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Form from './Form';
import List from './List';
import Upload from './Upload';
import './Shorten.less';

class Shorten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootUrl: props.rootUrl,
      listData: []
    }
  }

  render() {
    var params = {
      rootUrl: this.state.rootUrl,
      longkey: 'long_url',
      shortkey: 'short_url'
    };

    var style = { height: window.innerHeight * 0.8 }

    return (
      <div className="main" style={style}>
        <Tabs onSelect={this.onTabSelect}>
          <div id="tab-container">
            <TabList>
              <Tab> Create </Tab>
              <Tab> View </Tab>
              <Tab> Upload </Tab>
            </TabList>
          </div>
          <TabPanel>
            <Form {...params}/>
          </TabPanel>
          <TabPanel>
            <List {...params}/>
          </TabPanel>
          <TabPanel>
            <Upload {...params}/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Shorten;
