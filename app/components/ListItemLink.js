import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

const NoResults = props => <ListItem button component={Link} {...props} />;

export default NoResults;
