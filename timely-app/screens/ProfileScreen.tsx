/*import {
    SafeAreaView, Switch, StyleSheet, ScrollView, View,
    Text, TextInput, TouchableOpacity, Image, Platform, Dimensions
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";
const db = firebase.firestore();
const fStorage = firebase.storage();
export default class ProfileScreen extends React.Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
          gotData: false,
          profile: "Retrieving Profile ...",
          currentUser: AuthContext
        };
        /*props.navigation.setOptions({
          headerRight: () => {
            return <NewEventButton selected={this.state.selected} {...props} />;
          }
        });
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentWillMount() {
        const retrieveData = async () => {
            let initialQuery = await db
                .collection("profile")
                .doc(this.state.currentUser.value.uid)
                .collection("list")
                .orderBy("created", "desc")
                .limit(limit);

            initialQuery.onSnapshot(snapshot => {
                if (snapshot.size) {
                    //set loading
                    //setLoading(true);

                    let profile = snapshot;
                    /*snapshot.forEach(item => {
                        goals.push({ ...item.data(), id: item.id });
                    });
                    this.setState({gotData: true, profile: profile});
                    //console.log(goals);
                    //set goals data to state
                    setTimeout(() => {
                        //setGoalList(goals);
                        //setLoading(false);
                        this.setState({gotData: false, profile: "Retrieving Profile ..."});
                    }, 500);
                    //Cloud Firestore: Last Visible Document
                    //Document ID To Start From For Proceeding Queries
                    //let last = snapshot.docs[snapshot.docs.length - 1];
                    //console.log('visited: ' + last);
                    //setLastVisited(last);
                    //setLoading(false)
                } else {
                    //setLoading(false);
                    this.setState({gotData: false, profile: "Retrieving Profile ..."});
                }
            });
        };
            try {
                retrieveData();
            } catch (error) {
                console.log("retrieveData error: " + error);
            }
    }
    render() {
        return (
            (/*
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <SafeAreaView style={styles.container}>

                        {image ? <Image source={{ uri: image }} style={styles.defaultPic} /> :

                            <View style={styles.defaultPic}>
                                <AntDesign name="picture" size={40} color="#666" />
                            </View>
                        }


                        <Text style={styles.title}
                        >
                            {route.params.title}
                        </Text>
                        <View style={styles.detailContent}>
                            <AntDesign style={styles.detailIcon} name="filetext1" size={45} />

                            <Text style={styles.contentText}
                                numberOfLines={5}
                            >
                                {route.params.description}
                            </Text>
                        </View>
                        <View style={styles.detailContent}>
                            <AntDesign style={styles.detailIcon} name="clockcircleo" size={45} />
                            <View style={styles.contentBody}>
                                <Text style={styles.contentText}
                                >
                                    Completed By:
                                </Text>

                                <Text style={styles.notCompleteTextBoxStyle}
                                >
                                    {(new Date(endDate)).toLocaleString('en-US')}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.detailContent}>
                            <AntDesign style={styles.detailIcon} name="checksquareo" size={45} />
                            <View style={styles.contentBody}>
                                <Text
                                    style={styles.contentText}
                                >
                                    Status:
                                </Text>
                                {
                                    route.params.status ?
                                        <Text
                                            style={styles.completeTextBoxStyle}
                                        >
                                            Completed
                                    </Text> :
                                        <Text
                                            style={styles.notCompleteTextBoxStyle}
                                        >
                                            Not yet completed
                                    </Text>
                                }
                            </View>
                        </View>
                        <View style={styles.detailContent}>
                            <AntDesign style={styles.detailIcon} name="infocirlceo" size={45} />
                            <View style={styles.contentBody}>
                                <Text
                                    style={styles.contentText}
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
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
                            <div>{this.state.profile}</div>)
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 0,
    },


    defaultPic: {
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
    title: {
        fontSize: 16,
        textTransform: 'capitalize',
        color: '#c8d6e5',
        marginVertical: 5,
        fontWeight: 'bold'
    },
    detailContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fbc531',
        marginBottom: 4,
        borderRadius: 5,
    },
    detailIcon: {
        color: "#2f3640",
        marginRight: 15,
        marginTop: 10,
        marginLeft: 5,
    },
    contentBody: {
        flex: 1,
    },

    contentText: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
        color: '#34495e',
        width: '80%'
    },


    completeTextBoxStyle: {
        fontSize: 18,
        color: '#10ac84',
        alignItems: 'flex-start',
        fontWeight: 'bold',
        marginVertical: 5,
    },

    descriptionBoxStyle: {
        backgroundColor: '#fff',
        height: windowHeight / 8,
        paddingLeft: 10,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
    },

    notCompleteTextBoxStyle: {
        fontSize: 18,
        color: '#576574',
        alignItems: 'flex-start',
        fontWeight: 'bold',
        marginVertical: 5,
    },

})
*/
import { StyleSheet, Alert, Image, SafeAreaView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react'
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import { Text, View } from '../components/Themed';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../providers/AuthProvider';

export const ProfileScreen = ({ navigation }) => {

    const db = firebase.firestore();
    const { currentUser } = useContext(AuthContext);
    const user = firebase.auth();

    useEffect(() => {
        console.log('user', currentUser)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.verticalButton}
                onPress={() => navigation.navigate('Settings')}>
                <Image
                    source={require('../assets/images/cog.png')}
                    style={styles.cog}
                />
            </TouchableOpacity>

            <Image
                source={currentUser.profileImgURL}
                style={styles.profile_picture}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    verticalButton: {

    },
    cog: {
        width: 50,
        height: 50,
    },
    profile_picture: {

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
