// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


var Tail = require('always-tail');
var filename = "test.txt";


// var spawn = require('child_process').spawn;
// var tail2 = spawn('tail', ['-f', filename]);
// tail2.stdout.setEncoding('utf8');


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: []
    }
  }

  componentDidMount() {
    var tail = new Tail(filename, "\n", {
      start: 0,
      interval: 500
    });

    tail.on('line', this.onNewLine.bind(this));


    tail.on('error', function(data) {
      console.log("error:", data);
    });

    tail.watch();


    // tail2.stdout.on('data', this.onData.bind(this));
  }

  // onData(data) {
  //   console.info(data);
  //
  //   this.setState({
  //     lines: this.state.lines.concat([data])
  //   })
  //
  // }

  onNewLine(line) {
    console.info(line);

    this.setState({
      lines: this.state.lines.concat([line])
    })
  }

  render() {
    const getLines = () => {
      return this.state.lines.map((line, index)=>{
        return (
          <div key={index}>{line}</div>
        )
      })
    };

    return (
      <div>
        {/*<div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>*/}
        <div style={{ color:'black', width: '50%', backgroundColor: 'white', height: '300px', overflow: 'auto'}}>
          {getLines()}
        </div>
      </div>
    );
  }
}
