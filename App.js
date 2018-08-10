import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { config, settings } from "./FirebaseConfig";

firebase.initializeApp(config);

const firestore = firebase.firestore();
firestore.settings(settings);

console.disableYellowBox = ['Remote Debugger'];

export default class App extends React.Component {


  componentDidMount(){

    this._getRealTimeData();
    this._getNormalData();


  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Firestore</Text>
      </View>
    );
  }

    _getRealTimeData = () => {

        const realTimeDatabaseRef = firestore.collection("database").doc("realTime");

        realTimeDatabaseRef.onSnapshot( doc => {

            console.log('--------------- Realtime Database ---------------');

            if (doc.exists) console.log(doc.data());
            else console.log('El documento no existe');

            console.log('-----------------------------------------------');

        })



    };

    _getNormalData = () => {

        const normalDatabseRef = firestore.collection("database").doc("normalDatabase");

        normalDatabseRef.get().then( doc => {

            console.log('--------------- Normal Database ---------------');

            if (doc.exists) console.log(doc.data());
             else console.log('El documento no existe');

            console.log('-----------------------------------------------');


        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


    }

}//class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
