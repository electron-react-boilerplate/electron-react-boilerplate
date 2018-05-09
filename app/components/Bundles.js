import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import Highlighter from 'react-highlight-words';
import FlatButton from 'material-ui/FlatButton';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import SaveTo from 'material-ui/svg-icons/content/save';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import PauseCircleFilled from 'material-ui/svg-icons/av/pause-circle-filled';
import CallSplit from 'material-ui/svg-icons/communication/call-split';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { navigationConstants } from '../constants/navigation.constants';
import { mockFetchAll, fetchAll, toggleSelectBundle, toggleModePauseResume, requestSaveBundleTo } from '../actions/bundle.actions';
import { updateSearchInput, clearSearch } from '../actions/bundleFilter.actions';
import styles from './Bundles.css';

type Props = {
  fetchAll: () => {},
  mockFetchAll: () => {},
  requestSaveBundleTo: () => {},
  toggleSelectBundle: () => {},
  toggleModePauseResume: () => {},
  updateSearchInput: () => {},
  clearSearch: () => {},
  history: {},
  bundles: {},
  bundlesFilter: {},
  bundlesSaveTo: {}
};

function mapStateToProps(state) {
  const { bundles, bundlesFilter, bundlesSaveTo } = state;
  return {
    bundles,
    bundlesFilter,
    bundlesSaveTo
  };
}

const mapDispatchToProps = {
  fetchAll,
  mockFetchAll,
  requestSaveBundleTo,
  toggleSelectBundle,
  toggleModePauseResume,
  updateSearchInput,
  clearSearch
};

class Bundles extends Component<Props> {
  props: Props;
  componentDidMount() {
    const { history, clearSearch: clearSearchResults } = this.props;
    if (history.location.pathname === navigationConstants.NAVIGATION_BUNDLES_DEMO) {
      this.props.mockFetchAll();
    } else {
      this.props.fetchAll();
    }
    history.listen(() => {
      // clear search results on location change
      clearSearchResults();
    });
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

  startSaveBundleTo(event, bundle) {
    stopPropagation(event);
    this.props.requestSaveBundleTo(bundle.id);
  }

  onClickTogglePauseResume(event, bundleId) {
    this.props.toggleModePauseResume(bundleId);
    event.stopPropagation();
  }

  onChangeSearchInput(event, inputValue) {
    this.props.updateSearchInput(inputValue, this.props.bundles);
  }

  updateMatches(bundle, options) {
    const { bundlesFilter } = this.props;
    if (!bundlesFilter.isSearchActive) {
      return [];
    }
    const { searchResults } = bundlesFilter;
    const { bundlesMatching, chunks } = searchResults;
    const hasMatchInBundle = bundle.id in bundlesMatching;
    if (hasMatchInBundle) {
      return chunks[options.textToHighlight];
    }
    return [];
  }

  render() {
    const { bundles, bundlesFilter } = this.props;
    const highlighterSharedProps = (bundle) => ({
      searchWords: bundlesFilter.isSearchActive ? bundlesFilter.searchKeywords : [],
      highlightClassName: styles.Highlight,
      findChunks: (options) => this.updateMatches(bundle, options)
    });
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.searchBar}>
          <div className={styles.searchBarFilters}>Show: <span>All</span> </div>
          <div className={styles.searchBarSearch}>Search:
            <DebounceInput
              debounceTimeout={300}
              value={bundlesFilter.isSearchActive ? bundlesFilter.searchInput : ''}
              onChange={(event) => this.onChangeSearchInput(event, event.target.value)}
            />
          </div>
        </div>
        {bundles.loading &&
        <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
        </svg>
        }
        {bundles.items && bundles.items.filter((b) => displayRow(bundlesFilter, b)).map((d) => (
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
              <div className={styles.bundleRowTopLeftSide}>
                <Highlighter textToHighlight={d.displayAs.name} {...highlighterSharedProps(d)} />
              </div>
              <div className={styles.bundleRowTopMiddle}>
                <Highlighter textToHighlight={d.displayAs.revision} {...highlighterSharedProps(d)} />
              </div>
              <div className={styles.bundleRowTopRightSide}>
                {(d.status === 'COMPLETED' || d.status === 'DRAFT') &&
                  <div style={{ paddingRight: '20px', paddingTop: '6px' }}>
                    <Highlighter textToHighlight={d.displayAs.status} {...highlighterSharedProps(d)} />
                  </div>}
                {d.task === 'DOWNLOAD' && d.status === 'NOT_STARTED' &&
                <FlatButton
                  labelPosition="before"
                  label={<Highlighter textToHighlight={d.displayAs.status} {...highlighterSharedProps(d)} />}
                  icon={<FileDownload />}
                  onClick={(e) => this.onClickTogglePauseResume(e, d.id)}
                />
                }
                {d.mode === 'PAUSED' &&
                <FlatButton
                  labelPosition="before"
                  label={<Highlighter textToHighlight={d.displayAs.status} {...highlighterSharedProps(d)} />}
                  icon={<PlayCircleFilled />}
                  onClick={(e) => this.onClickTogglePauseResume(e, d.id)}
                />
                }
                {d.mode === 'RUNNING' &&
                <FlatButton
                  labelPosition="before"
                  label={<Highlighter textToHighlight={d.displayAs.status} {...highlighterSharedProps(d)} />}
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
                  label="Save To"
                  icon={<SaveTo />}
                  onKeyPress={(e) => this.startSaveBundleTo(e, d)}
                  onClick={(e) => this.startSaveBundleTo(e, d)}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bundles);

function displayRow(bundlesFilter, bundle) {
  return !(bundlesFilter.isSearchActive) ||
   bundle.id in bundlesFilter.searchResults.bundlesMatching;
}

function stopPropagation(event) {
  event.stopPropagation();
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
