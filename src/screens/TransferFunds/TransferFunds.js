import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import * as appActions from '../../reducers/app/actions';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

// this is a traditional React component connected to the redux store

class TransferFunds extends Component {
  state = {
    slider1ActiveSlide: 1,
  };

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
    // alert("menuOpened: " + this.props.openedWithSideMenu)

    // if(this.props.openedWithSideMenu){
    //   Navigation.mergeOptions(this.props.componentId, {
    //     sideMenu: {
    //       left: {
    //         visible: false,
    //       },
    //     },
    //   });
    //   this.props.openedWithSideMenu = false;
    // }
  }


  render() {



    return (

            <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#6B609A'}}>
                <View style={styles.pinModalContainer}>
                  <View style={{flex:.5}}>
                      <Text style={styles.pinHeadingText}> Transfer Funds </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <View style={{flex: .9}}>
                        <CustomTextInput
                            name={'pin'}
                            placeholder={'Enter Wallet ID'}
                            editable={!this.state.isLoading}
                            returnKeyType={'done'}
                            secureTextEntry={true}
                            withRef={true}
                            onChangeText={walletId => this.setState({walletId: walletId})}
                            isEnabled={!this.state.isLoading}
                            placeholderTextColor='white'
                        />
                        <CustomTextInput
                            name={'pin'}
                            placeholder={'Enter amount'}
                            editable={!this.state.isLoading}
                            returnKeyType={'done'}
                            secureTextEntry={true}
                            withRef={true}
                            onChangeText={amount => this.setState({amount: amount})}
                            isEnabled={!this.state.isLoading}
                            placeholderTextColor='white'
                            keyboardType='numeric'
                        />
                        <CustomButton
                            colors={['#FAFAFA', '#FFFFFF']}
                            text={'Send'}
                            onPress={() => rechargePin()}
                            buttonStyle={{marginTop: 10}}
                            textStyle={{ color: '#3c0e65' }}
                        />
                        </View>
                    </View>
                </View>
            </View>

    );
  }
}

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
const styles = StyleSheet.create({
  text: {
      fontSize: 25,
      marginBottom: 50,
      fontStyle: 'italic',
      marginHorizontal: 20,
      textAlign: 'center'
  },
  pinModalContainer: {
      marginTop: 22, 
      flex: .5, 
      backgroundColor: '#6B609A',
      justifyContent: 'center'
  },
  pinHeadingText: {
      fontSize: 30, 
      marginTop: 40,        
      textAlign: 'center',
      color: 'white'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferFunds);
