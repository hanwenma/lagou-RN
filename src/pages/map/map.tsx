import React from 'react'
import { WebView } from 'react-native-webview'

function Map (){
  return (
    <WebView
    source={{uri: 'https://map.baidu.com/mobile/webapp/index/index/'}}
    style={{flex:1,marginTop: 0}}></WebView>
  )
}

export default Map;