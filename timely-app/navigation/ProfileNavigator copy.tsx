import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ProfileScreen } from '../screens/ProfileScreen';

import {
    ProfileParamList
} from '../types';

const ProfileStack = createStackNavigator<ProfileParamList>();

export default function ProfileNavigator() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTitle: 'Profile',
                }}
            />
        </ProfileStack.Navigator>
    );
}