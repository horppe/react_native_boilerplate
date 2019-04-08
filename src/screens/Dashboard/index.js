import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import {Container, Grid, Col, Row, Icon, List, ListItem, Button} from 'native-base';
import * as appActions from '../../reducers/app/actions';
import { Navigation } from 'react-native-navigation';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



// this is a traditional React component connected to the redux store
class Dashboard extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      
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
  componentDidMount(){
    
  }

  componentDidAppear(){
    // Navigation.mergeOptions(this.props.componentId, {
    //   sideMenu: {
    //     left: {
    //       visible: false,
    //     },
    //   },
    // });
   
  }

  navigate(route, text){
    Navigation.push(this.props.componentId, {
      component: {
        name: route,
        passProps: {
          text: 'Wallet',
          
        },
        options: {
          // topBar: {
          //   title: {
          //     color: 'white',
          //     text: text,
          //   },
          //   backButton: {
          //     color: 'white'
          //   }
          // },
          topBar: {
          visible: true,
          drawBehind: true,
          background: {
            color: '#6B609A',
          },
          title: {
            color: 'white',
            text: text,
          },
          leftButtons: [
           
          ],
          backButton: {
            visible: true,
            color: 'white',
            title: 'Back',
            titleVisible: true
          }
        },

        },
      },
    });
  }


  render() {

    return (
      <Container>
       
        <Grid>
          <Row style={{backgroundColor: '#6B609A', flex: .6}}>
              <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', marginTop:30}}>
                      <Icon name='cash' style={{color: 'white', fontSize: 25}} />
                      <Text style={{fontSize: 60, color:'white'}}>&#8358; 230</Text>
                      <Text style={{fontSize: 20, color:'white'}}>Balance</Text>
                </View>
          </Row>
          <Row style={{}}>
            <Col style={{ flex: 1, justifyContent: 'space-evenly'}}>
              <TouchableNativeFeedback onPress={() => {
               this.navigate('multivision.WalletScreen', 'Wallet');
              }}>
                <View style={styles.dashboardButton} >
                  <Text style={styles.dashboardText}>Wallet</Text>
                </View>
              </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => {
                  this.navigate('multivision.WithdrawScreen', 'Withdraw');
                }}>
                  <View style={styles.dashboardButton}>
                    <Text style={styles.dashboardText}>Withdraw</Text>
                </View>
                </TouchableNativeFeedback>
                
            </Col>
            

            <Col style={{ flex: 1, justifyContent: 'space-evenly'}}>
                <TouchableNativeFeedback onPress={() => {
                  this.navigate('multivision.ManageCustomerScreen', 'Customers');
                }}>
                  <View style={styles.dashboardButton}>
                    <Text style={styles.dashboardText}>Customers</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => {
                  this.navigate('multivision.FundWalletScreen', 'Fund Wallet');
                }}>
                    <View style={styles.dashboardButton}>
                    <Text style={styles.dashboardText}>Fund Wallet</Text>
                  </View>
                </TouchableNativeFeedback>
                
            </Col>
            <Col style={{ flex: 1, justifyContent: 'space-evenly'}}>
                <TouchableNativeFeedback onPress={() => {
                  this.navigate('multivision.TransferFundsScreen', 'Transfer Funds');
                }}>
                    <View style={styles.dashboardButton}>
                      <Text style={styles.dashboardText}>Transfers</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => {
                  this.navigate('multivision.WithdrawScreen', 'Withdraw');
                }}>
                    <View style={styles.dashboardButton}>
                      <Text style={styles.dashboardText}>Withdraw</Text>
                    </View>
                </TouchableNativeFeedback>
                
            </Col>
           
          </Row>
        </Grid>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  dashboardText: {
    
    color: 'white',
    fontSize: 18
  },
  dashboardButton:{
    alignSelf: 'center', 
    // paddingHorizontal: 15, 
    // paddingVertical: 15, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#6B609A', 
    minHeight: hp('15%'),
    minWidth: wp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6B609A',
    ...Platform.select({
      android:{ 
        elevation: 10
      }, 
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
      }
    }),
   
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
)(Dashboard);
