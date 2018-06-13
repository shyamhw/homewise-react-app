import React, { Component } from 'react';
 import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  StackNavigator, TabNavigator
} from 'react-navigation';

import HomeScreen from './HomeScreen';
import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import AllClients from './AllClients';
import Steps from './Steps';
import NewClient from './NewClient'
import States from './States'

export const Clients = StackNavigator(
{
  AllClients: {
    screen: AllClients,
  },
  Steps:{
    screen: Steps
  },
  NewClient:{
    screen: NewClient
  }
});


export const Tabs = TabNavigator({
  Clients: {
    screen: Clients
  }
});

export const HomeNav = StackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
        },
        Login: {
            screen: Login,
        },
        Registration: {
            screen: Registration,
        },
        ForgotPassword:{
          screen: ForgotPassword
        }
    }
);
