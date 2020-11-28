import { StyleSheet, SafeAreaView, View, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import  React,{useState, useEffect, useContext} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";
import {windowHeight, windowWidth} from '../utils/Dimensions';
import { TouchableOpacity} from 'react-native-gesture-handler';
import ListItem from '../components/PlanScreen/ListItem';

export const GoalsScreen = ({navigation}) => {

    const { currentUser } = useContext(AuthContext);
    const handleDetail = () => {
        console.log('hello: ' + currentUser.uid)
    }
    return (
      <SafeAreaView style={styles.container}>
        <ListItem 
          title={'Training in 3 hour! Training in 3 hour! Training in 3 hour!'}
          titleComplete = 'today'
          edit= {handleDetail}
          />
        <ListItem />
      </SafeAreaView>
    );

}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },


});

export default GoalsScreen;
