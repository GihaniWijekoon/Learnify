import React from "react";
import { Stack, Tabs } from "expo-router";
import { RootStackParamList } from "./Type";

const TabLayout = () => {
  return (
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="QuizPage" />
      </Stack>     
  );
};

export default TabLayout;
