import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';
import CallSplit from 'material-ui/svg-icons/communication/call-split';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { mockFetchAll, toggleSelectBundle, toggleModePauseResume } from '../actions/bundle.actions';
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
  mockFetchAll: () => {},
  toggleSelectBundle: () => {},
  toggleModePauseResume: () => {},
  bundles: {}
};

class Bundles extends Component<Props> {
  props: Props;
  componentDidMount() {
    this.props.mockFetchAll();
  }

  onKeyPress(event, bundleId) {
    if (['Enter', ' '].includes(event.key)) {
      this.onClickBundleRow(event, bundleId);
    }
    console.log(event.key);
  }

  onClickBundleRow(event, bundleId) {
    this.props.toggleSelectBundle(bundleId);
  }

  onClickTogglePauseResume(event, bundleId) {
    this.props.toggleModePauseResume(bundleId);
    event.stopPropagation();
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
          <div
            className={styles.bundleRow}
            key={d.id}
            onKeyPress={(e) => this.onKeyPress(e, d.id)}
            onClick={(e) => this.onClickBundleRow(e, d.id)}
            tabIndex={0}
            role="button"
            style={{ background: `linear-gradient(to right, ${pickBackgroundColor(d.status)} 0%, ${pickBackgroundColor(d.status)} ${d.progress || 100}%, transparent 0%), linear-gradient(to bottom, white 0%, white 100%)` }}
          >
            <div className={styles.bundleRowTop}>
              <div className={styles.bundleRowTopLeftSide}>{d.nameDisplayAs}</div>
              <div className={styles.bundleRowTopRightSide}>
                {(d.status === 'COMPLETED' || d.status === 'DRAFT') && <div style={{ paddingRight: '20px', paddingTop: '6px' }}>{d.statusDisplayAs}</div>}
                {d.task === 'DOWNLOAD' && d.status === 'NOT_STARTED' &&
                <FlatButton
                  labelPosition="before"
                  label={d.statusDisplayAs}
                  icon={<FileDownload />}
                />
                }
                {d.mode === 'PAUSED' &&
                <FlatButton
                  labelPosition="before"
                  label={d.statusDisplayAs}
                  icon={<PlayCircleFilled />}
                  onClick={(e) => this.onClickTogglePauseResume(e, d.id)}
                />
                }
                {d.mode === 'RUNNING' &&
                <FlatButton
                  labelPosition="before"
                  label={d.statusDisplayAs}
                  icon={<PauseCircleFilled />}
                  onClick={(e) => this.onClickTogglePauseResume(e, d.id)}
                />
                }
              </div>
            </div>
            {bundles.selectedBundle && bundles.selectedBundle.id === d.id &&
              <div className={`${styles.menuBar} + row`}>
                <FlatButton
                  label="Revise"
                  icon={<CallSplit />}
                  onKeyPress={(e) => stopPropagation(e)}
                  onClick={(e) => stopPropagation(e)}
                />
                <FlatButton
                  label="Download"
                  icon={<FileDownload />}
                  onKeyPress={(e) => stopPropagation(e)}
                  onClick={(e) => stopPropagation(e)}
                />
                <FlatButton
                  label="Info"
                  icon={<ActionInfo />}
                  onKeyPress={(e) => stopPropagation(e)}
                  onClick={(e) => stopPropagation(e)}
                />
                <FlatButton
                  label="Delete"
                  icon={<ActionDelete />}
                  onKeyPress={(e) => stopPropagation(e)}
                  onClick={(e) => stopPropagation(e)}
                />
              </div>
            }
          </div>))}
      </div>
    );
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

function mapStateToProps(state) {
  const { bundles } = state;
  return {
    bundles
  };
}
export default connect(mapStateToProps, { mockFetchAll, toggleSelectBundle, toggleModePauseResume })(Bundles);
