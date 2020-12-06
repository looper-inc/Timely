import * as React from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import FormButton from '../components/FormButton';
import firebase from "../fbconfig";
import { SearchBar } from 'react-native-elements';

const db = firebase.firestore();
var searchResults = [];

type thisStates = {
  search: string,
  searchResults: any[],
  lastTyped: Date
}

export default class FriendsScreen extends React.Component<{}, thisStates> {

  timeout: any = null;
  constructor(props: any) {
    super(props)
    this.state = {
      search: '',
      lastTyped: new Date(),
      searchResults: []
    };
    this.timeout = 0;
    this.handleGet = this.handleGet.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  async onChangeText(search: string) {
    this.setState({ search });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(async () => {
      await this.handleGet(search.toLowerCase())
    }, 300);
  }

  async handleGet(search: any) {

    const db = firebase.firestore()
    const snapshot = await db.collection("profiles").orderBy("full_name").limit(20).get(search);

    snapshot.forEach(doc => {
      // console.log("Search val is: " + search);
      if (search != "" && doc.get("full_name").includes(search)) {
        console.log(doc.get("first_name") + ' ' + doc.get("last_name") + ': ' + doc.id);

        // TODO: Push to the search result list.
        const searchResults: any[] = []
        searchResults.push({
          title: doc.get("first_name") + ' ' + doc.get("last_name"),
          uid: doc.id,
        });

        this.setState({ searchResults })
        console.log("searchResults: " + searchResults);
      }
    });
  }
  // console.log(searchResults);
  renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  render() {
    const { search } = this.state;


    return (
      <View>
        <SearchBar
          placeholder="Search"
          onChangeText={this.onChangeText}
          value={search}
        />
        <FlatList
          data={searchResults}
          // data={testArr}
          renderItem={this.renderItem}
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
