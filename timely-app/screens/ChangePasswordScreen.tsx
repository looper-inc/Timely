//FLow
//First user enters old password. Then firebase checks if the password is correct, if not retype password.
//Then create a new password and save that password for that user.

import * as React from 'react';
import { StyleSheet, Button, TextInput, Alert,  SafeAreaView } from 'react-native';
import { Text, View } from '../components/Themed';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";


export default class ChangePasswordScreen extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
        currentPassword: "",
        newPassword: "",
        };
      }
     
      reauthenticate = (currentPassword) => {
          var user = firebase.auth().currentUser;
          var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
          user.reauthenticateWithCredential(cred);
      }

      onChangePasswordPress = () =>{
          this.reauthenticate(this.state.currentPassword).then(() => {
              var authuser = firebase.auth().currentUser;
              
              authuser.updatePassword(this.state.newPassword).then(() => {
                  Alert.alert("Password  was changed.");
              }).catch((error) => {
                  Alert.alert(error.message);

              });

          }).catch((error) =>  {
              Alert.alert(error.message);

          });
      }
      render() {

    return(
        <SafeAreaView>
    
      < TextInput style= {styles.topText} value={this.state.currentPassword} 
         placeholder= "Current Password" secureTextEntry = {true} onChangeText= {(text) => { this.setState({currentPassword: text}) }} 
    />

    < TextInput style= {styles.topText} value={this.state.newPassword} 
    placeholder= "New Password" secureTextEntry = {true} onChangeText= {(text) => { this.setState({newPassword: text}) }} />

    <Button title="Change Password" onPress = {this.onChangePasswordPress} />
       
    </SafeAreaView>
      
      
     );
}
}
  


   
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    topText: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
        marginBottom: 25,
    },
    bottomText: {
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 14,
        color: '#000000',
        marginBottom: 25,
    },
    textInput: {

    },
    alertText: {
        margin: 5,
        color: '#ff7979',
        fontSize: 12,
        marginTop: 0,
        fontWeight: 'bold'
    }
});