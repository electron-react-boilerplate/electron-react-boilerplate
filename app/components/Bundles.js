// @flow
import React, { Component } from 'react';
import styles from './Bundles.css';

type Props = {};

export default class Bundles extends Component<Props> {
  props: Props;

  render() {
    const bundles = [
      {
        id: 'bundle01', nameDisplayAs: 'Test Bundle #1', revision: 3, statusDisplayAs: 'Uploaded', status: 'UPLOADED'
      },
      {
        id: 'bundle02', nameDisplayAs: 'Another Bundle', revision: 3, statusDisplayAs: 'Uploading (63%)', status: 'UPLOADING', progress: 63, mode: 'PAUSED'
      },
      {
        id: 'bundle03', nameDisplayAs: 'Audio Bundle', revision: 52, statusDisplayAs: 'Uploading (82%)', status: 'UPLOADING', progress: 82, mode: 'RUNNING'
      },
      {
        id: 'bundle04', nameDisplayAs: 'Unfinished Bundle', statusDisplayAs: 'Draft', status: 'DRAFT'
      },
      {
        id: 'bundle05', nameDisplayAs: 'Unfinished Video Bundle', statusDisplayAs: 'Draft', status: 'DRAFT'
      },
      {
        id: 'bundle06', nameDisplayAs: 'DBL Bundle', statusDisplayAs: 'Download', status: 'IN_DBL'
      },
      {
        id: 'bundle07', nameDisplayAs: 'DBL Bundle 3', statusDisplayAs: 'Download', status: 'IN_DBL'
      }
    ];
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Bundles</h2>
          <div>
            {bundles.map((d) => (<li key={d.id}>{d.nameDisplayAs}</li>))}
          </div>
        </div>
      </div>
    );
  }
}
