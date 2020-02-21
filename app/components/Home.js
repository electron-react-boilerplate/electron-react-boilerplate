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
        return db.exec(
          [
            'CREATE TABLE IF NOT EXISTS workspace (',
            'name TEXT NOT NULL UNIQUE,',
            'url TEXT NOT NULL,',
            'username TEXT NOT NULL,',
            'password TEXT NOT NULL,',
            'mfa INTEGER NOT NULL DEFAULT 0',
            ')'
          ].join(' ')
        );
      })
      .then((db: Database) =>
        db.prepare('INSERT INTO workspace VALUES (?, ?, ?, ?, ?)')
      )
      .then((stmt: Statement) => {
        for (let i = 0; i < 10; i += 1) {
          stmt.run(
            `name ${i}`,
            'https://datacenter.service-now.com',
            `user ${i}`,
            'password',
            1
          );
          // stmt.run(`Ipsum ${i}`);
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
    this.db.each('SELECT rowid AS id, * FROM workspace', (err, row) => {
      console.log(`${row.id}: ${row.name} ${row.username} ${row.url}`);
      results.push(`${row.id}: ${row.name} ${row.username} ${row.url}`);
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
