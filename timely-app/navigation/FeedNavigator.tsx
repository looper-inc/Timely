import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import FeedScreen from "../screens/FeedScreen";
import { PlanParamList } from "../types";

const FeedStack = createStackNavigator<PlanParamList>();

export default function FeedNavigator() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          headerTitle: "Feed"
        }}
      />
    </FeedStack.Navigator>
  );
}
