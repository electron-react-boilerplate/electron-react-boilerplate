import React from 'react';
import { View, Window, NavPane, NavPaneItem } from 'react-desktop/windows';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { renderIcon } from '../utils/renderIcon';
import StatusBar from '../components/StatusBar';

function App(props) {
  const editorContent = props.editorContent;
  const setEditorContent = props.setEditorContent;

  return (
    <Window
      color={props.color}
      theme={props.theme}
      height="100vh"
      width="100vw"
    >
      <View
        //Main View - upper stuff and
        layout='vertical'
        height="100vh"
        width="100vw"
      >
        <View
          //action bar and content
          height="100vh"
          width="100%"
        >
          <NavPane
            canPaneToggle // bool Sets whether the pane can be compacted.Default value "true".
            color={props.color} // string sets the main color of a component.
            defaultIsPaneExpanded={false} // string sets whether the pane is expanded by default. Default value "true".
            // onPaneToggle function Callback function when the pane is expanded or compacted.
            paneCompactedLength={48} // string, number sets the length of the pane when compacted. Default value "48px".
            paneExpandedLength="100px" // string, number sets the length of the pane when expanded. Default value "200px"
            // openLength='100px'
            // string, number sets the length of the pane when expanded. Default value "200px"
            theme={props.theme} // Sets the UI theme that is used by this component and its children elements. Property value "light", "dark"
            // push
            style={{
              flex: '0 0 0%'
            }}
          >
            <NavPaneItem
              title="edit"
              icon={renderIcon('punchCard', props.theme)}
              onSelect={() => hashHistory.push('/editor')}
              push
            />
            <NavPaneItem
              title="results"
              icon={renderIcon('printout', props.theme)}
              onSelect={() => hashHistory.push('/results')}
              push
            />
            <NavPaneItem
              title="explorer"
              icon={renderIcon('mainframe', props.theme)}
              onSelect={() => hashHistory.push('/explorer')}
              push
            />
            <NavPaneItem
              title="config"
              icon={renderIcon('settings', props.theme)}
              onSelect={() => hashHistory.push('/config')}
              push
            />
          </NavPane>
          {props.children}
        </View>
        <StatusBar />
      </View>
    </Window>
  );
}


function mapStateToProps(state) {
  return {
    theme: state.uiStyle.theme,
    color: state.uiStyle.color
  };
}

export default connect(mapStateToProps)(App);
