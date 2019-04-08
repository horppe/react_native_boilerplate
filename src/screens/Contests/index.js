import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import * as appActions from '../../reducers/app/actions';
import { Navigation } from 'react-native-navigation';

// this is a traditional React component connected to the redux store
class Contests extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    const { menuOpened, toggleMenu } = this.props;
    if (buttonId === 'menu') {
      toggleMenu();
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: !menuOpened,
          },
        },
      });
    }
  }

  componentDidAppear(){
    
  }


  render() {
    return (
      <View style={{ marginTop: 80 }}>
        <Text>Contests Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    menuOpened: state.app.menuOpened,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch(appActions.toggleMenu()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contests);
