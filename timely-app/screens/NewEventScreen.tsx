import * as React from 'react';
import { StyleSheet, SafeAreaView, Switch, TextInput, Alert, ScrollView } from 'react-native';

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


export default class NewEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Access auth
  static contextType = AuthContext


  // Saves to database
  handleSubmit(values) {
    const { uid } = this.context.currentUser
    const db = firebase.firestore();

    const now = Date.now()
    const event_id = "e" + now + uid

    // Setting events doc
    return db.collection('events').doc(uid).set(
      {
        [event_id]: {
          ...values,
          event_status: "TBD",
          created: now,
          timezone_offset: (new Date).getTimezoneOffset()
        }
      }, { merge: true }) // Merge to not overwrite, but set to create if not exists
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

  render() {
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
                  <FormButton buttonTitle='submit' onPress={() => {
                    if (!dirty) return Alert.alert('Please input values')
                    if (!isValid) return Alert.alert('Invalid fields')
                    return this.handleSubmit(values)
                  }} />
                </View>
              </ScrollView>
            </SafeAreaView>
          );
        }}
      </Formik>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column'
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
});
