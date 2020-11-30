import { StyleSheet, SafeAreaView, 
  FlatList, ActivityIndicator, View, Text, Alert} from 'react-native';
import  React,{useState, useEffect, useContext} from 'react'
import firebase from "../fbconfig";
import { AuthContext } from "../providers/AuthProvider.js";
import ListItem from '../components/PlanScreen/ListItem';


export const GoalsScreen = ({navigation}) => {
    const [goalList, setGoalList] = useState();
    const [limit, setLimit] = useState(7);
    const [isFetching, setIsFetching] = useState(false);
    const [lastVisited, setLastVisited] = useState();
    const { currentUser } = useContext(AuthContext);

    const db = firebase.firestore();
    const fStorage = firebase.storage();

    useEffect(()=>{
      try {
        retrieveData();
      }
      catch (error) {
        console.log('retrieveData error: ' + error);
      }
    },[]);

    const retrieveData = async () => {
      //set loading
      //setLoading(true)
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
          let last = snapshot.docs[snapshot.docs.length - 1];
          //console.log('visited: ' + last);
          setLastVisited(last);
          //setLoading(false)
        }
      });

    }
    const retrieveMoreData = async () =>{

      let initialQuery = await db.collection('goals')
      .doc(currentUser.uid)
      .collection('list').orderBy('created',"desc").startAfter(lastVisited).limit(limit);

      initialQuery.onSnapshot((snapshot) => {
        if(snapshot.size){
          //set loading
          setIsFetching(true);
          let moreGoals = [...goalList];
          snapshot.forEach(item => {
            //console.log(item.data())
            moreGoals.push({...item.data(), id: item.id});
          });
          //console.log(moreGoals);
          setTimeout(() => {
            //set goals data to state
            setGoalList(moreGoals);
            setIsFetching(false);
          }, 500);
          
          let last = snapshot.docs[snapshot.docs.length - 1];
          setLastVisited(last);
          
        }else{
          console.log('no more row to fetch')
          setIsFetching(false);
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
      //console.log('is fechting more data ??? ');
      try {
          return (
            <ActivityIndicator size="large" color="#0abde3" />
          )
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
            />}
            onEndReached={()=>
              retrieveMoreData()
            }
            onEndReachedThreshold={0.1}
          />
          {isFetching && <ActivityIndicator size="large" color="#0097e6" />}

        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default GoalsScreen;
