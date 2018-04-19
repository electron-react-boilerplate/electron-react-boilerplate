import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bundleActions } from '../actions/bundle.actions';
import styles from './Bundles.css';

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

type Props = {
  dispatch: () => {},
  bundles: {}
};

class Bundles extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.dispatch(bundleActions.mockFetchAll());
  }

  render() {
    const { bundles } = this.props;
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.searchBar}>
          <div className={styles.searchBarFilters}>Show: <span>All</span> </div>
          <div className={styles.searchBarSearch}>Search: <input type="text" name="search" /></div>
        </div>
        {bundles.loading &&
        <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
        </svg>
        }
        {bundles.items && bundles.items.map((d) => (
          <div className={styles.bundleRow} key={d.id} style={{ background: `linear-gradient(to right, ${pickBackgroundColor(d.status)} 0%, ${pickBackgroundColor(d.status)} ${d.progress || 100}%, transparent 0%), linear-gradient(to bottom, white 0%, white 100%)` }}>
            <div className={styles.bundleRowTop}>
              <div className={styles.bundleRowTopLeftSide}>{d.nameDisplayAs}</div>
              <div className={styles.bundleRowTopRightSide}>
                {d.statusDisplayAs} {d.task === 'DOWNLOAD' && d.status === 'NOT_STARTED' && <i className={`${styles.iconRightOfText} + material-icons`}>file_download</i>}
                {d.mode === 'PAUSED' && <i className={`${styles.iconRightOfText} + material-icons`}>play_circle_filled</i>}
                {d.mode === 'RUNNING' && <i className={`${styles.iconRightOfText} + material-icons`}>pause_circle_filled</i>}
              </div>
            </div>
            {d.selected &&
              <div className={`${styles.menuBar} + row`}>
                <div className={styles.bundleRowBottomMenuItem}><i className="material-icons">call_split</i> Revise</div>
                <div className={styles.bundleRowBottomMenuItem}><i className="material-icons">file_download</i> Download</div>
                <div className={styles.bundleRowBottomMenuItem}><i className="material-icons">info</i>&nbsp;Info</div>
                <div className={styles.bundleRowBottomMenuItem}><i className="material-icons">delete</i> Delete</div>
              </div>
            }
          </div>))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { bundles } = state;
  return {
    bundles
  };
}
export default connect(mapStateToProps)(Bundles);
