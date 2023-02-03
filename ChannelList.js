import React from 'react'
import { TouchableOpacity, Text,  View, FlatList, StyleSheet } from 'react-native'

import VideoList from './VideoList'

function ChannelList({ item, navigation }){

function channelListItem({ item }){
return (
<View style={styles.channel_list_item}>
<TouchableOpacity onPress = {() => {navigation.navigate("Channel", { id: item.id })}}>
<Text style={styles.channel_title} numberOfLines={1}>{item.channel_title}</Text>
</TouchableOpacity>
<VideoList item={item.video_list} navigation={navigation}/>
</View>
)}

return (
<FlatList
    style={styles.channel_list}
    data={item}
    renderItem={channelListItem}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    />
)}

export default ChannelList;

const styles = StyleSheet.create({
    "channel_title": {
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "marginTop": 5,
        "fontWeight": "400",
        "marginHorizontal": 10,
        "paddingHorizontal": 2
    }
});