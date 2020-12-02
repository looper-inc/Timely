import React, { useState } from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';

const FriendListModal = props => {
    const {
        onPressModal,
        ...attributes
      } = props;
  // initial state
  const [isVisible, setIsVisible] = useState(true);

  // hide show modal
  const displayModal = (show) =>{
    onPressModal(show)
    setIsVisible(show)
  }

    return (
      <View style = { styles.container }>
        <Modal
            animationType = {"slide"}
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
              setIsVisible(false)
              console.log('Modal has now been closed.');
            }}>

              <Text style = { styles.text }>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Maecenas eget tempus augue, a convallis velit.</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                displayModal(false);
              }}>
              <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>  
          </Modal>
            

                  
        </View>
      );
};

export default FriendListModal;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  }
});