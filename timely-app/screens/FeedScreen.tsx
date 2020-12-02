import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SelectFeed from './FeedScreen/SelectFeed'
import { createStackNavigator } from '@react-navigation/stack';
import { FeedSelectParamList } from '../types';
import NewEventButton from './PlanScreen/NewEventButton';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FollowingFeedScreen from './FollowingFeedScreen'
import NotificationsFeedScreen from './NotificationsFeedScreen'

function Following() {
    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}

const FeedSelectStack = createStackNavigator<FeedSelectParamList>();
const Tab = createBottomTabNavigator();


export default class FeedScreen extends React.Component<{ route: any, navigation: any }, { selected: string }> {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'Following'
    }
    props.navigation.setOptions({
      headerRight: () => {
        return <NewEventButton
          selected={this.state.selected}
          {...props}
        />
      }
    })
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(selected) {
    this.setState({ selected }, () => {
      this.props.navigation.navigate(selected)
    })
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <SelectFeed onSelect={this.handleSelect} />
            <FeedSelectStack.Navigator>
                <FeedSelectStack.Screen 
                    name="Following"
                    component={FollowingFeedScreen}
                />
                <FeedSelectStack.Screen 
                    name="Notifications"
                    component={NotificationsFeedScreen}
                />
            </FeedSelectStack.Navigator>
        </SafeAreaView>
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