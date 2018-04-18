// @flow
import React, { Component } from 'react';
import sort from 'fast-sort';
import styles from './Bundles.css';


function getBundles() {
  const bundles = [
    {
      id: 'bundle01', nameDisplayAs: 'Test Bundle #1', revision: 3, task: 'UPLOAD', statusDisplayAs: 'Uploaded', status: 'COMPLETED'
    },
    {
      id: 'bundle02', nameDisplayAs: 'Another Bundle', revision: 3, task: 'UPLOAD', statusDisplayAs: 'Uploading (63%)', status: 'UPLOADING', progress: 63, mode: 'PAUSED'
    },
    {
      id: 'bundle03', nameDisplayAs: 'Audio Bundle', revision: 52, task: 'DOWNLOAD', statusDisplayAs: 'Downloading (12%)', status: 'DOWNLOADING', progress: 12, mode: 'RUNNING'
    },
    {
      id: 'bundle04', nameDisplayAs: 'Unfinished Bundle', task: 'UPLOAD', statusDisplayAs: 'Draft', status: 'DRAFT'
    },
    {
      id: 'bundle05', nameDisplayAs: 'Unfinished Video Bundle', task: 'UPLOAD', statusDisplayAs: 'Draft', status: 'DRAFT'
    },
    {
      id: 'bundle06', nameDisplayAs: 'DBL Bundle', task: 'DOWNLOAD', statusDisplayAs: 'Download', status: 'NOT_STARTED'
    },
    {
      id: 'bundle07', nameDisplayAs: 'DBL Bundle 3', task: 'DOWNLOAD', statusDisplayAs: 'Download', status: 'NOT_STARTED'
    }
  ];
  const taskOrder = ['UPLOAD', 'DOWNLOAD'];
  const statusOrder = ['UPLOADING', 'COMPLETED', 'DRAFT', 'NOT_STARTED'];
  const sortedBundles = sort(bundles).asc([
    (b) => taskOrder.indexOf(b.task),
    (b) => statusOrder.indexOf(b.status),
    (b) => b.name,
  ]);
  return sortedBundles;
}

function pickBackgroundColor(status) {
  switch (status) {
    case 'DRAFT': return '#F5D2D2';
    case 'NOT_STARTED': return '#EDEDED';
    case 'UPLOADING':
    case 'DOWNLOADING':
      return '#6DCBC4';
    case 'COMPLETED': return '#A1CB6D';
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
          <div className={styles.bundleRow} key={d.id} style={{ background: `linear-gradient(to right, ${pickBackgroundColor(d.status)} 0%, ${pickBackgroundColor(d.status)} ${d.progress || 100}%, transparent 0%), linear-gradient(to bottom, white 0%, white 100%)` }}>
            <div className={styles.leftSide}>{d.nameDisplayAs}</div>
            <div className={styles.rightSide}>{d.statusDisplayAs}</div>
          </div>))}
      </div>
    );
  }
}
