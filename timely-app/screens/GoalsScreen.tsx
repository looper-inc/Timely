import { StyleSheet, SafeAreaView, 
  FlatList, ActivityIndicator, View} from 'react-native';
import  React,{useState, useEffect, useContext} from 'react'
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";
import ListItem from '../components/PlanScreen/ListItem';

export const GoalsScreen = ({navigation}) => {
    const [goalList, setGoalList] = useState();
    const [limit, setLimit] = useState(7);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [lastVisited, setLastVisited] = useState();
    const { currentUser } = useContext(AuthContext);
    const db = firebase.firestore();

    useEffect(()=>{
      retrieveData();
    },[]);

    const retrieveData = async () => {
      //set loading
      setLoading(true)
      let initialQuery = await db.collection('goals')
      .doc(currentUser.uid)
      .collection('list').orderBy('created',"desc").limit(limit);

      initialQuery.onSnapshot((snapshot) => {
        if(snapshot.size){
          let goals = [];
          snapshot.forEach(item => {
            goals.push({...item.data(), id: item.id});
          });
          //console.log(goals);
          //set goals data to state
          setGoalList(goals);
          
          //Cloud Firestore: Last Visible Document
          //Document ID To Start From For Proceeding Queries
          let last = snapshot.docs[snapshot.docs.length - 1].id;
          console.log('visited: ' + last);
          setLastVisited(last);
          setLoading(false)
        }
      });

    }

    const retrieveDataMore = async () =>{
      console.log('is calling??? ');
      //set loading
      setRefreshing(true)
      let initialQuery = await db.collection('goals')
      .doc(currentUser.uid)
      .collection('list').orderBy('created').startAfter(lastVisited).limit(limit);

      initialQuery.onSnapshot((snapshot) => {
        if(snapshot.size){
          let moreGoals = [...goalList];
          snapshot.forEach(item => {
            moreGoals.push({...item.data(), id: item.id});
          });
          console.log(moreGoals);
          //set goals data to state
          setGoalList(moreGoals);
          
          let last = snapshot.docs[snapshot.docs.length - 1].id;
          console.log('visited: ' + last);
          setLastVisited(last);
          setRefreshing(false)
        }
      });
    }

    const handleDetail = (itemDetail) => {
        navigation.navigate('EditGoal', itemDetail);
    }
      // Render Footer
    const renderFooter = () => {
      console.log('is loading??? ');
      try {
        // Check If Loading
        if (loading) {
          return (
            <ActivityIndicator size="small" color="#ff7979" />
          )
        }
        else {
          return null;
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    return (
      
        <SafeAreaView style={styles.container}>
          <FlatList 
            data={goalList}
            renderItem={({item}) => <ListItem 
              title={item.title} 
              titleComplete={(new Date(item.end.toDate())).toUTCString()} 
              image_url={item.picUrl}
              itemDetail={item}
              onPressDetail={handleDetail}
            onEndReached={() => {
              console.log("reached");
            }}
            onEndReachedThreshold={0.9}
            refreshing={true}
            />}
          />
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

});

export default GoalsScreen;
