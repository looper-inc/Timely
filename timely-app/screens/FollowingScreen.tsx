import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
//import SelectPlan from "./PlanScreen/SelectPlan";
import FollowingEventsScreen from "./FollowingFeedScreen";
import FollowingGoalsScreen from "./FollowingGoalScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { ContentSelectParamList } from "../types";
import NewEventButton from "./PlanScreen/NewEventButton";

const ContentSelectStack = createStackNavigator<ContentSelectParamList>();

export default class FeedScreen extends React.Component<
  { route: any; navigation: any },
  { selected: string }
> {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Event"
    };
    props.navigation.setOptions({
      headerRight: () => {
        return <NewEventButton selected={this.state.selected} {...props} />;
      }
    });
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selected) {
    this.setState({ selected }, () => {
      this.props.navigation.navigate(selected);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <SelectPlan onSelect={this.handleSelect} /> */}
        <ContentSelectStack.Navigator>
          <ContentSelectStack.Screen name="Event" component={FollowingEventsScreen} />
          <ContentSelectStack.Screen name="Goal" component={FollowingGoalsScreen} />
        </ContentSelectStack.Navigator>
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
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});