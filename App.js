import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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

          <TouchableOpacity style={{width:200, height:50, backgroundColor:'gray', marginTop:50, justifyContent:'center',
                                    alignItems:'center'}}
                            onPress={() => {this._editData()}}>

              <Text style={{color:'white', fontSize:16}}>Edit Data</Text>

          </TouchableOpacity>


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


    };

    _editData = () => {

        /*const docData = {
            stringExample: "Hello world!",
            booleanExample: true,
            numberExample: 3.14159265,
            dateExample: new Date("December 10, 1815"),
            arrayExample: [5, true, "hello"],
            nullExample: null,
            objectExample: {
                a: 5,
                b: {
                    nested: "foo"
                }
            }
        };*/

        /*firestore.collection("cities").doc("LA").set({

            name: "Los Angeles",
            state: "CA",
            country: "USA"

        })

            .then( () => {
                console.log("Document successfully written!");
            })
            .catch( err => {
                console.error("Error writing document: ", err);
            });*/


        /*firestore.collection("cities").add({

            name: "Tokyo",
            country: "Japan"

        })
            .then( docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch( err => {
                console.error("Error adding document: ", err);
            });*/


        firestore.collection("cities").doc("LA").update({

            population:99999

        })

            .then( () => {
                console.log("Document successfully written!");
            })
            .catch( err => {
                console.error("Error writing document: ", err);
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
