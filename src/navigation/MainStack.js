import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { navigationString } from './navigationString';
import bottomTabs from './bottomTabs';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen
          name={navigationString.BOTTOM_TAB}
          component={bottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
