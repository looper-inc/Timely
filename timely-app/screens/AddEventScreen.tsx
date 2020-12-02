import  React,{useState, useEffect, useContext} from 'react';
import { StyleSheet, SafeAreaView, Switch, TextInput,
   Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import firebase from "../fbconfig";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormikInput from '../components/FormikInput';
import { AuthContext } from '../providers/AuthProvider';
import DateTimePicker from '../components/DateTimePicker';
import FriendListModal from '../components/Modal/FriendListModal';


export const AddEvent = ({navigation}) => {

  // Access auth
  const { currentUser } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const friend_data = [
      {
        "id": 'uwOWcytRkBhD5WcJwZO9FZ6YABN2',
        "first_name": "kristin",
        "last_name": "Smith",
        "email": "vtl017@ucsd.edu"
      },
      {
        "id": 'rfrrAqOrVcgjBQKBYmlXB9ZqgMJ2',
        "first_name": "Olivia",
        "last_name": "Parker",
        "email": "batman@avenger.com"
      },
      {
        "id": 'VtqWJo4f0rNG3ZvTz5KbICWywnC3',
        "first_name": "Jimmy",
        "last_name": "Robinson",
        "email": "superman@yahoo.com"
      }
    ]

  const displayModal = (show) =>{
    setModalVisible(show)
  }

  // Saves to database
  const handleSubmit = (values) => {
    const uid  = currentUser.uid;
    const db = firebase.firestore();

    const now = Date.now()
    const event_id = "e" + now + uid

    // Setting events doc
    return db.collection('events').doc(uid).collection('list').add(
      {
        ...values,
        event_status: "TBD",
        created: now,
        timezone_offset: (new Date).getTimezoneOffset()
      }) // Merge to not overwrite, but set to create if not exists
      // What to do after
      .then(() => {
        Alert.alert('EVENT CREATED')

      })
      // Handle errors
      .catch(function (err) {
        Alert.alert('OOPS!', err.message, [{ text: 'close' }])
        console.log(err)
      });
  }

  const memberList = (member) =>{
    let fullName;
    if(member.first_name && member.last_name){
      fullName = member.first_name +' '+ member.last_name;
    }
    return (
      <View style={styles.memberList}>
        <View style={styles.memberInfo}>
          {fullName && <Text style={{textTransform: 'capitalize'}}>{fullName}</Text>}
          <Text>{member.email}</Text>
        </View>
        <TouchableOpacity style={styles.memberDelete}>
          <AntDesign name="delete" size={25} color="#666" />
        </TouchableOpacity>
      </View>
    )
  }

    const eventValidationSchema = Yup.object().shape({
      title: Yup.string()
        .required("Name is required")
        .max(30, "Name too long")
      ,
      description: Yup.string()
        .max(220, 'Description too long')
      ,
      public: Yup.boolean(),
      start: Yup.string()
        .required("Start date required"),
      end: Yup.string()
        .required("End date required"),
      goal: Yup.string()
    });

    const now = new Date()
    const hourFromNow = new Date()
    hourFromNow.setHours(hourFromNow.getHours() + 1)
    const initialValues = {
      title: '',
      description: '',
      public: false,
      start: now,
      end: hourFromNow,
      goal: '',
    }

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={eventValidationSchema}
        onSubmit={() => { }}
      >
        {(formik) => {
          const { errors, touched, isValid, handleBlur, values, dirty, setFieldValue, validateForm } = formik;
          return (
            <SafeAreaView>
              <ScrollView >
                <View style={styles.container}>
                  <Text>Name</Text>
                  <FormikInput name='title' formik={formik} />
                  <ErrorMessage name="title" component={Text} className="error" />

                  <Text>Public</Text>
                  <Switch
                    value={values.public}
                    onValueChange={value =>
                      setFieldValue('public', value)
                    }
                  />

                  <Text>Description</Text>
                  <FormikInput name='description' formik={formik} />
                  <ErrorMessage
                    name="description"
                    component={Text}
                    className="error"
                  />

                  <Text>Start</Text>
                  <DateTimePicker
                    initialDate={values.start}
                    onSubmit={datetime => { setFieldValue('start', datetime) }}
                  />
                  <ErrorMessage
                    name="start"
                    component={Text}
                    className="error"
                  />
                  <Text>End</Text>
                  <DateTimePicker
                    initialDate={values.end}
                    onSubmit={datetime => { setFieldValue('end', datetime) }}
                  />
                  <ErrorMessage
                    name="end"
                    component={Text}
                    className="error"
                  />
                  <Text>Goal</Text>
                  <FormikInput name='goal' formik={formik} />
                  <ErrorMessage
                    name="goal"
                    component={Text}
                    className="error"
                  />

                  <View style={styles.members}>

                   {modalVisible? <FriendListModal onPressModal={displayModal} />: null} 

                    <Text>Members:</Text>
                    <TouchableOpacity style={styles.inviteButton} onPress={() => displayModal(true)}>
                      <Text style={styles.inviteText}>+ Invite Friend</Text>
                    </TouchableOpacity>

                    <FlatList 
                      data={friend_data}
                      renderItem={({item})=>memberList(item)}
                    />
                  </View>

                  <FormButton buttonTitle='Submit' onPress={() => {
                    if (!dirty) return Alert.alert('Please input values')
                    if (!isValid) return Alert.alert('Invalid fields')
                    return handleSubmit(values)
                  }} />
                </View>
              </ScrollView>
            </SafeAreaView>
          );
        }}
      </Formik>
    );

}
export default AddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inviteButton:{
    backgroundColor: '#20bf6b',
    margin: 5,
    borderRadius: 3,
    width: '40%',

    alignItems: 'center',
  },
  inviteText:{
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,

  },
  memberList:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 3,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,    
  },
  memberInfo:{
    flex: 1,
    marginVertical: 5,
    marginLeft:10,
    justifyContent: 'center',
  },
  memberDelete:{
    padding: 5,
    backgroundColor: '#ee5253',
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginVertical: 5,
    marginRight:10
  }
});
