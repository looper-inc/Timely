import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

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
            <ProfileStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerTitle: 'EditProfile',
                }}
            />
            <ProfileStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerTitle: 'Settings',
                }}
            />
        </ProfileStack.Navigator>
    );
}