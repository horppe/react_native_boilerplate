import React, {Component} from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
  } from 'native-base';
  import LinearGradient from 'react-native-linear-gradient';
  import { deleteItem } from '../../helpers/storage';

  import styles from './style';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const routes = [
    
    {
        name: 'Dashboard',
        route: 'multivision.DashboardScreen',
        icon: 'home',
    },
    {
      name: 'Wallet',
      route: 'multivision.WalletScreen',
      icon: 'list',
    },
    {
      name: 'Fund Wallet',
      route: 'multivision.FundWalletScreen',
      icon: 'home',
    },
    
    {
        name: 'Withdraw',
        route: 'multivision.WithdrawScreen',
        icon: 'home',
    },
    
    {
        name: 'Manage Customers',
        route: 'multivision.ManageCustomerScreen',
        icon: 'home',
    },
    {
        name: 'Transfer Funds',
        route: 'multivision.TransferFundsScreen',
        icon: 'list',
    },
    
  ];


class SideBar extends Component {

    constructor(){
      super()
    //  this.sideDrawerVisible = false;
    }
    logOut = async () => {
      await deleteItem('uid'); 
    //  this.props.navigation.navigate('Login');
    } 

    //
    componentDidMount = () => {
      // Leave this code block the way you met it. It is a fix for the Sidebar.
      // this.navigationEventListener = Navigation.events().bindComponent(this);
      // Navigation.events().registerComponentDidDisappearListener(({ componentId }) => {
      //   if (componentId === this.props.componentId) {
      //     this.sideDrawerVisible = false;
      //   }
      //   this.updateNavigationState();
      // });

      // end of fix code block

    }
    componentWillUnmount(){
     // this.navigationEventListener.remove();
    }

    // updateNavigationState(){
    //   Navigation.mergeOptions(this.props.componentId, {
    //     sideMenu: {
    //       left: {
    //         visible: this.sideDrawerVisible
    //       }
    //     }
    //   });
    // }
    
    promptLogout(navigation){
        
        Alert.alert(
        'Confirm Log out',
        'Are you sure want to Log out?',
        [
            {text: 'No', onPress: () => {}},
            {text: 'Yes', onPress: () => {  }}
        ]
        );
    }

    navigate = (data) => {
      // this.sideDrawerVisible = false;
      // this.updateNavigationState();
      
      Navigation.push('Dashboard', {
        component: {
          name: data.route,
          passProps: {
            text: 'Pushed screen',
            
          },
          options: {
            topBar: {
              visible: true,
              drawBehind: true,
              background: {
                color: '#6B609A',
              },
              title: {
                color: 'white',
                text: data.name,
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
            // topBar: {
            //   title: {
            //     text: data.name,
            //   },
            // },
          },
        },
      });
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: false,
          },
        },
      });
    }

    render = () => {
      return (
    <Container>
      <LinearGradient style={{flex:1}} colors={['#6B609A', '#6B609A','#6B609A']}>

        <Content bounces={false} style={{flex:1}} >
          
            {/* <Image source={frankinatorImage} style={styles.drawerCover} resizeMode='contain'/> */}
            <View style={{padding: 20}}>
           
            <View
              style={{
                backgroundColor: 'transparent', 
                alignSelf: 'center', 
                padding: 30, 
                borderRadius: 500, height: 200, width: wp('100%') , justifyContent: 'center'
                }}
            >
              <View style={{
                    
                    alignItems:'center'
                  }}>
                  <Icon name="paper" style={{fontSize: 130, color:'white'}} />
                  <Text style={{color: 'white'}}>Lati Kash</Text> 
              </View>
            </View>

           
        </View>


        
            <Text style={{ alignSelf: 'center', color: '#fff' }} />
            <List
               
              dataArray={routes}
              renderRow={data => (
                <ListItem
                  button
                  noBorder
                  onPress={() => this.navigate(data)}>
                  <Left>
                   
                      <Icon
                        active
                        name={data.icon}
                        style={{ color: '#fff', fontSize: 26, width: 30 }}
                      />
                      
                    <Text style={styles.text}>{data.name}</Text>
                  </Left>
                  {data.types && (
                    <Right style={{ flex: 1 }}>
                      <Badge
                        style={{
                          borderRadius: 3,
                          height: 25,
                          width: 72,
                          backgroundColor: data.bg,
                        }}>
                        <Text style={styles.badgeText}>{`${
                          data.types
                        } Types`}</Text>
                      </Badge>
                    </Right>
                  )}
                </ListItem>
              )}
            />
            
          
        </Content>
        <TouchableOpacity
              onPress={() => this.promptLogout(this.props.navigation)}
              style={{ padding:20}}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                {' '}
                Log out
              </Text>
            </TouchableOpacity>
    </LinearGradient>
</Container>
      );
    }
}



export default connect()(SideBar);