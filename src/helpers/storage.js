import { AsyncStorage } from 'react-native';

export const retrieveItem = async key => {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      //alert(key, retrievedItem);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
}

export const storeItem = async (key, item) => {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

export const deleteItem = async (key) => {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.removeItem(key);
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

export const addToArray = async (key, item) => {
  let items = await retrieveItem(key);
  if(!items) {
    items = [];
  }
  items.push(item);
  await storeItem(key, items);
}

export const removeFromArray = async (key, itemId) => {
  let items = await retrieveItem(key);
  if(!items) {
    items = [];
  }
  else if(items.length > 0){
    items = items.filter((i) => i.id !== itemId);
  }
  await storeItem(key, items);
  return items;
}

export const updateTrainingItem = async (key, id) => {
  let items = await retrieveItem(key);
  if(!items) {
    return;
  }
  items = items.map( v=> v.id === id? {...v, status: 1}: v );
  storeItem(key, items);
}

export const updateUploadedItem = async (key, id) => {
  let items = await retrieveItem(key);
  if(!items) {
    return;
  }
  //items = items.map( v=> v.id === id? {...v, uploaded: 1}: v );
  items = items.map( v=> v.id === id ? {...v, uploaded: true}: v ); // .filter( v => v);
  storeItem(key, items);
}

export const setSession = async (item) => {
  let items = await retrieveItem("trainings");
  if(!items) {
    return;
  }
  items = items.map( v=> v.id === item.id? {...v, item}: v );
  storeItem("trainings", items);
}

export const addToObject = async (key, item, id) => {
  let items = await retrieveItem(key);
  if(!items) {
    items = {};
  }

  for(i in items) {
    if(i == id) {
      //return;
    }
  }
  if(!id) {
    return;
  }
  items[id] = item;
  storeItem(key, items);

  return items;
}


export const removeUploadedItem = async (key, id) => {
  let items = await retrieveItem(key);
  if(!items) {
    return;
  }
  //items = items.map( v=> v.id === id? {...v, uploaded: 1}: v );
  if(key === "pictures")
    items = items.filter( v => v.training === id && v.uploaded ? false : true);
  else 
    items = items.filter( v => v.training === id ? false : true); 

    await storeItem(key, items);
}