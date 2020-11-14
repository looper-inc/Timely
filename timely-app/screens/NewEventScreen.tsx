import * as React from 'react';
import { StyleSheet, SafeAreaView, Switch, TextInput, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import firebase from "../fbconfig";
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormikInput from '../components/FormikInput';
import { AuthContext } from '../providers/AuthProvider'


export default class NewEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static contextType = AuthContext
  handleSubmit(values) {
    const { uid } = this.context.currentUser
    const db = firebase.firestore();
    const event_id = "e" + Date.now() + uid
    return db.collection('events').doc(uid).set(
      {
        [event_id]: {
          ...values,
          event_status: "TBD"
        }
      }, { merge: true }
    ).then(() => {
      Alert.alert('EVENT CREATED')
    }).catch(function (err) {
      // Handle Errors here.
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
      start: Yup.date()
        .required("Start date required"),
      end: Yup.date()
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
      goal: ''
    }
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={eventValidationSchema}
          onSubmit={(values) => { this.handleSubmit(values) }}
        >
          {(formik) => {
            const { errors, touched, isValid, handleBlur, values, setFieldValue, handleChange } = formik;
            return (
              <Form>
                <Text><br />Name</Text>
                <FormikInput name='title' formik={formik} />
                <ErrorMessage name="title" component={Text} className="error" />
                <Text><br />Public</Text>
                <Switch
                  value={values.public}
                  onValueChange={value =>
                    setFieldValue('public', value)
                  }
                />
                <Text><br />Description</Text>
                <FormikInput name='description' formik={formik} />
                <ErrorMessage
                  name="description"
                  component={Text}
                  className="error"
                />

                <Text><br />Start</Text>
                <FormikInput name='start' formik={formik} />
                <ErrorMessage
                  name="start"
                  component={Text}
                  className="error"
                />
                <Text><br />End</Text>
                <FormikInput name='end' formik={formik} />
                <ErrorMessage
                  name="end"
                  component={Text}
                  className="error"
                />
                <Text><br />Goal</Text>
                <FormikInput name='goal' formik={formik} />
                <ErrorMessage
                  name="goal"
                  component={Text}
                  className="error"
                />
                <button
                  type="submit"
                  disabled={!(isValid)}
                >
                  Submit
              </button>
              </Form>
            );
          }}
        </Formik>
      </SafeAreaView>
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
