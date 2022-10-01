import * as React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      docID: '',
    };
  }

  updateDetails = async () => {
    try {
      db.collection('teachers').doc(this.state.docID).update({
        name: this.state.name,
      });
      Alert.alert('Profile Updated');
      alert('Profile updated');
    } catch (e) {
      console.log(e);
    }
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('LogIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserDetails = () => {
    var email = this.state.email;
    db.collection('teachers')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            email: data.email,
            name: data.name,
            docID: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/ProfileScreen.png')}>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 50 }}>
            <Icon
              style={{
                alignSelf: 'flex-start',
              }}
              name="arrow-left"
              type="feather"
              color="#fff"
              onPress={() => this.props.navigation.goBack()}></Icon>

            <Text style={styles.header}>Settings</Text>
          </View>

          <ScrollView
            style={{
              width: '100%',

              justifyContent: 'center',
            }}>
            <KeyboardAvoidingView>
              <Text style={styles.showInfo}>Email : {this.state.email}</Text>

              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.showInfo}>Name : </Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder={'Name of the Teacher '}
                    placeholderTextColor="#171580"
                    onChangeText={(text) => {
                      this.setState({
                        name: text,
                      });
                    }}
                    value={this.state.name}
                  />
                </View>

                <TouchableOpacity></TouchableOpacity>
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#eb3349', '#f45c43']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.updateButton}>
                  <TouchableOpacity
                    onPress={() => {
                      this.updateDetails();
                    }}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#171560', '#171565']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.updateButton}>
                  <TouchableOpacity
                    onPress={() => {
                      this.logout();
                    }}>
                    <Text style={styles.buttonText}>Log Out</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  updateButton: {
    width: '80%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  textinput: {
    marginTop: 10,
    marginBottom: 5,
    width: '80%',
    height: 40,
    borderColor: '#171580',
    borderWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    fontSize: 16,
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 18,
    color: 'white',
  },

  showInfo: {
    fontSize: 16,
    color: '#171580',

    marginTop: 10,
    textAlign: 'center',
  },
});
