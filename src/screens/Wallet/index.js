import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import {Container, Grid, Col, Row, Icon, List, ListItem} from 'native-base';
import * as appActions from '../../reducers/app/actions';
import { Navigation } from 'react-native-navigation';

import {sampleTransactions} from './transactions';


// this is a traditional React component connected to the redux store
class Wallet extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      transactions: [
        
      ],
      refreshing: false,
      update: false,
      searchValue: '',
      backupData: [],
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
    this.fetchTransactions();
  }

  componentDidAppear(){
   
   
  }

  navigate(route, text, transaction){
    Navigation.push(this.props.componentId, {
      component: {
        name: route,
        passProps: {
          text: 'Wallet',
          transaction: transaction
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

  fetchTransactions(){
    this.setState({refreshing: true});
    let transactions = [...sampleTransactions];

    transactions = this.sortTransactionsByDate(transactions);

    this.setState({transactions: transactions, backupData: [...transactions], update: !this.state.update, refreshing: false})
  }

  sortTransactionsByDate(transactions){
    return transactions.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  getDay(index, short){
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    if(short)
      return shortDays[index]
    else
      return days[index];
  }

  _renderEmptyItem = () =>{
    return (<View>
        <Text> No transactions available </Text>
      </View>);
  }

  renderTransactions = ({item}) => {
   
    return (<ListItem onPress={() => {
      this.navigate('multivision.TransactionScreen','Transaction', item)
    } }> 
      
        <Col style={{ flex: 1, height: 60}}> 
          <Row style={{paddingHorizontal: 5, paddingVertical: 2}}>
              <Text style={{fontSize: 17}}>
                {item.type === 'debit' ? 
                this.getName(item.receivedBy) : 
                this.getName(item.sentBy)}
                
              </Text>
            </Row>

            <Row style={{paddingHorizontal: 5}}>
                <Text style={{color: 'grey'}}>
                    {this.getDay(new Date(item.createdAt).getDay(), short = true)}
                    {'    |   '}
                    {new Date(item.createdAt).toLocaleTimeString()}
                    {'    |   '}
                    {item.type == 'debit'? 'Debit' : 'Credit'}
                  </Text>
            </Row>
         
        </Col>

        <Col style={{ height: 60, flex: .3, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>&#8358; {item.amount} </Text>
        </Col>
  </ListItem>);
  }
  getName(obj){
    const fullName = (obj.firstName ? obj.firstName : '') + ' ' +
    (obj.middleName ? obj.middleName : '') +  ' ' +
    (obj.lastName ? obj.lastName : '');
    return fullName;
  }

  render() {

    return (
      <Container>
       
        <Grid>
          <Row style={{backgroundColor: '#6B609A', flex: .7}}>
              <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', marginTop:30}}>
                      <Icon name='cash' style={{color: 'white', fontSize: 25}} />
                      <Text style={{fontSize: 60, color:'white'}}>&#8358; 230</Text>
                      <Text style={{fontSize: 20, color:'white'}}>Balance</Text>
                </View>
          </Row>
          <Row style={{flex: 1}}>
            <Col style={{ backgroundColor: 'white' }}>
            <FlatList
              data={sampleTransactions}
              extraData={this.state.update}
              onRefresh={() => { this.fetchTransactions();}}
              refreshing={this.state.refreshing}
              ListEmptyComponent={this._renderEmptyItem}
              renderItem={this.renderTransactions}
            />
              
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
)(Wallet);
