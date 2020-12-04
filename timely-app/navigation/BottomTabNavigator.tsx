import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
  BottomTabParamList,
} from '../types';
import FeedNavigator from './FeedNavigator';
import FriendsNavigator from './FriendsNavigator';
import PlanNavigator from './PlanNavigator';
import ProfileNavigator from './ProfileNavigator';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Plan"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
      }}
      screenOptions={{
        tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
      }}
    >
      <BottomTab.Screen
        name="Friends"
        component={FriendsNavigator}
      />
      <BottomTab.Screen
        name="Feed"
        component={FeedNavigator}
      />
      <BottomTab.Screen
        name="Plan"
        component={PlanNavigator}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
      />
    </BottomTab.Navigator>
  );
}
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}