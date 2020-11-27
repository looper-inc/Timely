import {SafeAreaView, Switch,StyleSheet, ScrollView, View,
    Text, TextInput,TouchableOpacity, Image, Platform, Dimensions} from 'react-native'
import  React,{useState, useEffect, useContext} from 'react'
import FormButton from '../components/FormButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as ImagePicker from 'expo-image-picker';
import FormInput from '../components/FormInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '../components/DateTimePicker';
import * as Yup from 'yup';
import {Formik} from 'formik'
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const NewGoalScreen = () => {
    const { currentUser } = useContext(AuthContext);
    const [image, setImage] = useState(null);
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
      })();
    }, []);
  
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

        try {
            if(image){
                const img_extension = image.split('.').pop();
                const imageName = 'goal-image-' + Math.random().toString(36).substr(2, 9) + '.' + img_extension;
                const response = await fetch(image);
                const file = await response.blob();
                const ref = fStorage.ref().child('goal_images/' + imageName);
                return ref.put(file).then((snapshot)=>{
                    snapshot.ref.getDownloadURL().then((url) => {
                        console.log('Upload Image SUCCESSFULLY: ', url)
                    })
                });
            }
             
            // return db.collection('goals').doc(currentUser.uid).collection('list').add(
            //     {
            //         title: values.title,
            //         description: values.description,
            //         created: Date.now(),
            //         end: values.end,
            //         status: values.status,
            //         public: values.public
            //     }
            // ).then(()=>{
            //     console.log('Add New Goal SUCCESSFULLY')
            // })
        } catch (error) {
            
        }
    }

    /****** VALIDATION using Formik and Yup ******/
    const hourFromNow = new Date()
    hourFromNow.setHours(hourFromNow.getHours() + 1)    
    const initialValues = {
        title: '',
        description: '',
        end: hourFromNow,
        status: false,
        public: false,
      }

      // With Yup validationSchema
      const signInValidationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title Address is Required'),
        public: Yup.boolean(),
        status: Yup.boolean(),
        end: Yup.string()
            .required("End date required"),
        description: Yup.string()
        .max(220, 'Description too long')
      })

    return(
        <ScrollView>
            <SafeAreaView style={styles.container}>

                {image ? <Image source={{ uri: image }} style={styles.defaultPic} /> :

                    <View style={styles.defaultPic}>
                        <AntDesign name="picture" size={40} color="#666" />
                    </View>
                }

                <TouchableOpacity style={styles.choosePicContainer} onPress={pickImage}>
                    <Text style={styles.choosePicText}>Choose Picture</Text>
                </TouchableOpacity>

                <Formik
                initialValues={initialValues}
                validationSchema={signInValidationSchema}
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
                <FormInput
                    labelValue={values.title}
                    onChangeText={handleChange('title')}
                    placeholderText="title"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={handleBlur('title')}
                />
                {
                    (errors.title && touched.title) && 
                    <Text style={styles.alertText}>{errors.title}</Text>
                }
                <TextInput
                    placeholder={"Description"}
                    numberOfLines = {4}
                    multiline = {true}
                    style={styles.descriptionBoxStyle}
                    placeholderTextColor="grey"
                >
                {
                    (errors.description && touched.description) && 
                    <Text style={styles.alertText}>{errors.description}</Text>
                }

                </TextInput>

                <Text style={styles.completionBoxStyle}
                >
                    Completed By:
                </Text>

                <DateTimePicker
                    initialDate={values.end}
                    onSubmit={datetime => { setFieldValue('end', datetime) }}
                  />
                {
                    (errors.end && touched.end) && 
                    <Text style={styles.alertText}>{errors.end}</Text>
                }
                <Text
                    style={styles.notCompleteTextBoxStyle}
                    >
                    Is Completed ?:
                </Text>

                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor="#0984e3"
                    ios_backgroundColor="#3e3e3e"
                    value={values.status}
                    onValueChange={value =>
                        setFieldValue('status', value)
                    }
                    >

                </Switch>
                <Text 
                    style={styles.notCompleteTextBoxStyle}
                    >
                    Public:
                </Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor="#0984e3"
                    ios_backgroundColor="#3e3e3e"
                    value={values.public}
                    onValueChange={value =>
                        setFieldValue('public', value)
                      }
                    >

                </Switch>
                <FormButton
                    buttonTitle="Submit" 
                    onPress={handleSubmit}
                    disabled={!(isValid)}
                />
                </>
                )}
                </Formik>

            </SafeAreaView>
        </ScrollView>
    )

}

export default NewGoalScreen;

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
        fontFamily: 'Roboto',
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

    completionBoxStyle:{
        marginTop: 10,
        marginBottom: 10,
        color:'grey',
        fontWeight: 'bold',
    },


    completeTextBoxStyle:{
        backgroundColor: 'white',
        color:'grey',
        padding:10,
        width: '45%'
    },

    descriptionBoxStyle:{
        backgroundColor: '#fff',
        height:windowHeight/8,
        paddingLeft: 10,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
    },

    notCompleteTextBoxStyle:{
        marginTop: 10,
        marginBottom: 10,
        color:'grey',
        alignItems: 'flex-start',
        fontWeight: 'bold',
    },

    alertText:{
        margin: 5,
        color: '#ff7979',
        fontSize: 12,
        marginTop: 0,
        fontWeight: 'bold'
    }
})