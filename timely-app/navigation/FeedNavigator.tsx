import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {
    FeedParamList
} from '../types';

const FeedStack = createStackNavigator<FeedParamList>();

export default function FeedNavigator() {
    return (
        <FeedStack.Navigator>
            {/*<FeedStack.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    headerTitle: 'Feed',
                }}
            />*/}
        </FeedStack.Navigator>
    );
}