import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,FlatList,Alert} from "react-native";
import {inject,observer} from "mobx-react"

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

}

const data = [{key:'1',txt:'没有要求'},{key:'2',txt:'2k以下'},{key:'3',txt:'2k-5k'},{key:'4',txt:'5k-10k'},{key:'5',txt:'10k-15k'},{key:'6',txt:'15k-25k'},{key:'7',txt:'25k-50k'},{key:'8',txt:'50k以上'}];


@inject('store')
@observer
export default class Salary extends Component<Prop,State> {

  setAction(val){
    if(val){
      this.props.store.setCustomJobs('salary',val);
      this.props.navigation.push("Type");
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
      source={require("../../../assets/sbg.png")} />
      <FlatList 
       data={data}
       renderItem={({item})=><Text onPress={this.setAction.bind(this,item.txt)} style={styles.txt}>{item.txt}</Text>}/>
    </View>
  )
 }
}

const styles = StyleSheet.create({
  img:{
    height:126,
    width:'100%'
  },
  inp:{
    borderStyle:'solid',
    borderColor:"#e8e8e8",
    borderWidth:1,
    width:'85%',
    height:44,
    paddingLeft:10,
    fontSize:16,
  },
  btn:{
    borderStyle:'solid',
    borderColor:"#e8e8e8",
    borderBottomWidth:1,
    width:"15%",
    textAlign:'center',
    lineHeight:40,
    fontSize:16,
    color:'#888',
    fontWeight:'bold'
  },
  txt:{
    borderStyle:'solid',
    borderColor:"#e8e8e8",
    borderBottomWidth:1,
    padding:15,
    fontSize:16,
    color:'#888',
    backgroundColor:"#fff"
  }
});