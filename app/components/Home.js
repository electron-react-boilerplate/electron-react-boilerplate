// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Database from 'sqlite-async';
import type { Statement } from 'sqlite-async';
import routes from '../constants/routes.json';
import styles from './Home.css';

type Props = {};
type State = {
  results: Array<string>
};

export default class Home extends Component<Props, State> {
  props: Props;

  db: Database;

  constructor(props: Props) {
    super(props);

    this.state = {
      results: []
    };
  }

  componentDidMount() {
    Database.open(':memory:')
      .then((db: Database) => {
        this.db = db;
        return db.exec('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');
      })
      .then((db: Database) => db.prepare('INSERT INTO lorem VALUES (?)'))
      .then((stmt: Statement) => {
        for (let i = 0; i < 10; i += 1) {
          stmt.run(`Ipsum ${i}`);
        }
        const value = stmt.finalize();
        console.log(value);
        return value;
      })
      .catch((err: any) => console.log(err));
  }

  componentWillUnmount() {
    this.db.close();
  }

  onClick = () => {
    const results = [];
    this.db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
      console.log(`${row.id}: ${row.info}`);
      results.push(`${row.id}: ${row.info}`);
      this.setState({
        results
      });
    });
  };

  render() {
    const { results } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        <input type="button" onClick={this.onClick} value="Load" />
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        {results.map(result => (
          <h4 key={result}>{result}</h4>
        ))}
      </div>
    );
  }
}
