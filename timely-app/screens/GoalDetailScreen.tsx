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
import Loader from '../components/Loader';
import {windowHeight, windowWidth} from '../utils/Dimensions';


export const GoalDetailScreen = ({route, navigation}) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(route.params.picUrl)
    }, []);
  

    return(
        <ScrollView>
            <SafeAreaView style={styles.container}>

                {image ? <Image source={{ uri: image }} style={styles.defaultPic} /> :

                    <View style={styles.defaultPic}>
                        <AntDesign name="picture" size={40} color="#666" />
                    </View>
                }

                <Text style={styles.completionBoxStyle}
                >
                    {route.params.title}
                </Text>

                <Text style={styles.completionBoxStyle}
                >
                    {route.params.description}
                </Text>

                <Text style={styles.completionBoxStyle}
                >
                    Completed By:
                </Text>

                <Text style={styles.completionBoxStyle}
                >
                    {(new Date(route.params.end.toDate())).toLocaleString('en-US')}
                </Text>

                <Text
                    style={styles.notCompleteTextBoxStyle}
                    >
                    Status:
                </Text>
                {
                    route.params.status ?
                    <Text
                        style={styles.notCompleteTextBoxStyle}
                    >
                    Completed
                    </Text> :
                    <Text
                    style={styles.notCompleteTextBoxStyle}
                    >
                    Not yet completed
                    </Text>
                }
                <Text 
                    style={styles.notCompleteTextBoxStyle}
                    >
                    Public:
                </Text>
                {
                    route.params.public ?
                    <Text
                        style={styles.notCompleteTextBoxStyle}
                    >
                    Yes
                    </Text> :
                    <Text
                    style={styles.notCompleteTextBoxStyle}
                    >
                    No
                    </Text>
                }
            </SafeAreaView>
        </ScrollView>
    )

}

export default GoalDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafd',
        padding: 10,
        marginTop: 0,
    },


    defaultPic:{
        backgroundColor: '#dcdde1',
        height: windowHeight / 3.5,
        width: '100%',
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