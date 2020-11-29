import { StyleSheet, SafeAreaView, View, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import  React,{useState, useEffect, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '../Themed';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import { TouchableOpacity} from 'react-native-gesture-handler'

export const ListItem = ({
                            onPressDetail, 
                            itemDetail, 
                            onPressVewDetail}) => (


        <View style={styles.list}>
            <TouchableWithoutFeedback onPress={() => onPressVewDetail(itemDetail)}>
            {itemDetail.picUrl ? <Image source={{ uri: itemDetail.picUrl }} style={styles.defaultPic} /> :
                <View style={styles.defaultPic}>
                    <AntDesign name="picture" size={35} color="#666" />
                </View> 
            }
            </TouchableWithoutFeedback>
            <View style={styles.content}>
                <TouchableWithoutFeedback onPress={() => onPressVewDetail(itemDetail)}>
                <View style={styles.contentText}>
                    <Text style={styles.title}>{itemDetail.title}</Text>
                    {console.log(itemDetail.status)}
                    {
                        
                        itemDetail.status ?
                        <Text style={styles.status}>Completed</Text> :
                        <Text style={styles.statusNotComp}>Not yet completed</Text>
                    }
                    <Text style={styles.titleComplete}>Complete By: {(new Date(itemDetail.end.toDate())).toLocaleString('en-US')}</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.editButton} onPress={() => onPressDetail(itemDetail)}>
                    <AntDesign name="edit" size={20} color="#f9fafd" />
                </TouchableOpacity>
            </View>

        </View>


);


const styles = StyleSheet.create({
    list: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f9fafd',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
    },

    title: {
      fontSize: 14,
      color: '#2c3e50',
      alignSelf: 'flex-start'
    },
    defaultPic:{
        backgroundColor: '#dcdde1',
        height: windowHeight/ 8,
        width: windowWidth / 4,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    content:{
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 4,
        backgroundColor: '#ecf0f1',
        margin: 1
    },
        contentText:{
        width: '82%',
        height: '90%',
        alignSelf: 'flex-start',
        margin: 1,
    },
        editButton: {
        backgroundColor: '#20bf6b',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 3,
        marginTop: 20
    },
    titleComplete:{
        fontSize: 10,
        top: '40%',
        color: '#34495e',
        fontWeight: 'bold'
    },
    status:{
        backgroundColor: '#22a6b3',
        fontSize: 9,
        top: '35%',
        color: '#ecf0f1',
        fontWeight: 'bold',
        borderRadius: 3,
        alignSelf: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    statusNotComp:{
        backgroundColor: '#ff7979',
        fontSize: 9,
        top: '35%',
        color: '#ecf0f1',
        fontWeight: 'bold',
        borderRadius: 3,
        alignSelf: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 5,
    }
});

export default ListItem;
