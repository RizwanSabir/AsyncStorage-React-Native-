import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
export default function App() {

  
   let [data,setData]=useState(null);



  useEffect(() => {
    AsyncStorage.getItem('tdata').then((data) => {
      if (data) {
        // Data exists
        let originalForm = JSON.parse(data);
        setData(originalForm)
        console.log(originalForm);
      } else {
        let controller =new AbortController()
      fetch('https://jsonplaceholder.typicode.com/todos',{signal:controller.signal})
      .then(response => response.json())
      .then(json => {
        console.log("data is fetching in elseblock");
        AsyncStorage.setItem('tdata', JSON.stringify(json));
        setData(json)
      })

      return () => {
        controller.abort();
      }
      }
    });
  }, []);


  return (
 <SafeAreaView style={{height:"100%",}}>



    <View style={styles.container}>
      <Text style={{fontSize:22 ,height:32,borderBottomColor:"black",borderBottomWidth:2}}>Using GET API</Text>
      <StatusBar style="auto" />
      <FlatListExample  data={data}/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const FlatListExample = ({ data }) => {
  const renderItem = ({ item }) => (
    <View key={item.id} style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Ensure key is a string
    />
  );
};
