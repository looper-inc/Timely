<<<<<<< HEAD
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {
    FriendsParamList
} from '../types';
=======
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import FriendsScreen from "../screens/FriendsScreen";
import { FriendsParamList } from "../types";
>>>>>>> fd18

const FriendsStack = createStackNavigator<FriendsParamList>();

export default function FriendsNavigator() {
<<<<<<< HEAD
    return (
        <FriendsStack.Navigator>
            {/*<FriendsStack.Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    headerTitle: 'Friends',
                }}
            />*/}
        </FriendsStack.Navigator>
    );
}
=======
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          headerTitle: "Friends"
        }}
      />
    </FriendsStack.Navigator>
  );
}
>>>>>>> fd18
