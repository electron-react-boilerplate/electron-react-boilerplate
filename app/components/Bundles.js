// @flow
import React, { Component } from 'react';
import styles from './Bundles.css';

function getBundles() {
  return [
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
}

function remainder(progress) {
  return 100 - (progress || 0);
}

function pickBackgroundColor(status) {
  switch (status) {
    case 'DRAFT': return '#F5D2D2';
    case 'IN_DBL': return '#EDEDED';
    case 'UPLOADING': return '#6DCBC4';
    case 'UPLOADED': return '#A1CB6D';
    default:
      return 'white';
  }
}

type Props = {};
export default class Bundles extends Component<Props> {
  props: Props;
  constructor() {
    super();
    this.state = {
      bundles: getBundles()
    };
  }

  render() {
    const { bundles } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        {bundles.map((d) => (
          <div className={styles.bundleRow} key={d.id} style={{ background: `-webkit-linear-gradient(left, ${pickBackgroundColor(d.status)} ${d.progress || 100}%, white ${remainder(d.progress)}%)` }}>
            <div className={styles.leftSide}>{d.nameDisplayAs}</div>
            <div className={styles.rightSide}>{d.statusDisplayAs}</div>
          </div>))}
      </div>
    );
  }
}
