import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, WindowScroller, InfiniteLoader } from 'react-virtualized';
import styled from 'styled-components';

import Cache from '../cache';
import NoResults from './NoResults';
import RowLoading from './RowLoading';
import LoadingIndicator from './LoadingIndicator';
import AnErrorOccured from './AnErrorOccured';
import EndOfScroll from './EndOfScroll';
import GalleryImage from '../containers/GalleryImage';

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  opacity: ${props => (props.hidden ? '0' : '1')};
  transition: opacity 0.3s;
`;

export default class ListView extends Component {
  constructor(props) {
    super(props);
    this.cache = new Cache();

    this.state = {
      scrollToIndex: props.scrollToIndex || -1,
      width: 0,
      scrollTop: 0,
      gutter: 5,
      hidden: true,
    };

    this.listElt = undefined;

    this.rowRenderer = this.rowRenderer.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
  }

  componentDidMount() {
    const { itemsList } = this.props;
    const { hidden } = this.state;

    // load initial items
    if (itemsList.length === 0) {
      this.loadMore();
    }

    // Fade in (hack)
    if (hidden) {
      const that = this;
      window.setTimeout(() => that.setState({ hidden: false }), 20);
    }
  }

  componentDidUpdate(prevProps) {
    const { width } = this.props;

    // If width has changed since last time
    if (prevProps.width !== width) {
      // Clear out cache
      this.cache.clearAll();

      // Force List to recompute all row heights
      if (this.listElt) {
        this.listElt.recomputeRowHeights();
      }
    }
  }

  componentWillUnmount() {
    const { onSaveScrollPosition, moduleId, galleryId, searchQuery } = this.props;
    const { scrollTop } = this.state;
    const { itemsList, width } = this.props;

    // Calculate scroll index
    let scrollToIndex = 0;
    let rowHeight = 0;
    for (let i = 0; i < itemsList.length; i += 1) {
      rowHeight += this.getRowHeight({ index: i, width });
      if (rowHeight > scrollTop) {
        scrollToIndex = i;
        break;
      }
    }

    // Save it in persistent redux state
    onSaveScrollPosition(moduleId, galleryId, searchQuery, scrollToIndex);
  }

  /** Returns the height of a row given its index */
  getRowHeight({ index, width: clientWidth }) {
    if (!clientWidth) {
      // We're probably unmounting. This is fine.
      return 0;
    }

    if (!this.isRowLoaded({ index })) {
      return 200;
    }

    if (this.cache.has(index) && this.cache.get(index).width === clientWidth) {
      // Width has not changed, use cache
      return this.cache.get(index).height;
    }

    // Width has changed, recalculate and set cache
    const { items, itemsList } = this.props;
    const { gutter } = this.state;
    const id = itemsList[index];
    const { width, height } = items[id];

    const widthAvailable = clientWidth - 2 * gutter;
    const calculatedWidth = Math.min(width, widthAvailable);
    const calculatedHeight = (height / width) * calculatedWidth + 2 * gutter;

    this.cache.set(index, { width: clientWidth, height: calculatedHeight });

    return calculatedHeight;
  }

  /** Callback when the list is scrolled */
  handleScroll({ scrollTop }) {
    // If user has scrolled we're OK to reset the scrollToIndex.
    // Also make sure to set the scrollTop for use in saving the scroll
    // position when we unmount
    this.setState(prevState => ({
      ...prevState,
      scrollTop,
      scrollToIndex: -1,
    }));
  }

  /** Responsible for tracking the loaded state of each row */
  isRowLoaded({ index }) {
    const { itemsList } = this.props;

    // Row is loaded if set in list
    return !!itemsList[index];
  }

  /** Callback to be invoked when more rows must be loaded */
  loadMore() {
    const { loading, onLoadItems, moduleId, galleryId, searchQuery, hasNextPage } = this.props;
    // TODO: Consider allowing more to load even if previous page has not finished
    if (!loading && hasNextPage) {
      onLoadItems(moduleId, galleryId, searchQuery);
    }
  }

  /** Responsible for rendering a row */
  rowRenderer({ index, key, style, width }) {
    const { hasNextPage } = this.props;

    // If row is not loaded, then render some placeholder
    // TODO: Maybe render something a bit better
    if (!this.isRowLoaded({ index })) {
      if (!hasNextPage) {
        return (
          <div key={key} style={style}>
            <EndOfScroll />
          </div>
        );
      }

      return (
        <div key={key} style={style}>
          <RowLoading />
        </div>
      );
    }

    // Render row using index of item in itemsList
    const { itemsList, moduleId, galleryId, searchQuery, onItemClick } = this.props;
    const { gutter } = this.state;
    const id = itemsList[index];
    return (
      <GalleryImage
        key={key}
        moduleId={moduleId}
        galleryId={galleryId}
        searchQuery={searchQuery}
        id={id}
        style={{ ...style, width }}
        width={width}
        gutter={gutter}
        onClick={onItemClick}
      />
    );
  }

  render() {
    const { itemsList, error, width, loading } = this.props;
    const { scrollToIndex, hidden } = this.state;
    const rowCount = itemsList.length + 1; // render an extra item to signal loading or at the end

    if (error) {
      return <AnErrorOccured />;
    }

    if (itemsList.length === 0 && !loading) {
      return <NoResults />;
    }

    if (itemsList.length === 0) {
      return <LoadingIndicator />;
    }

    return (
      <Content hidden={hidden}>
        <WindowScroller onScroll={this.handleScroll}>
          {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
            <div ref={registerChild}>
              <InfiniteLoader isRowLoaded={this.isRowLoaded} loadMoreRows={this.loadMore} rowCount={rowCount}>
                {({ onRowsRendered, registerChild: infiniteLoaderChildRegistration }) => (
                  <List
                    autoHeight
                    ref={node => {
                      this.listElt = node;
                      return infiniteLoaderChildRegistration(node);
                    }}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    rowCount={rowCount}
                    scrollToAlignment="start"
                    scrollToIndex={scrollToIndex}
                    rowHeight={args => this.getRowHeight({ ...args, width })}
                    rowRenderer={args => this.rowRenderer({ ...args, width })}
                    overscanRowCount={3}
                  />
                )}
              </InfiniteLoader>
            </div>
          )}
        </WindowScroller>
      </Content>
    );
  }
}

ListView.defaultProps = {
  onItemClick: null,
  galleryId: null,
  searchQuery: null,
};

ListView.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.object.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  scrollToIndex: PropTypes.number.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  onLoadItems: PropTypes.func.isRequired,
  onSaveScrollPosition: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
  moduleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  galleryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  searchQuery: PropTypes.string,
};
