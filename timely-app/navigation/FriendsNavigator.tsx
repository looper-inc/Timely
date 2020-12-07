import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {
    FriendsParamList
} from '../types';

const FriendsStack = createStackNavigator<FriendsParamList>();

export default function FriendsNavigator() {
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