import React, { useState, useEffect, useReducer } from 'react'
import { Image, Text,  ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './video_data'


function Video({ navigation, route }){ 
const url = api.video + route?.params?.id ?? "video" 
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
<ScrollView style={styles.video} showsVerticalScrollIndicator={false}>
<Image
    style={styles.thumbnail}
    source={{uri: item.thumbnail}}
    />
<Text style={styles.video_title} numberOfLines={1}>{item.video_title}</Text>
</ScrollView>
)}

export default Video;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "thumbnail": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    },
    "video_title": {
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "marginTop": 5,
        "fontWeight": "400",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    }
});