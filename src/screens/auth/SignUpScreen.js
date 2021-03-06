import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../../reducers/app/actions';
import { Navigation } from 'react-native-navigation';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import MountainBackground from '../../components/MountainBackground';
// this is a traditional React component connected to the redux store


class SignUpScreen extends Component {

  constructor(){
    super();
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      cpassword: '',
    }
  }

  signUp(){
    
  }

  updateUserInfo = (update) => {
    this.setState({...this.state, ...update})
  }


  render() {
    let isLoading = false;
    let user = {};
   
    return (
      <MountainBackground>
        <View style={{ marginTop: 80 }}>
          <View style={styles.inputWrapper}>
            <CustomTextInput
              placeholder={'First Name'}
              value={user.firstName}
              onChangeText={firstName => this.updateUserInfo({ firstName })}
              ref={ref => (this.firstNameInputRef = ref)}
              onSubmitEditing={() => this.lastNameInputRef.focus()}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              placeholder={'Last Name'}
              value={user.lastName}
              onChangeText={lastName => this.updateUserInfo({ lastName })}
              ref={ref => (this.lastNameInputRef = ref)}
              onSubmitEditing={() => this.phoneInputRef.focus()}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              keyboardType={'phone-pad'}
              placeholder={'Phone Number'}
              value={user.phone}
              onChangeText={phone => this.updateUserInfo({ phone })}
              ref={ref => (this.phoneInputRef = ref)}
              onSubmitEditing={() => this.emailInputRef.focus()}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              keyboardType={'email-address'}
              placeholder={'Email Address'}
              value={user.email}
              onChangeText={email => this.updateUserInfo({ email })}
              ref={ref => (this.emailInputRef = ref)}
              onSubmitEditing={() => this.genderInputRef.focus()}
              editable={!isLoading}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              name={'password'}
              placeholder={'Choose password'}
              editable={!isLoading}
              returnKeyType={'next'}
              secureTextEntry={true}
              withRef={true}
              ref={ref => (this.passwordInputRef = ref)}
              value={user.password}
              onChangeText={password => this.updateUserInfo({ password })}
              isEnabled={!isLoading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              name={'cpassword'}
              placeholder={'Confirm chosen Password'}
              editable={!isLoading}
              returnKeyType={'done'}
              secureTextEntry={true}
              withRef={true}
              ref={ref => (this.cpasswordInputRef = ref)}
              value={user.cpassword}
              onChangeText={cpassword => this.updateUserInfo({ cpassword })}
              isEnabled={!isLoading}
            />
          </View>
          <CustomButton
            colors={['#FAFAFA', '#FFFFFF']}
            text={'PROCEED'}
            onPress={() => { 
              this.signUp();
            }}
            buttonStyle={{}}
            textStyle={{ color: '#3c0e65' }}
          />
        </View>
      </MountainBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'blue',
  },
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

export default connect(mapStateToProps)(SignUpScreen);
