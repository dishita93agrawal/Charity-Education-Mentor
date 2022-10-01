import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import SolvedAnswers from './SolvedAnswers';
import UnSolvedAnswers from './UnSolvedAnswers';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      teacherId: firebase.auth().currentUser.uid,
      doubts: [],
      category: '',
      details: '',
      doubtTitle: '',
    };
  }
  getDoubts = () => {
    if (this.state.category.length !== 0) {
      db.collection('doubts')
        .where('category', '==', this.state.category)
        .where('doubtStatus', '==', 'pending')
        .onSnapshot((snapshot) => {
          var doubtTitles = [];
          snapshot.docs.map((doc) => {
            var doubtTitle = doc.data();

            doubtTitles['questionId'] = doc.id;
            doubtTitles.push(doubtTitle);
          });
          this.setState({
            doubtTitle: doubtTitles,
          });
        });
    } else {
      db.collection('doubts')
        .where('doubtStatus', '==', 'pending')
        .onSnapshot((snapshot) => {
          var doubts = [];
          snapshot.docs.map((doc) => {
            var doubt = doc.data();

            doubt['questionId'] = doc.id;
            doubts.push(doubt);
          });
          this.setState({
            doubts: doubts,
          });
        });
    }
  };
  componentDidMount() {
    // We will get all students from database for the currently logged in teacher in componentDidMount

    this.getDoubts();
  }
  componentDidUpdate() {
    this.getDoubts();
  }

  renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.flatView}>
        <TouchableOpacity
          style={styles.flatListButton}
          onPress={() => {
            this.props.navigation.navigate('AnswerDoubt', { details: item });
          }}>
          <View style={{ margin: 10, justifyContent: 'center', width: 110 }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ flex: 1, resizeMode: 'cover' }}
          source={require('../assets/HomeBg.png')}>
          <View style={{ flexDirection: 'row', marginTop: 50, marginLeft: 20 }}>
            <Icon
              style={{
                alignSelf: 'flex-start',
              }}
              name="user"
              type="feather"
              color="#171560"
              onPress={() => this.props.navigation.navigate('Settings')}></Icon>
            <Text style={styles.header}>Hi Mentor !!</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: '90%',
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                alert('This feature is coming soon!');
              }}>
              <FontAwesome name="search" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              style={{
                height: 40,
                width: '85%',
                paddingLeft: 20,
              }}
              placeholder="Search Answers"
            />
          </View>
          <TopTab />
        </ImageBackground>
      </View>
    );
  }
}
const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#171580',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: {
          padding: 10,
          height: 50,
          backgroundColor: '#FF894F',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          justifyContent: 'center',
          margin: 10,
        },
        tabBarIndicatorStyle: {
          backgroundColor: null,
        },
      }}>
      <Tab.Screen name="UnSolved" component={UnSolvedAnswers} />
      <Tab.Screen name="Solved" component={SolvedAnswers} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flatView: {
    borderRadius: 10,
    flexDirection: 'row',
    width: '95%',
    margin: 10,
    padding: 5,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#171560',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  header: {
    fontSize: 18,
    color: '#171560',
    marginTop: 50,
    marginBottom: 50,
    fontWeight:'bold'
  },

  flatListButton: {
    flexDirection: 'row',
    width: '95%',
  },
});
