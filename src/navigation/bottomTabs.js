import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {spacing} from '../styles/spacing';
import {textScale} from '../styles/responsiveStyles';
import {navigationString} from './navigationString';
import Home from '../asset/SVG/Home';
import User from '../asset/SVG/User';
import * as Screen from '../screen/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home_solid from '../asset/SVG/Home-solid';
import User_soild from '../asset/SVG/User_soild';

const activeTabColor = '#000';
const inActiveTabColor = '#000';
const tabBarColor = '#000';

const Tab = createBottomTabNavigator();

const tabData = [
  {
    name: navigationString.Home_SCREEN,
    label: 'Home',
    icon: <Home />,
    focusedIcon: <Home_solid />,
    component: Screen.Home,
  },
  {
    name: navigationString.PROFILE_SCREEN,
    label: 'Profile',
    icon: <User />,
    focusedIcon: <User_soild />,
    component: Screen.Profile,
  },
];

function BottomTabs() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: activeTabColor,
            tabBarInactiveTintColor: inActiveTabColor,

            tabBarStyle: {
              backgroundColor: tabBarColor,
              paddingBottom: 0,
              height: spacing.HEIGHT_70,
            },

            headerShown: false,
          }}>
          {tabData.map((item, index) => {
            return (
              <Tab.Screen
                key={`bottomTabMain_${index.toString()}`}
                name={item.name}
                component={item.component}
                listeners={({navigation, route}) => ({})}
                options={{
                  tabBarLabel: item.label,
                  tabBarIcon: ({focused}) => {
                    const Icon = focused ? item.focusedIcon : item.icon;
                    return (
                      <>
                        <View style={[styles.iconContainerStyle]}>
                          <Text>{Icon}</Text>
                        </View>
                        <Text style={[styles.label]}>{item.label}</Text>
                      </>
                    );
                  },
                }}
              />
            );
          })}
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    fontSize: textScale(14),
    color: '#fff',
    opacity: 9,
    alignSelf: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
});

export default React.memo(BottomTabs);
