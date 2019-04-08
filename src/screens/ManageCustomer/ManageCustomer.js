import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  // Text,
  View,
  Platform,
  StyleSheet,
  FlatList, Image, TextInput, Keyboard
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Button, Item, Body } from 'native-base';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import * as appActions from '../../reducers/app/actions';

import {sampleCustomers} from './customers';
// this is a traditional React component connected to the redux store



class ManageCustomer extends Component {
  state = {
    slider1ActiveSlide: 1,
  };

  // static options(passProps) {
  //   return {
  //     topBar: {
  //       rightButtons: {
  //         id: 'buttonOne',
  //         icon: require('icon.png')
  //       }
  //     }
  //   };
  // }


  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      refreshing: false,
      update: false,
      searchValue: '',
      backupData: [],
      topBarHeight: 0

    }
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

 async componentDidMount(){
    const constants = await Navigation.constants();
    
    this.setState({topBarHeight: constants.topBarHeight});
   this.fetchCustomers();
  }
  componentDidAppear(){
   
    
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

  fetchCustomers(){
    this.setState({customers: sampleCustomers, backupData: [...sampleCustomers]});
    return;
    fetch("customers url").then(function(res){
      res.json().then(function(customers){
          // setState with the customers
      })
    })
  }

  searchCustomersByName = () => {
    
    let value = this.state.searchValue;
   
    if(value === null || value === undefined || value === ''){
        return this.setState({customers:[...this.state.backupData], update: !this.state.update})
    }

        let customers = [...this.state.customers];
        
        if(customers.length > 0) {

            let cCustomers = customers.map( (customer) => {
                return {...customer};
            });

            
            // Filter by Name
            cCustomers = cCustomers.filter((cus) => {
                return (cus.firstName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                cus.middleName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                cus.lastName.toLowerCase().indexOf(value.toLowerCase()) !== -1
               )
            });
            
           

            // let resultCustomers = {};
            // if(tId.length > 0){
            //     tId.forEach( _customer => resultCustomers[_customer.id] = _customer)
            // }
            // if(cCustomers.length > 0){
            //     cCustomers.forEach( _customer => resultCustomers[_customer.id] = _customer)
            // }

            const searchResult = [];
            for(val of cCustomers){
                searchResult.push(val)
            }
            //alert(JSON.stringify(resultCustomers))
            // alert(searchResult.length)
            
            if(searchResult.length > 0){
                this.setState({customers: searchResult, update: !this.state.update, error: ''});
                Keyboard.dismiss();
            }
            else{
                this.setState({customers: searchResult, update: !this.state.update, error: `Customers with ${value} in their name were not found`, isLoading: false});
            }
        } else {
            this.setState({customers: [...this.state.backupData],update: !this.state.update, error: 'Customers not found', isLoading: false});
        }

  }

  renderRow({item, separators}){
    return (
      <Card>
        <CardItem>
          <Icon active name="md-person" />
          <Text>{`${item.firstName} ${item.middleName} ${item.lastName}`}</Text>
          <Right>
            <View style={{flexDirection:'row'}}>

              <Icon style={{marginLeft: 10, color: 'black'}} name="arrow-forward" />
              <Icon style={{marginLeft: 10, color: 'black'}} name="arrow-forward" />
              <Icon style={{marginLeft: 10, color: 'black'}} name="arrow-forward" />
              </View>
          </Right>
        </CardItem>
     </Card>
    );
  }

  _renderEmptyItem({item, separators}){
    return (
      <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                        
                                <Text>No customer found</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
    )
  }

  handleInput = (value) => {
    // alert(JSON.stringify(this.state.backupData));
        
    if(value === null || value === undefined || value === ''){
        return this.setState({customers:[...this.state.backupData], searchValue: '', update: !this.state.update})
    }

    this.setState((prevState) => {
      return {...prevState, searchValue: value};
    })
  }

  render() {
    return (
      <Container>
      <Header androidStatusBarColor="#6B609A" iosBarStyle="light-content" style={{display:'none'}}/>
      <Content>
      <Item style={{backgroundColor: '#6B609A', marginLeft:0, marginTop: this.state.topBarHeight}}>
            
            <TextInput
                onChangeText={this.handleInput}
                placeholder={"Search Customers"}
                ref={(input) => {this._input = input}}
                style={{color:'#fff', paddingLeft: 15, flex: 1}}
                placeholderTextColor='#fff'
                value={this.state.searchValue}
                onSubmitEditing={() => { this._input.blur(); this.searchCustomersByName();}}
            />
           
            
            <Button 
            transparent
            style={{alignSelf:'center'}}
            onPress={() => {this.searchCustomersByName();}}>

              <Icon name="search" style={{color: "white"}}/>
            </Button>
            <Button 
            transparent
            style={{alignSelf:'center'}}
            onPress={() => {this._input.clear(); Keyboard.dismiss();this.fetchCustomers();}}>

              <Icon name="md-refresh" style={{color: "white"}}/>
            </Button>

        </Item>
      <FlatList
            
            data={this.state.customers}
            extraData={this.state.update}
            onRefresh={() => { Keyboard.dismiss(); this.fetchCustomers();}}
            refreshing={this.state.refreshing}

            ListEmptyComponent={this._renderEmptyItem}
            renderItem={this.renderRow}
            />
      </Content>
    </Container>
     
      
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
  container: {
    backgroundColor: '#3c0e65',
    ...Platform.select({
      ios: {
        paddingTop: 64,
      },
    }),
  },
  progressBar: {
    backgroundColor: '#3c0e65',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeading: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 30,
  },
  listHeadingLeft: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  listHeadingRight: {
    color: 'white',
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
  browseList: {
    marginTop: 30,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        marginBottom: 60,
      },
      android: {
        marginBottom: 30,
      },
    }),
  },
  browseListItem: {
    ...Platform.select({
      ios: {
        paddingVertical: 8,
      },
      android: {
        paddingVertical: 10,
      },
    }),
    flexDirection: 'row',
  },
  browseListItemText: {
    flex: 1,
    color: 'white',
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        fontSize: 15,
        fontWeight: '500',
      },
      android: {
        fontSize: 16,
        fontWeight: '100',
      },
    }),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCustomer);
