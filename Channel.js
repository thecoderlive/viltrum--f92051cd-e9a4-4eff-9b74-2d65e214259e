import React, { useState, useEffect, useReducer } from 'react'
import { Text,  ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './channel_data'
import ChannelVideoList from './ChannelVideoList'

function Channel({ navigation, route }){ 
const url = api.channel + route?.params?.id ?? "channel" 
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
<ScrollView style={styles.channel} showsVerticalScrollIndicator={false}>
<Text style={styles.channel_title} numberOfLines={1}>{item.channel_title}</Text>
<ChannelVideoList item={item.channel_video_list} navigation={navigation}/>
</ScrollView>
)}

export default Channel;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "channel_title": {
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "marginTop": 5,
        "fontWeight": "400",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    }
});