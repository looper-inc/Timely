//FLow
//First user enters old password. Then firebase checks if the password is correct, if not retype password.
//Then create a new password and save that password for that user.

import * as React from 'react';
import {useState, useContext, useEffect} from 'react';
import AuthContext from "../providers/AuthProvider.js"
import { Image, View, Text, StyleSheet,  SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import {windowHeight, windowWidth} from '../utils/Dimensions'

import * as firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import FormButton from '../components/FormButton'
import { TextInput } from 'react-native-gesture-handler';
import Loader from '../components/Modal/Loader';
import {createRandomString} from '../utils/utils'

export const EditProfileScreen = ({navigation}) => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState();
    const [isDone, setIsDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messText, setMessText] = useState();
    const [profile, setProfile] = useState({})
    const db = firebase.firestore();
    const fStorage = firebase.storage();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        }) ();
    }, []);

    useEffect(() => { 
        db.collection('profiles').doc(currentUser.uid).get().then(snapshot => {
        const profile = snapshot.data();
        setProfile(profile)
        })
      }, [])
  
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };  

    const handleUploadImage = async (values) => {

        //showing indicator
        setLoading(true);

        try {
            if(image){
                //send a message to indicator modal
                setMessText('Uploading...')
                const img_extension = image.split('.').pop();
                const imageName = 'profile-image-' + createRandomString() + '.' + img_extension;
                
                const response = await fetch(image);
                const file = await response.blob();
                const uploadTask = fStorage.ref().child('profile_images/' + imageName).put(file);
                setTimeout(() => {
                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setProgress(progress);
                        switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            setMessText('Upload is paused')
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            setMessText('Upload is running')
                            break;
                        }
                    }, (error) => {

                    setMessText('Error: ' + error.code)
                    setLoading(false)
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            console.log('User does not have permission to access the object');
                        break;

                        case 'storage/canceled':
                            console.log('User canceled the upload');
                        break;

                        case 'storage/unknown':
                            console.log('Unknown error occurred, inspect error.serverResponse')
                        break;
                    }
                    }, () => {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setMessText('Updating Profile...')
                        return db.collection('profiles').doc(currentUser.uid).update({ profileImgURL: downloadURL })   


                        .then(()=>{
                            setIsDone(true)
                            console.log('Updated Profile Picture successfully!');
                            setMessText('Updated Profile Picture successfully!')
                            setTimeout(() => {
                                setLoading(false);
                                navigation.navigate('ProfileScreen');
                            }, 1500);
                        })
                        });
                    });
            }, 2500);
            }else{
                
            }

        } catch (error) {
            console.log(error)
        }
    }

    const initialValues = {
        firstName:  profile.firstName,
        lastName:   profile.lastName,
        email:      profile.email,
        bio: ''
    }

    return(
        
        <SafeAreaView style={styles.container}>
            {loading ? <Loader progress={progress} isDone={isDone} messText={messText}/> : null}
            {image ? <Image source={{ uri: image }} style={styles.defaultPic} /> :
                <View style={styles.defaultPic}>
                    <AntDesign name="picture" size={40} color="#666" />
                </View>
            }

            <TouchableOpacity style={styles.choosePicContainer} onPress={pickImage}>
                <Text style={styles.choosePicText}>Choose Profile Picture</Text>
            </TouchableOpacity>

            <Formik
            initialValues={initialValues}
            onSubmit={(values) => { handleUploadImage(values) }}
            >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                isValid,
                touched
            }) => (
                <>
                <TextInput
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    placeholder={values.firstName}
                    placeholderTextColor="grey"
                ></TextInput>

            <FormButton buttonTitle="Edit Password" onPress={()=>{navigation.navigate("EditPassword")}}/>
                </>
            )}
            </Formik>

        </SafeAreaView>
     );
}
export default EditProfileScreen;
   
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },

    choosePicContainer:{
        marginTop: 10,
        marginBottom: 10,
        height: windowHeight / 20,
        backgroundColor: '#0984e3',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 3,
    },

    choosePicText:{
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        
        paddingLeft: 10,
        paddingRight: 10,
    },

    defaultPic:{
        backgroundColor: '#dcdde1',
        height: windowHeight / 4,
        width: windowWidth / 1.5,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },

    topText: {
        textAlign: 'center',
        fontSize: 24,
        color: '#000000',
        margin: 25,
    },

    bottomText: {
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