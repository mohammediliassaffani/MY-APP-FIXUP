import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {
  HomeScreen,
  SplashScreen,
  ServicesScreen,
  FormScreen,
  SendScreen,
  LogInScreen,
  SingUpScreen,
  SettingScreen,
  UserInfo,
  Camera,
} from '../screens';
// import GeneralAction from '../Store/Actions/GeneralAction';

const Stack = createNativeStackNavigator();
export default function index() {
  const [isLoading, setIsLoading] = useState(true);

  //Stack for handling display splash screen 
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return;
  }, []);

  const {isFirstTimeUse, uid} = useSelector(state => state.Language);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

        {/* loding page */}
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} /> // Stack for handling display splash screen 
        ) : (

          // if first time display this screen
          <>
            {isFirstTimeUse ? (
              <Stack.Screen name="Home" component={HomeScreen} />

              // if not first time show this
            ) : (
              <Stack.Screen name="Services" component={ServicesScreen} />
            )}
            <Stack.Screen name="Form" component={FormScreen} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="Send" component={SendScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            
            {/* if Unique Id dos not  existed show this */}

            
            {uid === '' ? (
              <>
                <Stack.Screen name="Login" component={LogInScreen} />
                <Stack.Screen name="SingUp" component={SingUpScreen} />
              </>

              // if U ID existed SHOW THIS
            ) : (
              <>
                <Stack.Screen name="SingUp" component={UserInfo} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
