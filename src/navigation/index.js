import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack.js';
import AuthStack from './AuthStack.js';
import 'react-native-url-polyfill/auto'
import { supabase } from '../supabase.js';

const AppStack = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {session && session.user? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default AppStack;
