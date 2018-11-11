import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { Helmet } from 'react-helmet';

import SearchInput from './SearchInput';
import Header from './Header';
import FixedBackButton from './FixedBackButton';
import ToggleIconButton from './ToggleIconButton';
import FixedBackToTopButton from './FixedBackToTopButton';
import ImageDialog from './ImageDialog';
import Container from './Container';
import MasonryView from '../containers/MasonryView';
import ListView from '../containers/ListView';

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
  max-width: 100vw;
`;

const MenuBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: start;
`;

export default class Gallery extends Component {
  static setGallery(props, onSetGallery) {
    const { match } = props;
    const { params } = match;
    const { moduleId, galleryId, searchQuery } = params;

    onSetGallery(moduleId, galleryId, searchQuery);
  }

  constructor() {
    super();

    this.state = {
      showDialogue: false,
      width: 0,
    };

    this.handleViewSwitch = this.handleViewSwitch.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.refCallback = this.refCallback.bind(this);
    this.toggleDialogue = this.toggleDialogue.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.contentRef = React.createRef();
  }

  componentWillMount() {
    const { onSetGallery } = this.props;
    this.constructor.setGallery(this.props, onSetGallery);
  }

  componentDidMount() {
    window.addEventListener('resize', _.throttle(this.handleResize, 200, { trailing: false }));
    window.addEventListener('scroll', _.throttle(this.handleScroll, 200, { trailing: false }));
  }

  componentWillReceiveProps(nextProps) {
    this.constructor.setGallery(nextProps, nextProps.onSetGallery);
  }

  componentWillUnmount() {
    // TODO: Something hereabouts is triggering an error updating state of an umounted component
    window.removeEventListener('resize', _.throttle(this.handleResize, 200, { trailing: false }));
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 200, { trailing: false }));
  }

  handleResize() {
    if (this.contentRef && this.contentRef.getBoundingClientRect) {
      const { width } = this.contentRef.getBoundingClientRect();
      this.setState(prevState => ({ ...prevState, width }));
    }
  }

  handleScroll() {
    this.setState({ scrollPosition: window.scrollY });
  }

  handleViewSwitch() {
    const { match, onSaveScrollPosition, onSwitchView } = this.props;
    const { params } = match;
    const { moduleId, galleryId, searchQuery } = params;

    onSaveScrollPosition(moduleId, galleryId, searchQuery, 0);
    onSwitchView();
    window.scrollTo(0, 0);
  }

  handleSearch(text) {
    const { history, match } = this.props;
    const { params } = match;
    const { moduleId, galleryId } = params;

    if (history && history.push) {
      history.push(`/search/${moduleId}/${galleryId || 'default'}/${encodeURIComponent(text)}`);
    }
  }

  toggleDialogue(image) {
    this.setState(prevState => ({ ...prevState, showDialogue: !prevState.showDialogue, dialogueImage: image }));
  }

  refCallback(node) {
    this.contentRef = node;
    if (this.contentRef && this.contentRef.getBoundingClientRect) {
      const { width } = this.contentRef.getBoundingClientRect();
      this.setState(prevState => ({ ...prevState, width }));
    }
  }

  renderChild() {
    const { match, showMasonry } = this.props;
    const { params } = match;
    const { moduleId, galleryId, searchQuery } = params;
    const { width } = this.state;

    if (width > 0) {
      const Child = showMasonry ? MasonryView : ListView;

      // Note: The key here is a hack to remount the child when route params change
      return (
        <Child
          key={`${moduleId}/${galleryId}/${searchQuery}`}
          moduleId={moduleId}
          galleryId={galleryId}
          searchQuery={searchQuery}
          width={width}
          onItemClick={this.toggleDialogue}
        />
      );
    }

    return null;
  }

  render() {
    const { match, history, showMasonry } = this.props;
    const { params } = match;
    const { moduleId, galleryId, searchQuery } = params;
    const { showDialogue, dialogueImage, scrollPosition } = this.state;

    const title = searchQuery
      ? `Search results in ${moduleId} for '${decodeURIComponent(searchQuery)}'`
      : `${moduleId}${galleryId ? `/${galleryId}` : ''}`;

    return (
      <Container>
        <Helmet>
          <title>Gallery</title>
          <meta name="description" content={title} />
        </Helmet>
        <Header backButtonEnabled history={history} header={title} />
        {scrollPosition > 100 ? <FixedBackButton history={history} /> : null}
        {scrollPosition > 100 ? <FixedBackToTopButton /> : null}
        <MenuBar>
          <ToggleIconButton
            icon={<ViewListIcon fontSize="large" />}
            color="primary"
            onClick={this.handleViewSwitch}
            title="Use List View"
            disabled={!showMasonry}
          />
          <ToggleIconButton
            icon={<ViewModuleIcon fontSize="large" />}
            color="primary"
            onClick={this.handleViewSwitch}
            title="Use Masonry View"
            disabled={showMasonry}
          />
          {galleryId ? null : <SearchInput onSubmit={this.handleSearch} />}
        </MenuBar>
        <React.Fragment>
          <Content ref={this.refCallback}>{this.renderChild()}</Content>
        </React.Fragment>
        <ImageDialog open={showDialogue} handleClose={this.toggleDialogue} image={dialogueImage} />
      </Container>
    );
  }
}

Gallery.propTypes = {
  onSaveScrollPosition: PropTypes.func.isRequired,
  onSwitchView: PropTypes.func.isRequired,
  onSetGallery: PropTypes.func.isRequired,
  showMasonry: PropTypes.bool.isRequired,
  match: ReactRouterPropTypes.match.isRequired, // Router
  history: ReactRouterPropTypes.history.isRequired,
};
