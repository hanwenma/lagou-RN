import React from 'react'
import { Text, View } from 'react-native'

function comment () {
  return (
    <View style={{paddingLeft:10,paddingRight:10,paddingBottom:20,paddingTop:20,backgroundColor:'#fff'}}>
      <Text style={{color:'#888'}}> 暂无面试评论 </Text>
    </View>
  )
}

export default comment;
