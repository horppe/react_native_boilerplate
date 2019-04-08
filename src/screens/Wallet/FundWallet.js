import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Alert, TouchableHighlight,

} from 'react-native';
import { connect } from 'react-redux';

import * as appActions from '../../reducers/app/actions';
import { Navigation } from 'react-native-navigation';
import { FloatingAction } from 'react-native-floating-action';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';



const actions = [
    {
        text: 'Enter Pin',
        icon: require('../../../img/logo.png'),
        name: 'recharge_pin',
        position: 2
    }, {
        text: 'Transfer',
        icon: require('../../../img/logo.png'),
        name: 'recharge_transfer',
        position: 1
    }, 
    // {
    //     text: 'Location',
    //     icon: require('../../../img/logo.png'),
    //     name: 'bt_room',
    //     position: 3
    // }, {
    //     text: 'Video',
    //     icon: require('../../../img/logo.png'),
    //     name: 'bt_videocam',
    //     position: 4
    // }
];

// this is a traditional React component connected to the redux store
class FundWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pinModalVisible: false,
        isLoading: false
    }
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

  setModalVisible(visible) {
    this.setState({pinModalVisible: visible});
  }

    onFloatingBtnClicked = (name) => {
      //  console.warn(`selected button: ${name}`);
        switch(name){
            case 'recharge_pin': 
            this.setState({pinModalVisible: true})
            default:
            break;
        }
    }
    
    rechargePin(){

    }
    componentDidAppear(){
      
    }
  

    renderPinModal(){
        return (
            <Modal
           
            ref={(ref) => { this.floatingAction = ref; }}
            animationType="slide"
            transparent={false}
            visible={this.state.pinModalVisible}
            onRequestClose={() => {
               // Alert.alert('Modal has been closed.');
               this.setModalVisible(!this.state.pinModalVisible);
            }}>
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'transparent'}}>
                <View style={styles.pinModalContainer}>
                <View style={{flex:.6}}>
                    <Text style={styles.pinHeadingText}> Enter Pin </Text>
                </View>
               <View style={{flex: 1}}>
                <CustomTextInput
                    name={'pin'}
                    placeholder={'Enter pin'}
                    editable={!this.state.isLoading}
                    returnKeyType={'done'}
                    secureTextEntry={true}
                    withRef={true}
                    onChangeText={pin => this.setState({pin: pin})}
                    isEnabled={!this.state.isLoading}
                    placeholderTextColor='white'
                />
                 <CustomButton
                    colors={['#FAFAFA', '#FFFFFF']}
                    text={'Recharge'}
                    onPress={() => rechargePin()}
                    buttonStyle={{}}
                    textStyle={{ color: '#3c0e65' }}
                />
                </View>
                </View>
            </View>
          
        </Modal>
        )
    }

  render() {
    return (
      <View style={{ /* marginTop: 80, */ flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}> To fund your Wallet, click the button in the bottom right</Text>
        
      </View>
        <FloatingAction
            actions={actions}
            onPressItem={this.onFloatingBtnClicked}
        />
          {this.renderPinModal()}
      </View>
    );
  }
}

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
        backgroundColor: '#3c0e65',
        justifyContent: 'center'
    },
    pinHeadingText: {
        fontSize: 30, 
        marginTop: 40,        
        textAlign: 'center',
        color: 'white'
    }
});

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
)(FundWallet);
