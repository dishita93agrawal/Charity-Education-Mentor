import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import {  Icon, Avatar , Card } from 'react-native-elements';
import {  SafeAreaProvider } from 'react-native-safe-area-context';

import {
  MaterialIcons,
} from '@expo/vector-icons';
import Modal from 'react-native-modal';
export default class AnswerDoubt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      category: this.props.route.params.details['category'],
      teacherId: firebase.auth().currentUser.uid,
      doubtTitle: this.props.route.params.details['title'],
      doubtDescription: this.props.route.params.details['doubt'],
      doubtImage: this.props.route.params.details['image'],
      doubtStatus: this.props.route.params.details['doubtStatus'],
      doubtDate: this.props.route.params.details['date'],
      help: '',
      doubtId: this.props.route.params.details['doubtId'],
      studentId: this.props.route.params.details['studentId'],
      studentEmail: this.props.route.params.details['studentEmail'],
      studentName:this.props.route.params.details["studentName"],
      teacherName: '',
      loading: false,
      modalVisible: false,
      isImageModalVisible:false,
     
    };
  }
   
  componentDidMount() {
    this.getTeacherDetails();
  }
  getTeacherDetails() {
    db.collection('teachers')
      .where('email', '==', this.state.emailId)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length !== 0) {
          snapshot.docs.map((doc) => {
            var teacherDet = doc.data();
            this.setState({ teacherName: teacherDet.name });
          });
        }
      });
  }
  answerDoubt = () => {
    console.log(this.state.help);
    if (this.state.help == '') {
      alert('Enter all the fields');
      Alert.alert('Enter all the fields');
    } else {
      db.collection('help').add({
        category: this.state.category,

        doubtTitle: this.state.doubtTitle,
        doubtDescription: this.state.doubtDescription,
        doubtImage: this.state.doubtImage,
        doubtStatus: this.state.doubtStatus,
        doubtDate: this.state.doubtDate,

        studentEmail: this.state.studentEmail,
        doubtId: this.state.doubtId,
        help: this.state.help,
        teacherId: this.state.teacherId,
        studentId: this.state.studentId,
        teacherEmail: this.state.emailId,
        teacherName: this.state.teacherName,
        studentName:this.state.studentName
      });
      alert('Doubt Answered');
      Alert.alert('Doubt Answered');
      this.props.navigation.navigate('Home');
    }
  };
 showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.isImageModalVisible}
        backDropOpacity={0.4}>
        <View>
          <Card
            containerStyle={{
              width: 200,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Avatar source={{ uri: this.state.doubtImage }} size={'large'} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isImageModalVisible: false });
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 15,
                  fontSize: 16,
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/AnswerDoubtScreen.png')}>
           {this.showModal()}
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginTop: 50,
              }}>
              <Icon
                style={{ alignSelf: 'flex-start' }}
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() =>
                  this.state.loading ? null : this.props.navigation.goBack()
                }></Icon>

              <Text style={[styles.answerText,{color:"white", fontWeight:"bold"}]}>Answer {'\n'} Doubt</Text>
            </View>
            <View>
              <Modal
                style={styles.modalView}
                isVisible={this.state.modalVisible}
                backdropOpacity={0.4}
                deviceWidth={Dimensions.get('window').width}
                deviceHeight={Dimensions.get('window').height}
                onBackdropPress={() => this.setState({ modalVisible: false })}>
                <View style={styles.modalMainView}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: -13,
                      right: -10,
                      margin: 10,
                      padding: 10,
                    }}
                    onPress={() => this.setState({ modalVisible: false })}>
                    <MaterialIcons
                      name="cancel"
                      size={24}
                      color="#2460a7ff"
                      onPress={() => this.setState({ modalVisible: false })}
                    />
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
           
            <View
              style={{
                marginTop: 70,
                width: '95%',
                marginHorizontal: 10,
                borderRadius: 10,
                backgroundColor: '#78B0E1aa',
                justifyContent: 'center',
                padding: 10,
              }}>
            
         
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text style={styles.doubtdetail}>Attachment</Text>

                <Icon name="attachment" type="MaterialIcons" color="#171560" />
                <Avatar
                  source={{ uri: this.state.doubtImage }}
                  style={{
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    margin: 10,
                  }}
                  onPress={() => {
                    this.setState({ isImageModalVisible: true });
                  }}
                />
              </View>
                <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name="title" type="MaterialIcons" color="#232268" />
                <Text
                  style={[
                    styles.doubtdetail,
                    { fontWeight: 'bold', marginLeft: 20 },
                  ]}>
                  {this.state.doubtTitle}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name="chevron-right" type="entypo" color="#171560" />
                <Text style={styles.doubtdetail}>
                  {this.state.doubtDescription}
                </Text>
              </View>
              <Text
                style={{
                  color: '#171560',
                  marginTop: 10,
                  fontSize: 16,
                }}>
                Doubt Status : {this.state.doubtStatus}
              </Text>
              <TextInput
                style={[styles.textinput, { height: 100 }]}
                placeholder={'Enter Answer of The Doubt'}
                placeholderTextColor="171560"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    help: text,
                  });
                }}
                value={this.state.help}
              />

              <LinearGradient
                // Button Linear Gradient
                colors={['#eb3349', '#f45c43']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.updateButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ loading: true });
                    this.answerDoubt();
                  }}>
                  {this.state.loading ? (
                    <Text style={styles.buttonText}> Loading</Text>
                  ) : (
                    <Text style={styles.buttonText}> Submit</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
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
    textAlign: 'center',
  },
  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    borderRadius: 10,
  },
  textinput: {
    marginTop: 10,
    marginBottom: 5,
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 10,
    padding: 5,
    color: '#171560',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  answerText: {
    color: '#171560',
    marginLeft: 40,
    fontSize:16
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '60%',
    height: '60%',
  },
  modalMainView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: '#bbbb',
  },
   doubtdetail: {
    fontSize: 16,
    color: '#171560',
  },
});
