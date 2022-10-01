import React from 'react';
import LogIn from '../screens/LogIn';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import SignUp from '../screens/SignUp';
import AnswerDoubt from '../screens/AnswerDoubt';
import Settings from '../screens/Settings';
import AnswerDetails from '../screens/AnswerDetails';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AnswerDoubt" component={AnswerDoubt} />
      <Stack.Screen name="AnswerDetails" component={AnswerDetails} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default MyStack;
