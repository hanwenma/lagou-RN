import React, { Component } from 'react';
import {Text,View,StyleSheet,FlatList,TouchableHighlight }  from "react-native"; 
import { SafeAreaView } from 'react-native-safe-area-context';
import cities from "../../data/cities.js"; 

interface Props {
  hideAction:any,
  store?:any
}
interface State {
  
}

  
const List = (({data,action,slectCity}) => (
  <View style={styles.listBody}>
    <Text style={styles.itemTitle}> {data.nameStr}</Text>
      <View style={styles.itemCon}>
        {
          data.cityList.map(val=>(
            <TouchableHighlight 
              style={{...styles.item,backgroundColor:slectCity==val?'#e7f3f0':'#fff'}}
              onPress={()=>action(val)}
              underlayColor="#e7f3f0">
              <Text key={val} style={styles.itemTxt}>{val}</Text>
          </TouchableHighlight>
          ))
        }
      </View>
  </View>
));



export default class city extends Component<Props, State> {

  hideAction(val){
    this.props.hideAction(false,val);
  }

  render() {
    return (
      <View style={styles.city}>
        <FlatList 
          data ={cities}
          renderItem={({item}) => <List data={item} action={this.hideAction.bind(this)} slectCity={this.props.store.slectCity}/>}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  city:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
    // translateY:-25,
  },
  listBody:{
    borderBottomWidth: 1,
    borderStyle:'solid',
    borderColor:'#e8e8e8',
  },
  itemTitle:{
    borderBottomWidth: 1,
    borderStyle:'solid',
    borderColor:'#e8e8e8',
    color:'#888',
    padding:5,
    paddingLeft:10
  },
  itemCon:{
    flexDirection:'row',
    flexWrap:'wrap'
  },
  item:{
    width:'33%',
    paddingTop:15,
    paddingBottom:15,
    
  },
  itemTxt:{
    color:'#555',
    textAlign:'center',
    fontSize: 16,
  }
});