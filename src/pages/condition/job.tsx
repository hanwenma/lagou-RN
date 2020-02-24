import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,TextInput,FlatList,Alert} from "react-native";
import {inject,observer} from "mobx-react"

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

}

const data = [{key:'1',txt:'产品经理'},{key:'2',txt:'Java'},{key:'3',txt:'运营'},{key:'4',txt:'Android'},{key:'5',txt:'PHP'},{key:'6',txt:'UI'},{key:'7',txt:'IOS'},{key:'8',txt:'编辑'},{key:'9',txt:'BD'}];

@inject('store')
@observer
export default class Job extends Component<Prop,State> {

  state = {
    val:''
  }

  valInp(val){
    this.setState({val}); 
  }

  setAction(val) {
    if(val){
      this.props.store.setCustomJobs('positionName',val);
      this.props.navigation.push("City");
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

  render() {
    return (
      <View style={{height:'100%'}}>
        <Image 
        style={styles.img}
        source={require("../../../assets/jbg.png")} />
        <View style={{flexDirection:'row'}}>
          <TextInput
          style={styles.inp} 
          placeholder="输入你想定制的职位"
          value={this.state.val} 
          onChangeText={text => this.valInp(text)}/>
          <Text style={styles.btn} onPress={()=>this.setAction(this.state.val)}>ok</Text>
        </View>
        <FlatList 
        data={data}
        renderItem={({item})=><Text onPress={()=>this.valInp(item.txt)} style={styles.txt}>{item.txt}</Text>}/>
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
    color:'#888'
  }
});