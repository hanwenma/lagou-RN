import React, { PureComponent } from 'react';
import { Text, View,StyleSheet,Alert, Image,TextInput,AsyncStorage,TouchableOpacity } from 'react-native';
import {inject,observer} from "mobx-react";
import { SafeAreaView } from 'react-native-safe-area-context';

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

}

@inject('store')
@observer
class login extends PureComponent<Prop,State> {

  state = {
    pass:'',
    tel:''
  }

  passInp(pass){
    this.setState({pass});
  }

  telInp(tel){
    this.setState({tel});
  }

  isExist(item,items){
    let flag = false;
   items.map( t =>{
      if(t.tel === item.tel){
        flag = true;
      }
    });
    return flag;
  }

  async register(currUser){
    var userList:any =  await AsyncStorage.getItem('userList');
    if(!userList){
      userList = [currUser];
    }else{
      userList = [...JSON.parse(userList)];
      let flag = this.isExist(currUser,userList);
      if(flag){
        await AsyncStorage.setItem('currUser',"");
        this.props.navigation.pop();
      }else{
        userList.push(currUser);
        this.props.navigation.push("Personalnfo");
      }
    }
    this.props.store.setIsLogin(true);
    await AsyncStorage.setItem('userList',JSON.stringify(userList));
    await AsyncStorage.setItem('currUser',JSON.stringify(currUser));
 }

 login(){
   let {pass,tel} = this.state;
  if(!pass||!tel){
    Alert.alert(
      '拉钩提示',
      '手机号码或密码不能为空！',
      [
        {text: '取消'},
        {text: '确定'},
      ],
      { cancelable: false });
      return;
  }
  // 登录成功
  if(Number(tel)&&tel.length==11){
    let currUser = {pass,tel};
    this.register(currUser);
  }else{
    Alert.alert(
      '拉钩提示',
      '请输入正确的手机号码！',
      [
        {text: '取消'},
        {text: '确定'},
      ],
      { cancelable: false });
      return;
  }
}

  render() {
    let {pass,tel} = this.state;
    return (
      <SafeAreaView>
        <View>
          <View style={styles.top}>
            <View>
              <Image 
              style={{width:30,height:30,}}
              source={{uri:'https://www.lgstatic.com/lg-mobileidt-fed/images/asset/custom/list/img/download_mascot.png'}} />
              <Text style={{fontSize:20,marginTop:0}}>登录拉钩</Text>
            </View>
            <Image 
             style={{width:40,height:40}}
             source={{uri:'https://www.lgstatic.com/lg-mobileidt-fed/images/asset/custom/list/img/download_logo_new.png'}} />
          </View>
          <View style={styles.passBox}>
            <TextInput
             keyboardType='numeric'
             style={styles.inp}
             value={tel}  
             onChangeText={text => this.telInp(text)}
             placeholder="请输入手机号码" />
            <TextInput
             style={styles.inp}  
             value={pass} 
             visible-password={false}
             onChangeText={text => this.passInp(text)}
             placeholder="请输入密码" />
          </View>
          <TouchableOpacity
          onPress={this.login.bind(this)}>
            <View style={styles.btn}>
              <Text style={styles.login}>登录</Text> 
            </View>
          </TouchableOpacity>
          
          <View style={{padding:20,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{color:'#c8c8c8'}}>登陆/注册代表你已同意</Text>
            <Text style={{color:'#019875'}}>《拉钩用户协议》</Text>
          </View>
          <View style={{padding:20,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{color:'#c8c8c8',flex:1}}>说明：</Text>
            <Text style={{color:'#c8c8c8',flex:6}}>若您没有账号系统会默认给您注册，请放心进行登录操作.</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default login;

const styles = StyleSheet.create({
  btn:{
    marginTop:50,
    alignSelf:'center',
    backgroundColor:'#1fc8a1',
    width:'80%',
    borderWidth:0,
    padding:10,
    borderRadius:5
  },
  login:{
    color:'#fff',
    fontSize:18,
    alignSelf:'center'
  },
  top:{
    padding:30,
    paddingTop:50,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  passBox:{
    padding:30,
  },
  inp:{
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    borderBottomColor:'#e8e8e8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  }
});