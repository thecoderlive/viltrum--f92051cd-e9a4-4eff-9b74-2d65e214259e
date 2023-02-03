import React, { useState, useEffect, useReducer } from 'react'
import {  ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './home_data'
import ChannelList from './ChannelList'

function Home({ navigation, route }){ 
const url = api.home ?? "home" 
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state



async function getItem() {
      dispatch(actionCreators.loading())

      try {
        if (url in history){
           dispatch(actionCreators.local(history[url]))
        } else if (url.indexOf('https') > -1){
          const response = await fetch(url)
          const json = await response.json()
          if(json){
            dispatch(actionCreators.success(json, url))
          }   
        } else {
          const json = route.params?.id ? data[route.params?.id] : items.item.channel_list
          dispatch(actionCreators.success(json, url))
        }
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

useEffect(() => {
    getItem();
}, []);
  
if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
    )
}

return(
<ScrollView style={styles.home} showsVerticalScrollIndicator={false}>
<ChannelList item={item} navigation={navigation}/>
</ScrollView>
)}

export default Home;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "alignItems": "center",
        "justifyContent": "center"
    }
});