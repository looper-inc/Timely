import * as React from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';
import { Text, View } from '../components/Themed';
import firebase from "../fbconfig";
import { SearchBar } from 'react-native-elements';
import FriendBlock from '../components/FriendsScreen/FriendBlock';
import Navigation from '../navigation';

const db = firebase.firestore();

type thisStates = {
    search: string,
    searchResults: any[],
    lastTyped: Date,
    loading: boolean
}

export default class FriendsScreen extends React.Component<{ navigation: any }, thisStates> {

    timeout: any = null;
    db: any = firebase.firestore()
    constructor(props: any) {
        super(props)
        this.state = {
            search: '',
            lastTyped: new Date(),
            searchResults: [],
            loading: false
        };
        this.timeout = 0;
        this.handleGet = this.handleGet.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
    }

    async onChangeText(search: string) {
        this.setState({ search });
        if (search.length) {
            this.setState({ loading: true })
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                await this.handleGet(search.toLowerCase())
            }, 1000);
        }
    }

    async handleGet(search: any) {
        try {
            const snapshot = await this.db.collection("profiles").where('email', '==', search).limit(20).get();

            const searchResults: any[] = []
            snapshot.forEach(doc => {
                // console.log("Search val is: " + search);

                // TODO: Push to the search result list.
                searchResults.push({
                    title: doc.data().email,
                    uid: doc.id,
                });

            });
            this.setState({ searchResults, loading: false }, () => console.log(searchResults))
        }
        catch (err) { console.log(err) }
    }
    // console.log(searchResults);
    renderItem = ({ item }) => (
        <FriendBlock
            item={item} key={item.uid}
            onPress={(user1: any) => {
                this.props.navigation.push('ViewProfile', { uid: user1.uid })
                console.log(user1)
            }}
        />
    );

    render() {
        const { search, loading, searchResults } = this.state;

        return (
            <View>
                <SearchBar
                    placeholder="Search"
                    onChangeText={this.onChangeText}
                    value={search}
                />
                { loading ?
                    <ActivityIndicator size="large" color="#0097e6" />
                    :
                    <FlatList
                        data={searchResults}
                        // data={testArr}
                        renderItem={this.renderItem}
                    />
                }
                {!!search.length && !searchResults.length && !loading &&
                    <Text>Empty</Text>
                }
            </View>
        );
    }
}
