import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import db from '../config';
import {  SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import {  Avatar, Icon, Card } from 'react-native-elements';
import Modal from 'react-native-modal';
let categoryCodes = {
  Maths: ['#FF5F6DAA', '#FFC371AA'],

  Science: ['#11998EAA', '#38EF7DAA'],

  English: ['#662D8Caa', '#ED1E79AA'],

  SocialScience: ['#009245AA', '#FCEE21AA'],

  Hindi: ['#2E3192AA', '#1BFFFFAA'],

  Others: ['#D4145AAA', '#FBB03BAA'],
};
export default class AnswerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      help: this.props.route.params.details['help'],
      doubtTitle: this.props.route.params.details['doubtTitle'],
      doubtStatus: this.props.route.params.details['doubtStatus'],
      doubtId: this.props.route.params.details['doubtId'],
      doubtDescription: this.props.route.params.details['doubtDescription'],
      category: this.props.route.params.details['category'],
      teacherId: this.props.route.params.details['teacherEmail'],
      teacherName: this.props.route.params.details['teacherName'],
      doubtImage: this.props.route.params.details['doubtImage'],
      doubtDocId: '',
      docId: this.props.route.params.details['helpId'],
      modalVisible: false,
      isImageModalVisible: false,
      Max_Rating: 5,
      Default_Rating: 2,

      rating: 0,
      totalRating: 0,
    };
    this.Star =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    this.Star_With_Border =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  componentDidMount = () => {
    db.collection('doubts')
      .where('doubtId', '==', this.state.doubtId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var doubt = doc.data();
          this.setState({
            doubtDocId: doc.id,
          });
        });
      });

    db.collection('teachers')
      .where('email', '==', this.state.teacherId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          this.setState({
            rating: doc.data().rating,
            totalRating: doc.data().totalRating,
          });
        });
      });
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
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/AnswerDoubtScreen.png')}>
        <SafeAreaProvider style={{ flex: 1, marginTop: 40 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name="arrow-left"
              type="feather"
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}></Icon>
            <Text style={styles.header}> Answer Details</Text>
          </View>
        
          {this.showModal()}
          <ScrollView
            style={{
              flex: 1,
            }}>
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: 50,
                backgroundColor: '#F3E6EFAA',
                justifyContent: 'center',
                padding: 10,
              }}>
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
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <Text style={styles.doubtdetail}>Category : </Text>
                <LinearGradient
                  colors={categoryCodes[this.state.category]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.category}>
                  <Text>{this.state.category} </Text>
                </LinearGradient>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: 50,
                backgroundColor: '#F3E6EFAA',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Text style={[styles.doubtdetail, { fontWeight: 'bold' }]}>
                Answer
              </Text>
              <Text style={styles.doubtdetail}>{this.state.help} </Text>
             
           
              
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.doubtdetail}> Doubt Status : {this.state.doubtStatus} </Text>
                 
                </View>
              
                
              
            
            </View>
          </ScrollView>
        </SafeAreaProvider>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  doubtdetail: {
    fontSize: 16,
    color: '#171560',
    marginTop:10
  },
  category: {
    width: 70,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontSize: 16,
    color: '#171560',
    alignSelf: 'center',
  },
  header: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 20,
  },

});
