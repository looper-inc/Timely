import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ProfileScreen } from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfile from '../screens/EditProfileScreen'

import{Button,Image ,TouchableOpacity, StyleSheet} from 'react-native';
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
                options={({ navigation }) => ({
                    headerTitle: 'Profile',
                    headerRight: ()=> (
                        <TouchableOpacity
                        onPress={()=> navigation.navigate('Settings')}
                        style={styles.style}
                        >
                        
                            <Image
                                source={require('../assets/images/cog.png')}
                                style={styles.cog}
                            />
                        </TouchableOpacity>
                    )
                  })}
            />
            <ProfileStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerTitle: 'Settings',
                }}
            />

            <ProfileStack.Screen
                name="Edit Profile"
                component={EditProfile}
                options={{
                    headerTitle: 'Edit Profile',
                }}
            />
        </ProfileStack.Navigator>
    );
}

const styles = StyleSheet.create({
    style:{
        alignContent:'center',
        justifyContent:'center',
    },

    cog: {
        width: 25,
        height: 25,
    },

})