import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform, Text
} from 'react-native';
import { connect } from 'react-redux';
import {Container, Grid, Col, Row, Card, CardItem,Body, Right, Left, Icon, Content } from 'native-base';
import * as appActions from '../../reducers/app/actions';
import { Navigation } from 'react-native-navigation';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



// this is a traditional React component connected to the redux store
class Transaction extends Component {
  
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
    // alert(JSON.stringify(this.props))
  }

  componentDidAppear(){
   
   
  }

  navigate(route, text){
    Navigation.push(this.props.componentId, {
      component: {
        name: route,
        passProps: {
          text: 'Wallet',
          
        },
        options: {
          topBar: {
            title: {
              text: text,
            },
          },
        },
      },
    }); 
  }

  getName(obj){
    const fullName = (obj.firstName ? obj.firstName : '') + ' ' +
    (obj.middleName ? obj.middleName : '') +  ' ' +
    (obj.lastName ? obj.lastName : '');
    return fullName;
  }

  getDay(index, short){
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if(short)
      return shortDays[index]
    else
      return days[index];
  }


  render() {
    const {transaction} = this.props;
    return (
      <Container>
       
        <Grid>
          <Row style={{backgroundColor: '#6B609A', flex: .6}}>
              <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', marginTop:30}}>
                      <Text></Text>
                      <Text style={{fontSize: 60, color:'#fff'}}>&#8358; {this.props.transaction.amount}</Text>
                      <Text style={{fontSize: 20, color:'#fff'}}>{transaction.type == 'credit'? 'Credit' : 'Debit'}</Text>
                </View>
          </Row>
          <Row style={{}}>
            <View>
            <Card style={{width: wp('100%'), height: hp('10%')}}>
                    <CardItem style={{flex: 1}}>
                        
                            <Icon active type='FontAwesome5' name="info" style={{fontSize: 13}} />
                       
                        <Content>
                            <View style={{}} >
                          
                                <Text style={{fontSize: 16}}>
                                    {
                                            transaction.type === 'debit' ? 
                                            "Receiver's ID:   " : 
                                            "Sender's ID:   "
                                    }
                                    {
                                        transaction.type === 'debit' ? 
                                       transaction.receivedBy.id : 
                                        transaction.sentBy.id
                                    }
                                </Text>
                            </View>
                        </Content>
                       
                    </CardItem>
                    
                </Card>
                
            <Card style={{width: wp('100%'), height: hp('10%')}}>
                    <CardItem style={{flex: 1}}>
                        
                            <Icon active type='FontAwesome5' name="info" style={{fontSize: 13}} />
                       
                        <Content>
                            <View style={{}} >
                          
                                <Text style={{fontSize: 16}}>
                                    {
                                            transaction.type === 'debit' ? 
                                            "Receiver's name:   " : 
                                            "Sender's name:   "
                                    }
                                    {
                                        transaction.type === 'debit' ? 
                                        this.getName(transaction.receivedBy) : 
                                        this.getName(transaction.sentBy)
                                    }
                                </Text>
                            </View>
                        </Content>
                       
                    </CardItem>
                    
                </Card>
           
                <Card style={{width: wp('100%'), height: hp('10%')}}>
                    <CardItem style={{flex: 1}}>
                        
                            <Icon active type='FontAwesome5' name="info" style={{fontSize: 13}} />
                       
                        <Content>
                            <View style={{}} >
                          
                                <Text style={{fontSize: 16}}>
                                    {
                                           "Transaction amount:    "
                                    }
                                    &#8358;
                                    {
                                        transaction.amount
                                    }
                                </Text>
                            </View>
                        </Content>
                       
                    </CardItem>
                    
                </Card>

                <Card style={{width: wp('100%'), height: hp('10%')}}>
                    <CardItem style={{flex: 1}}>
                        
                            <Icon active type='FontAwesome5' name="info" style={{fontSize: 13}} />
                       
                        <Content>
                            <View style={{}} >
                          
                                <Text style={{fontSize: 16}}>
                                    {'Transaction Date:   '}
                                    {
                                       //this.getDay(new Date(transaction.createdAt).getDay(), short = true)
                                       //+ " " + 
                                       new Date(transaction.createdAt).toGMTString()
                                    }
                                </Text>
                            </View>
                        </Content>
                       
                    </CardItem>
                    
                </Card>
            </View>
            
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
)(Transaction);
