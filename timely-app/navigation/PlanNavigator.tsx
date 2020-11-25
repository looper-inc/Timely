import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AddEvent from '../screens/AddEventScreen';

import PlanScreen from '../screens/PlanScreen';
import {
    PlanParamList
} from '../types';

const PlanStack = createStackNavigator<PlanParamList>();

export default function PlanNavigator() {
    return (
        <PlanStack.Navigator>
            <PlanStack.Screen
                name="PlanScreen"
                component={PlanScreen}
                options={{
                    headerTitle: 'Plan',
                }}
            />
            <PlanStack.Screen
                name="NewEvent"
                component={AddEvent}
                options={{
                    headerTitle: 'New Event',
                }}
            />
        </PlanStack.Navigator>
    );
}