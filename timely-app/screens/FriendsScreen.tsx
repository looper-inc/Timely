
import * as React from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import { SearchBar } from 'react-native-elements';

const db = firebase.firestore();
var searchResults = [];

async function handleGet(search) {
    // TODO: Clear the search results list.
    // searchResults = [];

    const snapshot = await db.collection("profiles").orderBy("full_name").limit(20).get(search);

    snapshot.forEach(doc => {
        // console.log("Search val is: " + search);
        if (search != "" && doc.get("full_name").includes(search)) {
            console.log(doc.get("first_name") + ' ' + doc.get("last_name") + ': ' + doc.id);

            // TODO: Push to the search result list.
            searchResults.push({
                title: doc.get("first_name") + ' ' + doc.get("last_name"),
                uid: doc.id,
            });

            console.log("searchResults: " + searchResults);

            //TODO: Regenerate list when text in search bar changes

        }
    });
}

export default class FriendsScreen extends React.Component {
    state = {
        search: '',
    };

    // This is called when the search string changes.
    // The var `search` holds the search string.
    updateSearch = (search) => {
        this.setState({ search });
        handleGet(search.toLowerCase());
    };

    render() {
        const { search } = this.state;

        // console.log(searchResults);
        const renderItem = ({ item }) => (
            <Item title={item.title} />
        );

        return (
            <View>
                <SearchBar
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <FlatList
                    data={searchResults}
                    // data={testArr}
                    renderItem={renderItem}
                />
            </View>
        );
    }
}

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});