import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import SelectPlan from '../components/PlanScreen/SelectPlan';
import EventsScreen from './EventsScreen';
import GoalsScreen from './GoalsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  PlanSelectParamList
} from '../types';
import NewEventButton from '../components/PlanScreen/NewEventButton';

const PlanSelectStack = createStackNavigator<PlanSelectParamList>();


export default class PlanScreen extends React.Component<{ route: any, navigation: any }, {}> {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <SelectPlan onSelect={selected => {
          this.props.navigation.navigate(selected)
        }} />
        <PlanSelectStack.Navigator>
          <PlanSelectStack.Screen
            name="Events"
            component={EventsScreen}
            options={{
              headerTitle: 'Plan',
              headerRight: NewEventButton
            }}
          />
          <PlanSelectStack.Screen
            name="Goals"
            component={GoalsScreen}
          />
        </PlanSelectStack.Navigator>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
