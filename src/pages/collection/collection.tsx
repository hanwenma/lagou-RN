import React, { PureComponent } from 'react';
import { Text, View,StyleSheet,Image,FlatList,AsyncStorage,TouchableOpacity,ToastAndroid } from 'react-native';
import {inject,observer} from "mobx-react";
import Icons from "react-native-vector-icons/AntDesign";

interface Prop{
  store?:any,
  navigation?:any
}

interface State{
  [prop:string]:any
}

const Item = ({data,action})=>(
  <View style={styles.listContainer} >
    <Image 
    source={{uri:data.companyLogo}} 
    style={styles.image} />
    <View style={styles.rightBox}>
      <Text style={styles.title} numberOfLines={1}>{data.companyFullName}</Text>
      <TouchableOpacity
      onPress={action}
      style={styles.start}>
         <Icons name='star' color='#ffac38' size={20} />
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={{width:'60%'}} numberOfLines={1}>
          {data.positionName}
        </Text>
        <Text style={styles.price}>{data.salary}</Text>
      </View>
    <Text style={styles.time}>{data.createTime}</Text>
    </View>
  </View>
);

@inject('store')
@observer
export default  class Collection extends PureComponent<Prop,State> {

  state = {
    list:[]
  }

  delete(data){
    this.setState({
      list: this.state.list.filter(item=>data.positionId!=item.positionId)
    },()=>{
      ToastAndroid.showWithGravity(
        "已移出收藏",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      AsyncStorage.setItem('likes',JSON.stringify(this.state.list));
    });
  }
 
  async componentDidMount(){
    let list = await AsyncStorage.getItem('likes');
    list && this.setState({
      list: JSON.parse(list)
    });
  }

  render() {
    let {list} = this.state;
    return (
     <View style={{flex:1,backgroundColor:'#fff',overflow:'hidden'}}>
       {
         list.length?
        <FlatList 
        data={list}
        onEndReachedThreshold={0.2}
        renderItem={({item})=><Item data={item} action={this.delete.bind(this,item)}/>}
        />
        :<Text style={styles.tip}>~ 暂无收藏数据哦 ~</Text>
       }
     </View>
    )
  }
}



const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    padding:5,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderColor:'#e8e8e8',
    borderStyle:'solid',
    backgroundColor:'#fff', 
  },
  image: {
    height: 60,
    width: 60
  },
  rightBox:{
    paddingLeft:5
  },
  title:{
    fontSize: 18,
    fontWeight:'bold',
    width:'60%',
  },
  center:{
    flexDirection:'row',
    justifyContent:"space-between",
    fontSize: 16,
  },
  price:{
    color:'#00b38a',
    fontWeight:'bold',
    paddingLeft:10,
    width:'40%',
  },
  time:{
    fontSize:14,
    color:'#888'
  },
  loading:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f6f6f6',
    flexDirection:'row',
  },
  text:{
    fontSize: 16,
    color:'#999'
  },
  img:{
    width:60,
    height:60
  },
  tip:{
    fontSize:18,
    color:'#999',
    width:'100%',
    textAlign:"center",
    paddingTop: 40
  },
  start:{
    position:'absolute',
    left:'67%',
    top:5
  }
});