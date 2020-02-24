import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,TextInput,FlatList,Alert} from "react-native";
import {inject,observer} from "mobx-react"

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

}

const data = [{key:'1',txt:'没有要求'},{key:'2',txt:'初创型(天使轮及未融资)'},{key:'3',txt:'成长型( A轮或B轮融资)'},{key:'4',txt:'成熟型( C轮融资以上但未上市)'},{key:'5',txt:'上市公司'}];

@inject('store')
@observer
export default class Type extends Component<Prop,State> {

  setAction(val){
    if(val){
      this.props.store.setCustomJobs('companyType',val);
      this.props.navigation.push("Home");
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
      source={require("../../../assets/gbg.png")} />
      <FlatList 
       data={data}
       renderItem={({item})=><Text onPress={()=>this.setAction(item.txt)} style={styles.txt}>{item.txt}</Text>}/>
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