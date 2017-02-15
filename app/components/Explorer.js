import React from 'react';
import { Treebeard } from 'react-treebeard';
import { View } from 'react-desktop/windows';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/twilight';
import Editor from 'react-ace';
import { connect } from 'react-redux';
import jesFtp from '../utils/jesFtp';
import { setEditorContent } from '../actions/editor';

const lightTree = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: '#F3F3F3',
      margin: 0,
      padding: 0,
      color: '#000000',
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: '#ffffff'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#000000',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#000000'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px white',
          borderBottom: 'solid 2px white',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};

const darkTree = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: '#21252B',
      margin: 0,
      padding: 0,
      color: '#9DA5AB',
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: '#31363F'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#9DA5AB'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
};

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(node, toggled) {
    console.log(`called onToggle on ${JSON.stringify(node)} with ${toggled}`)
    if (this.state.cursor) { this.state.cursor.active = false; }
    node.active = true;
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
    // Is this node a member?
    // Should not have a children attribute... needs to be enhanced to open things other than members in PDS
    if (!node.children) {
      console.log(`${node.name} is a member in ${node.attributes.dsname}`);
      jesFtp.retrieveMember(node.attributes.dsname, node.name);
    } else {
      console.log(`${node.name} is dataset`);
    }
  }
  render() {
    return (
      <View
        width="100%"
        height="100%"
      >
        <Treebeard
          style={this.props.theme === 'dark' ? darkTree : lightTree}
          data={this.props.datasets}
          onToggle={this.onToggle}
        />
        <Editor
          mode="java"
          theme={this.props.theme === 'dark' ? 'twilight' : 'github'}
          name="EDITOR" //TODO: Change this to a generated value when we add multiple editors
          readOnly
          editorProps={{
            $blockScrolling: Infinity,
            readOnly: true
          }}
          value={this.props.explorerContent}
          width="100%"
          height="100%"
          fontSize={20}
        />
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    datasets: state.datasets,
    theme: state.uiStyle.theme,
    color: state.uiStyle.color,
    explorerContent: state.explorer.explorerContent
  };
}

export default connect(mapStateToProps)(Explorer);
