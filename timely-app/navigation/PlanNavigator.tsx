import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import NewEventButton from '../components/PlanScreen/NewEventButton';
import NewEvent from '../screens/NewEventScreen';

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
                initialParams={{ selected: 'events' }}
            />
            <PlanStack.Screen
                name="NewEvent"
                component={NewEvent}
                options={{
                    headerTitle: 'New Event',
                }}
            />
        </PlanStack.Navigator>
    );
}