import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import db from '../config';
import { Icon } from 'react-native-elements';

import firebase from 'firebase';
let categoryCodes = {
  Maths: ['#FF5F6DAA', '#FFC371AA'],

  Science: ['#11998EAA', '#38EF7DAA'],

  English: ['#662D8Caa', '#ED1E79AA'],

  SocialScience: ['#009245AA', '#FCEE21AA'],

  Hindi: ['#2E3192AA', '#1BFFFFAA'],

  Others: ['#D4145AAA', '#FBB03BAA'],
};
import { LinearGradient } from 'expo-linear-gradient';
export default class UnSolvedAnswers extends Component {
  constructor() {
    super();
    this.state = {
      teacherId: firebase.auth().currentUser.uid,
      teacherEmail: firebase.auth().currentUser.email,
      helps: [],
      name: '',
    };
  }

  getHelps = () => {
    db.collection('help')
      .where('teacherEmail', '==', this.state.teacherEmail)
      .onSnapshot((snapshot) => {
        var helps = [];
        snapshot.docs.map((doc) => {
          var helpDet = doc.data();
          console.log(helpDet);
          helpDet['doubtId'] = doc.id;
          helps.push(helpDet);
        });
        this.setState({
          helps: helps,
        });
      });
  };

  componentDidMount() {
    this.getHelps();
  }

  renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={categoryCodes[item.category]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.flatView}>
        <TouchableOpacity
          style={styles.flatListButton}
          onPress={() => {
            this.props.navigation.navigate('AnswerDetails', { details: item });
          }}>
          <View style={{ margin: 10, justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="title" type="MaterialIcons" color="#232268" />
              <Text style={styles.title}>{item.doubtTitle}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="person" type="MaterialIcons" color="#232268" />
              <Text style={styles.title}>{item.studentName}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  padding: 5,
                  backgroundColor: '#fffa',
                  borderRadius: 5,
                  margin: 5,
                }}>
                <Text>{item.category}</Text>
              </View>
              <View
                style={{
                  padding: 5,
                  backgroundColor: '#fffa',
                  borderRadius: 5,
                  margin: 5,
                }}>
                <Text>{item.doubtDate}</Text>
              </View>
            </View>
          </View>
          <Image
            source={{ uri: item.doubtImage }}
            style={{ margin: 10, height: 60, width: 60, borderRadius: 10 }}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {this.state.helps.length === 0 ? (
          <View>
            <Text style={styles.noText}>
              No Helps asked yet!{'\n'} You can start by adding helps!
            </Text>
            <Image
              style={{ width: 170, height: 170 }}
              source={require('../assets/DoubtNotFound.png')}
            />
          </View>
        ) : (
          <View style={{ marginTop: 5 }}>
            <FlatList
              data={this.state.helps}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#171560',
    margin: 5,
  },

  flatView: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    margin: 10,
  },
  noText: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'cursive',
  },
  flatListButton: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
  },
});
