import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,FlatList,Alert,TouchableHighlight} from "react-native";
import cities from "../../data/cities.js"; 
import {inject,observer} from "mobx-react"

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

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

@inject('store')
@observer
export default class City extends Component<Prop,State> {

  setAction(val){
    if(val){
      this.props.store.setCustomJobs('city',val);
      this.props.navigation.push("Salary");
    }else{
      Alert.alert(
        '拉钩提示',
        '请先输入要定制的职位！',
        [
          {text: '取消'},
          {text: '确定'},
        ],
        { cancelable: false });
    }
 }

 render(){
  return (
    <View style={{height:'100%'}}>
      <Image 
      style={styles.img}
      source={require("../../../assets/cbg.png")} />
      <View style={{flexDirection:'row'}}>
        <FlatList 
          data ={cities}
          renderItem={({item}) => <List data={item} action={this.setAction.bind(this)} slectCity={this.props.store.slectCity}/>}/>
      </View>
    </View>
  )
 }
}

const styles = StyleSheet.create({
  img:{
    height:126,
    width:'100%'
  },
  city:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff',
  },
  listBody:{
    borderBottomWidth: 1,
    borderStyle:'solid',
    borderColor:'#e8e8e8',
    backgroundColor:'#fff',
    paddingBottom:20
  },
  itemTitle:{
    borderBottomWidth: 1,
    borderStyle:'solid',
    borderColor:'#e8e8e8',
    color:'#888',
    padding:5,
    paddingLeft:10,
    backgroundColor:"#fff"
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