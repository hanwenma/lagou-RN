import React from "react";
import {View,Text} from "react-native"; 
import Icons from "react-native-vector-icons/AntDesign";
import { StyleSheet } from 'react-native';

interface HeaderType{
  title: String,
}

const Header = (props:HeaderType) =>{
  return (
    <View style={styles.top}>
      <Text style={styles.topTxt}></Text>
      <Text style={{fontSize:18}}>{props.title}</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  top:{
    backgroundColor:'#eee',
    height:45,
    padding:10,
    flexDirection:'row',
    borderBottomColor:'#dbdbdb',
    borderBottomWidth:1,
    borderStyle:'solid'
  },
  topTxt:{
    width:6,
    height:16,
    backgroundColor:'#019875',
    marginRight:10,
    fontSize:14,
  },
});