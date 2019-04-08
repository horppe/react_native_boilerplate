import React, { Component } from 'react';
import { Image, ImageBackground, View, ScrollView, Text, StyleSheet } from 'react-native';
import {Icon} from 'native-base'


const tlikesLogo = require('../../img/logo.png');
const grid = require('../../img/ngrid.png');
// <Image resizeMode={'contain'} style={{ height: 100, width: 150 }} source={tlikesLogo} />

export default class ExampleComponent extends Component {
  render() {
    return (
      <View
        imageStyle={{ resizeMode: 'cover' }}
        style={{
          flex: 1,
          width: null,
          alignSelf: 'stretch',
          backgroundColor: 'indigo'
        }}
        source={grid}>
        <ScrollView>
          <View style={{ flex: 1, padding: 20 }}>
            <View
              style={{
                marginTop: 50,
                alignSelf: 'center',
                
              }}>
            <Icon type="FontAwesome5" name="wallet" style={styles.icon} />
            </View>
            <View>
            <Text style={styles.iconText}> Lati Kash </Text>
            </View>
            {this.props.children}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconText: {
    fontSize: 20,
    alignSelf:'center',
    color: 'white'
  },
  icon: {
    fontSize: 100,
    color: 'white',
    
  }
})