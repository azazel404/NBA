import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Logo from '../helpers/Logo';

//Screens
import Auth from '../screens/auth';
import Games from '../screens/games';
import GameArticle from '../screens/games/Games';
import News from '../screens/news';
import Article from '../screens/news/Article';

//styling global untuk stacknavigator header
const headerStyleGlobalConf = {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1d428a'
    },
    headerTintCOlor: 'white',
    headerTitle: Logo
  }
};

/// untuk nambah header di news component
const NewsStack = createStackNavigator(
  {
    News: News,
    Article: Article // untuk detail news
  },
  headerStyleGlobalConf
);

//untuk nambah header di games component
const GamesStack = createStackNavigator(
  {
    Games: Games,
    GameArticle: GameArticle // untuk detail game 
  },
  headerStyleGlobalConf
);

//bottom navigation
const AppStack = createBottomTabNavigator(
  {
    News: NewsStack, //stack route semua news
    Games: GamesStack // stack route semua game
  },
  {
    //styling style tab bar bottom navigator
    tabBarOptions: {
      activeTintColor: '#fff',
      showLabel: false,
      activeBackgroundColor: '#00194b',
      inactiveBackgroundColor: '#001338',
      style: {
        backgroundColor: '#001338'
      }
    },
    //styling dan penambahan icon di navigations bottom
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case 'News':
            iconName = `ios-basketball`;
            break;
          case 'Games':
            iconName = `md-tv`;
            break;
          default:
            return null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

//routing first apps navigation SignIn
const AuthStack = createStackNavigator(
  {
    SignIn: Auth
  },
  {
    headerMode: 'none'
  }
);

export const RootNavigator = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack
      },
      {
        initialRouteName: 'Auth'
      }
    )
  );
};
