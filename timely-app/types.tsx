export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  Plan: undefined;
  Profile: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type PlanParamList = {
  PlanScreen: { selected: string };
  NewEvent: undefined;
};

export type ProfileParamList = {
  Profile: {
    uid: string
  },
  Settings: undefined,
};
export type PlanSelectParamList = {
  Events: undefined;
  Goals: undefined;
};

export type FeedSelectParamList = {
  Following: undefined;
  Notifications: undefined;
}
