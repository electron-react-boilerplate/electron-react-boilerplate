import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMasonryCellPositioner, WindowScroller, Masonry, CellMeasurerCache } from 'react-virtualized';
import styled from 'styled-components';

import RowLoading from './RowLoading';
import EndOfScroll from './EndOfScroll';
import NoResults from './NoResults';
import AnErrorOccured from './AnErrorOccured';
import LoadingIndicator from './LoadingIndicator';
import GalleryImage from '../containers/GalleryImage';
import PreCalculatedCellMeasurer from './PreCalculatedCellMeasurer';

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  opacity: ${props => (props.hidden ? '0' : '1')};
  transition: opacity 0.3s;
`;

const Main = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const Footer = styled.div`
  display: flex;
`;

export default class MasonryView extends Component {
  constructor(props) {
    super(props);

    const columnWidth = 300;

    // Default sizes help Masonry decide how many images to batch-measure
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
    });

    // Our masonry layout will use 3 columns with a 10px gutter between
    this.cellPositionerConfig = {
      cellMeasurerCache: this.cache,
      columnCount: 3,
      columnWidth,
      spacer: 10,
    };

    this.cellPositioner = createMasonryCellPositioner(this.cellPositionerConfig);

    this.state = {
      columnWidth,
      scrollPosition: props.scrollPosition,
      hidden: true,
    };

    this.masonryRef = React.createRef();
    this.contentRef = React.createRef();

    this.refCallback = this.refCallback.bind(this);
    this.calulateNewColumnWidth = this.calulateNewColumnWidth.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.setMasonry = this.setMasonry.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderCell = this.renderCell.bind(this);
  }

  componentDidMount() {
    const { oldWidth, width, itemsList } = this.props;
    let { scrollPosition } = this.props;

    // If width has changed calculate new scroll position
    // This is wildly innacurate due to various item measurements changing
    // So only try to adjust when the width has shrunk, in case
    // we try to scroll off the page
    if (oldWidth > width) {
      scrollPosition = (scrollPosition * width) / oldWidth;
    }

    // Restore scroll position (or try to at least)
    const that = this;
    that.intervalId = window.setInterval(() => {
      window.scrollTo(0, scrollPosition);
      if (
        scrollPosition === 0 ||
        scrollPosition > document.documentElement.scrollHeight ||
        Math.abs(window.scrollY - scrollPosition) < 10
      ) {
        window.clearInterval(that.intervalId);
        that.setState(prevState => ({ ...prevState, hidden: false }));
      }
    }, 100);

    // load initial items
    if (itemsList.length === 0) {
      this.loadMore();
    }
  }

  componentDidUpdate(prevProps) {
    const { width } = this.props;

    // If width has changed since last time
    if (prevProps.width !== width) {
      this.calulateNewColumnWidth(width);
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }

    const { moduleId, galleryId, searchQuery, onSaveScrollPosition, width } = this.props;
    const { scrollPosition } = this.state;
    onSaveScrollPosition(moduleId, galleryId, searchQuery, scrollPosition, width);
  }

  /** Given a total width, calculates widths of individual columns */
  calulateNewColumnWidth(width) {
    const { columnWidth } = this.state;

    const newColumnWidth = Math.floor(width / this.cellPositionerConfig.columnCount);

    if (columnWidth !== newColumnWidth) {
      this.setState(prevState => ({
        ...prevState,
        columnWidth: newColumnWidth,
      }));
      this.cache.clearAll();
      this.cellPositionerConfig.columnWidth = newColumnWidth;
      this.cellPositioner.reset(this.cellPositionerConfig);
      if (this.masonryRef) {
        this.masonryRef.clearCellPositions();
      }
    }
  }

  /** Callback to be invoked on-resize */
  handleResize() {
    if (this.contentRef && this.masonryRef && this.contentRef.getBoundingClientRect) {
      const { width } = this.contentRef.getBoundingClientRect();
      this.calulateNewColumnWidth(width);
    }
  }

  /** This function should be set as the Container's ref property */
  refCallback(element) {
    if (element && this.masonryRef) {
      const { width } = element.getBoundingClientRect();
      this.calulateNewColumnWidth(width);
    }
    this.contentRef = element;
  }

  /** This function should be set as the Masonry's ref property */
  setMasonry(node) {
    this.masonryRef = node;
  }

  /**	Callback to be invoked when more rows must be loaded */
  loadMore() {
    const { moduleId, galleryId, searchQuery, loading, onLoadItems, hasNextPage } = this.props;
    // TODO: Consider allowing more to load even if previous page has not finished
    if (!loading && hasNextPage) {
      onLoadItems(moduleId, galleryId, searchQuery);
    }
  }

  /** Callback invoked whenever the scroll offset changes within the inner scrollable region */
  handleScroll({ clientHeight, scrollHeight, scrollTop }) {
    if (scrollTop + clientHeight > scrollHeight - 500) {
      this.loadMore();
    }

    this.setState(prevState => ({
      ...prevState,
      scrollPosition: window.scrollY,
    }));
  }

  /** Responsible for rendering a cell given an index. */
  renderCell({ index, key, style, parent }) {
    const { columnWidth } = this.state;
    const { moduleId, galleryId, searchQuery, itemsList, items, onItemClick } = this.props;
    const id = itemsList[index];
    const { width, height } = items[id];

    return (
      <PreCalculatedCellMeasurer
        cache={this.cache}
        index={index}
        key={key}
        parent={parent}
        columnWidth={columnWidth}
        width={width}
        height={height}
        gutter={5}
      >
        <GalleryImage
          key={key}
          moduleId={moduleId}
          galleryId={galleryId}
          searchQuery={searchQuery}
          id={id}
          style={{ ...style, width: columnWidth }}
          width={columnWidth}
          gutter={5}
          onClick={onItemClick}
        />
      </PreCalculatedCellMeasurer>
    );
  }

  render() {
    const { cellPositioner } = this;
    const { itemsList, error, width, hasNextPage, loading } = this.props;
    const { hidden } = this.state;

    if (error) {
      return <AnErrorOccured />;
    }

    if (itemsList.length === 0 && !loading) {
      return <NoResults />;
    }

    if (itemsList.length === 0) {
      return <LoadingIndicator />;
    }

    let footer = null;
    if (!hasNextPage) {
      footer = <EndOfScroll />;
    } else if (loading) {
      footer = <RowLoading />;
    }

    return (
      <Content ref={this.refCallback} hidden={hidden}>
        <Main>
          <WindowScroller>
            {({ height, scrollTop, isScrolling }) => (
              <Masonry
                autoHeight
                cellCount={itemsList.length}
                cellPositioner={cellPositioner}
                cellRenderer={this.renderCell}
                height={height}
                isScrolling={isScrolling}
                scrollTop={scrollTop}
                onScroll={this.handleScroll}
                ref={this.setMasonry}
                width={width}
                cellMeasurerCache={this.cache}
                overscanByPixels={1440}
              />
            )}
          </WindowScroller>
        </Main>
        <Footer>{footer}</Footer>
      </Content>
    );
  }
}

MasonryView.defaultProps = {
  galleryId: null,
  searchQuery: null,
  onItemClick: null,
};

MasonryView.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.object.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  scrollPosition: PropTypes.number.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  onLoadItems: PropTypes.func.isRequired,
  onSaveScrollPosition: PropTypes.func.isRequired,
  moduleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  galleryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchQuery: PropTypes.string,
  width: PropTypes.number.isRequired,
  onItemClick: PropTypes.func,
  oldWidth: PropTypes.number.isRequired,
};
