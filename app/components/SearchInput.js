import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
`;

export class SearchInput extends PureComponent {
  constructor() {
    super();

    this.state = {
      search: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClick = () => {
    this.setState(prevState => ({ ...prevState, search: '' }));
  };

  handleKeyDown = prop => event => {
    const { onSubmit } = this.props;
    const { [prop]: searchQuery } = this.state;

    if (event.key === 'Enter' && onSubmit) {
      onSubmit(searchQuery);
    }
  };

  render() {
    const { search } = this.state;
    const hasValue = search && search.length > 0;

    return (
      <Wrapper>
        <FormControl>
          <InputLabel htmlFor="input-search">Search</InputLabel>
          <Input
            id="input-search"
            type="search"
            value={search}
            onChange={this.handleChange('search')}
            onKeyDown={this.handleKeyDown('search')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label={hasValue ? 'Clear Search' : 'Search'} onClick={this.handleClick}>
                  {hasValue ? <CloseIcon /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Wrapper>
    );
  }
}

SearchInput.defaultProps = {
  onSubmit: null,
};

SearchInput.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchInput;
