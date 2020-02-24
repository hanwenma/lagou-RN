import React, { Component } from 'react'
import { Text, View,Image,StyleSheet,TouchableOpacity,AsyncStorage,ToastAndroid } from 'react-native';
import { Camera } from 'expo-camera';
import styles from "../style.js";
import {inject,observer} from "mobx-react";
import Icons from "react-native-vector-icons/AntDesign";

interface Prop{
  store?:any,
  navigation?:any
}

interface State{
  camera?:any,
  photos: string,
  hasPermission: any,
  [prop:string]:any
}

@inject('store')
@observer
export default class Resume extends Component<Prop,State> {
  [prop:string]:any;

  constructor(props){
    super(props);
    this.state = {
      photos:'https://www.lgstatic.com/images/myresume/default_headpic.png',
      hasPermission: null,
      back: true,
      flag: false,
      defualt:'未知'
    }
  }

  async takePicture(){
    ToastAndroid.showWithGravity(
      "正在生成图片",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.store.setResume('attr', photo.uri);
      this.setState({
        flag: false,
        photos: photo.uri
      });
      let currUser = JSON.parse(await AsyncStorage.getItem("currUser"));
      await AsyncStorage.setItem('currUser',JSON.stringify({
        ...currUser,
        ...this.props.store.resume
      }))
      
    }
  };

  _handleButtonPress(){
    this.setState({
        flag: true,
        back: !this.state.back
    });
  };

  async inital(){
    const personnal:any = await AsyncStorage.getItem("currUser");
    if(personnal){
     let obj = JSON.parse(personnal);
     if(obj.name){
      Object.keys(obj).map(key=>{
        this.props.store.setResume(key, obj[key]);
       });
     }else{
      this.props.store.setResume("name",'');
      this.props.store.setResume("attr",'');
      this.props.store.setResume("education",'');
      this.props.store.setResume("experience",'');
      this.props.store.setResume("tel",personnal.tel);
      this.props.store.setResume("email",'');
     }
    }
  }

 async componentDidMount(){
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({hasPermission: status === 'granted' });
    this.inital();
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.inital();
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {
    let {name,email,tel,education,attr,experience} = this.props.store.resume;
    let {defualt} = this.state;
    return (
      <View style={{...styles.page,backgroundColor:'#f9f9f9',height:'100%'}}>
        <View style={{marginTop:10,padding:10}}>
          <View style={sty.attr}>
            <Image
            source={{uri:'https://m.lagou.com/images/myresume/resume_head.png'}}
            style={sty.bg}
            />
            <TouchableOpacity 
            onPress={ this._handleButtonPress.bind(this)}>
                <Image 
                style={sty.img}
                source={{uri:attr?attr:this.state.photos}} />
            </TouchableOpacity>
            <Text style={sty.name}>{name}</Text>
          </View>

          <View>
            <View style={sty.top}>
              <Text style={sty.topTxt}></Text>
              <Text style={{fontSize:20}}>基本信息</Text>
            </View>
            <View style={sty.center}>
              <Text style={sty.infoTxt}>最高学历：{education||defualt}</Text>
              <Text style={sty.infoTxt}>工作年限：{experience||defualt}</Text>
              <Text style={sty.infoTxt}>联系电话：{tel||defualt}</Text>
              <Text style={sty.infoTxt}>联系邮箱：{email||defualt}</Text>
            </View>
            <View style={sty.bto}>
              <Text style={sty.btoTxt}>我是{education?education+'生':defualt}</Text>
            </View>
          </View>
          <View style={sty.person}>
            <Icons name="edit" size={16} color='#1fc8a1' />
            <Text style={sty.resumeTxt} onPress={()=>this.props.navigation.push('Personalnfo')}>编辑个人资料</Text>
         </View>
        </View>

        {this.state.flag && 
        <Camera 
        style={{
        position:'absolute',
        top:0,
        left:0,
        width:"100%",
        height:'100%',
        justifyContent:'flex-end'}}
        type={this.state.back
          ?Camera.Constants.Type.back
          :Camera.Constants.Type.front}  
         ref={ref => this.camera = ref}>
          <Text style={{
            color:'#555',
            alignSelf:'center',
            paddingLeft:10,
            lineHeight:40,
            padding:5,
            marginBottom:5,
            borderRadius:50,
            backgroundColor:'#eee',
            width:50,
            height:50
          }} onPress={this.takePicture.bind(this)}>拍照</Text>
          <TouchableOpacity
          onPress={this._handleButtonPress.bind(this)}
          style={{position:'absolute',right:10,top:10}} >
            <Icons
            name="camerao" 
            size={30} 
            color="#fff" />
           </TouchableOpacity>
        </Camera>}
      </View>
    )
  }
}

const sty = StyleSheet.create({
  person:{
    paddingTop:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  resumeTxt:{
    color:'#1fc8a1',
    paddingLeft:5,
    fontSize:16
  },
  bg:{
    height:75,
    width:'100%',
    position:"absolute",
    top:0,
    left:0,
    zIndex:-1
  },
  attr:{
    overflow:'hidden',
    height:150,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    borderTopRightRadius:10,
    borderTopLeftRadius:10
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
  },
  top:{
    backgroundColor:'#eee',
    height:45,
    padding:10,
    flexDirection:'row'
  },
  topTxt:{
    width:8,
    height:16,
    backgroundColor:'#019875',
    marginRight:10,
  },
  center:{
    backgroundColor:'#fff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft:10,
    paddingRight: 10
  },
  bto:{
    backgroundColor:'#eee',
    height:70,
    justifyContent:'center',
    alignItems:'center'
  },
  btoTxt:{
    fontSize: 17
  },
  infoTxt:{
    fontSize: 18
  }
}); 