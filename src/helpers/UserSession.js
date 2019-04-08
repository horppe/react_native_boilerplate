import React from 'react';
import { AsyncStorage } from 'react-native';
function UserSession() {
  this.token = 'null';
  this.user = 'null';
}

UserSession.prototype.getAccessToken = () => {
  return this.token;
};

UserSession.prototype.getUser = () => {
  return this.user;
};

UserSession.prototype.updateUser = async update => {
  console.log(update);
  this.user = { ...this.user, ...update };
  await AsyncStorage.setItem(
    '@MulitiVision:user',
    JSON.stringify({ user: this.user, token: this.token })
  );

  //alert(JSON.stringify(getUser()));

};

UserSession.prototype.update = async () => {
    console.log("Updating User session");
   
    
    await AsyncStorage.setItem(
      '@MulitiVision:user',
      JSON.stringify({ user: this.user, token: this.token })
    );
  
   
    //alert(JSON.stringify(getUser()));
  
};

UserSession.prototype.startSession = (user, token) => {
  this.token = token;
  this.user = user;
  this.update();
  return Promise.resolve();
};

UserSession.prototype.closeSession = () => {
  this.token = this.user = null;
};

UserSession.prototype.check = () => {
  return typeof this.token !== 'undefined' && typeof this.user !== 'undefined';
};

export default new UserSession();
