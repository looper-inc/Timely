import { StyleSheet, SafeAreaView, 
  FlatList, ActivityIndicator, View, Text, Alert} from 'react-native';
import  React,{useState, useEffect, useContext} from 'react'
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";
import ListItem from '../components/PlanScreen/ListItem';


export const GoalsScreen = ({navigation}) => {
    const [goalList, setGoalList] = useState();
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [lastVisited, setLastVisited] = useState();
    const { currentUser } = useContext(AuthContext);

    const db = firebase.firestore();
    const fStorage = firebase.storage();

    useEffect(()=>{
      retrieveData();
    },[]);

    const retrieveData = async () => {
      //set loading
      setLoading(true)
      let initialQuery = await db.collection('goals')
      .doc(currentUser.uid)
      .collection('list').orderBy('created',"desc");

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
    const retrieveMoreData = async () =>{

      //set loading
      setLoading(true);

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
        }
      });
    }

    const handleDetail = (itemDetail) => {
      navigation.navigate('EditGoal', itemDetail);
    }

    const handleViewDetail = (itemDetail) =>{
      navigation.navigate('GoalDetail', itemDetail);
    }

    const handleRemoveGoal = (itemDetail) =>{
        if(itemDetail.picUrl){

            fStorage.refFromURL(itemDetail.picUrl).delete().then(()=>{
              console.log('Old pic has been deleted!')

            }).catch(function(error) {
                setLoading(false)
                console.log('Delete picture: Uh-oh, an error occurred! ' + error)
            });
        }

        db.collection("goals")
          .doc(currentUser.uid)
          .collection('list')
          .doc(itemDetail.id)
          .delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });        
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
              itemDetail={item}
              onPressDetail={handleDetail}
              onPressVewDetail = {handleViewDetail}
              onPressRemoveGoal = {handleRemoveGoal}
              onEndReached={()=>{
                console.log('reached')
              }}
              onEndReachedThreshold={0.9}
            />}
          />
          {isFetching && <Text>Fetching more list items...</Text>}
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default GoalsScreen;
