import React, { Component } from 'react'
import { Text, View,Image,StyleSheet,AsyncStorage,ToastAndroid,TouchableOpacity } from 'react-native';
import {observer,inject} from "mobx-react";
import Icons from "react-native-vector-icons/AntDesign";
import styles from "../style.js";

const data = [
  {key:'td',text:'投递'},
  {key:'ms',text:'面试'},
  {key:'yy',text:'邀约'},
  {key:'sc',text:'收藏'}
];

const Block =({item,action})=>(
  <TouchableOpacity
  onPress={action}  
  style={sty.block}>
    <Text style={sty.txt}>{item.text}</Text>
  </TouchableOpacity>
);

interface Prop{
  store?:any,
  navigation?:any
}

interface State{
  
}

@inject('store')
@observer
export default class Mine extends Component<Prop,State> {

  unsubscribe = null; 

  async logout(){
    await AsyncStorage.setItem('currUser','');
    this.props.store.setIsLogin(false);
  }

  toCllect(){
    if(!this.props.store.isLogin){
      this.tips("您还没有登陆，请先进行登录！");
      return;
    }
    this.props.navigation.push("Collection");
  }

  otherBlock(){
    if(!this.props.store.isLogin){
      this.tips("您还没有登陆，请先进行登录！");
    }else{
      this.tips("此板块有待完善，敬请期待！");
    }
  }

  tips(title:string){
    ToastAndroid.showWithGravity(
      title,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  async inital(){
    const personnal:any = await AsyncStorage.getItem("currUser");
    if(personnal){
     let obj = JSON.parse(personnal);
     Object.keys(obj).map(key=>{
      this.props.store.setResume(key, obj[key]);
     });
    }
  }

  componentDidMount(){
    this.inital();
  }


  render() {

    const Lgonin = ()=>(
      <View 
      style={{...sty.btn,marginTop:50,marginBottom:80,width:'40%'}}>
        <Text style={sty.logout} onPress={()=>this.props.navigation.push("Login")}>登录/注册</Text> 
     </View>
    )
    let {name,attr} = this.props.store.resume;
    return (
      <View style={{...styles.page,backgroundColor:'#fff',height:'100%'}}>
        
        { this.props.store.isLogin ?
        <View style={sty.attr}>
          <View style={sty.resume}>
            <Text style={sty.resumeTxt} onPress={()=>this.props.navigation.push('Resume')}>简历</Text>
            <Icons name="right" size={14} color='#1fc8a1' />
          </View>
          <Image 
          style={sty.img}
          source={{uri:attr?attr:'https://www.lgstatic.com/images/myresume/default_headpic.png'}} />
          <Text style={sty.name}>{name||'快点击简历完善信息吧'}</Text>
        </View>
        :<Lgonin /> }

        <View style={sty.blockBox}>
          {data.map(item=>(
            <Block 
             item={item} 
             action={item.key=="sc"?this.toCllect.bind(this):this.otherBlock.bind(this)}/>
          ))}
        </View>

        {  this.props.store.isLogin &&
        <TouchableOpacity onPress={this.logout.bind(this)}>
          <View style={sty.btn}>
              <Text style={sty.logout}>退出登录</Text> 
          </View>
        </TouchableOpacity>}
      </View>
    )
  }
}

const sty = StyleSheet.create({
  resume:{
    position:'absolute',
    right:10,
    top: 20,
    flexDirection:'row',
    alignItems:'center'
  },
  resumeTxt:{
    color:'#1fc8a1',
    paddingRight:2,
    fontSize:15
  },
  attr:{
    height:150,
    alignItems:'center',
    justifyContent:'center'
  },
  img:{
    width: 80,
    height: 80,
    borderRadius: 60,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor:'#f6f6f6'
  },
  name:{
    paddingTop: 5,
    fontSize: 16,
    color:'#1fc8a1'
  },
  blockBox:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  block:{
    backgroundColor: '#1fc8a1',
    width: 165,
    height: 86,
    margin: 6,
    alignItems:'center',
    justifyContent:'center'
  },
  txt:{
    color: "#fff",
    fontSize: 20
  },
  btn:{
    marginTop:10,
    alignSelf:'center',
    backgroundColor:'#1fc8a1',
    width:'80%',
    borderWidth:0,
    padding:10,
    borderRadius:5
  },
  logout:{
    color:'#fff',
    fontSize:18,
    alignSelf:'center'
  }
}); 