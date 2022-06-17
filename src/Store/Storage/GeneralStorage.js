import AsyncSorage from '@react-native-async-storage/async-storage';

// SET ALL DATA in  AsyncSorage (memoir app / cache)


//  SET FIRSETIME VALUE in AsyncSorage
const setFirstTimeUse = () => {
  return AsyncSorage.setItem('isFirstTimeUse', 'true');
};

//GET AsyncSorage 

const getFirstTimeUse = () => {
  return AsyncSorage.getItem('isFirstTimeUse');
};


const setLang = lang => {
  return AsyncSorage.setItem('language', lang);
};

const getLang = () => {
  return AsyncSorage.getItem('language');
};
const setUid = uid => {
  return AsyncSorage.setItem('UID', uid);
};

const getUid = () => {
  return AsyncSorage.getItem('UID');
};

export default {
  setFirstTimeUse,
  getFirstTimeUse,
  setLang,
  getLang,
  getUid,
  setUid,
};
