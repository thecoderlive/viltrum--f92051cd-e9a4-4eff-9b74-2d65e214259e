import React from 'react'
import { Image, TouchableOpacity, Text,  View, FlatList, StyleSheet } from 'react-native'



function HistoryList({ item, navigation }){

function historyListItem({ item }){
return (
<View style={styles.history_list_item}>
<TouchableOpacity onPress = {() => {navigation.navigate("Video", { id: item.id })}}>
<Text style={styles.video_title} numberOfLines={1}>{item.video_title}</Text>
</TouchableOpacity>
<TouchableOpacity onPress = {() => {navigation.navigate("Video", { id: item.id })}}>
<Image
    style={styles.thumbnail}
    source={{uri: item.thumbnail}}
    />
</TouchableOpacity>
</View>
)}

return (
<FlatList
    style={styles.history_list}
    data={item}
    renderItem={historyListItem}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    />
)}

export default HistoryList;

const styles = StyleSheet.create({
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