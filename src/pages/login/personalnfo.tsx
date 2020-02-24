import React, { PureComponent } from 'react';
import { Text, View,StyleSheet,Alert, Picker,TextInput,AsyncStorage,TouchableOpacity,ScrollView } from 'react-native';
import {inject,observer} from "mobx-react";
import Header from "../../common/header/header";

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

}

const data1 = ['最高学历','小学','初中','高中','大专','大学本科','研究生',
'博士', '硕士'];
const data2 = ['应届生','1年','2年','3年','4年','5年','6年','7年','8年','9年','10年','10年以上'];

@inject('store')
@observer
class Personalnfo extends PureComponent<Prop,State> {

  state = {
    name:'',
    email:'',
    tel:'',
    education:"最高学历",
    experience:'应届生'
  }

  valInp(val){
    this.setState(val);
  }

  async saveAction(){
    let {name,email,tel,education,experience} = this.state;
    let obj = {name,email,tel,education,experience};
    if(!name||!email||!tel||!education||education=="最高学历"){
      Alert.alert(
        '拉钩提示',
        '请完整填写您的个人信息，提高简历的投递效率！',
        [
          {text: '取消'},
          {text: '确定'},
        ],
        { cancelable: false });
        return;
    }else{
      Object.keys(obj).map((key)=>{
        this.props.store.setResume(key,obj[key]);
      });
      let currUser = await AsyncStorage.getItem("currUser");
      currUser && AsyncStorage.setItem('currUser',
      JSON.stringify({
        ...JSON.parse(currUser),
        ...this.props.store.resume
      }));
      this.props.navigation.push('Home');
    }
  }

  async componentDidMount(){
    let currUser = await AsyncStorage.getItem("currUser");
    if(currUser){
      let {name,email,tel,education,experience} = JSON.parse(currUser);
      this.setState({
        name,
        email,
        tel,
        education,
        experience
      });
    }
  }

  render() {

    return (
     <ScrollView>
       <Header title='姓名' />
       <View style={styles.body}>
        <TextInput
          style={{fontSize:16,color:'#1fc8a1'}}
          value={this.state.name}
          onChangeText={(name)=>this.valInp({name})} 
          placeholder="在这里输入你的姓名......" />
       </View>

       <Header title='学历' />
       <View style={styles.body}>
        <Picker
        selectedValue={this.state.education}
        style={{...styles.picker,color:this.state.education=='最高学历'?'red':'#1fc8a1'}}
        onValueChange={(itemValue, itemIndex) =>this.valInp({education: itemValue})} >
          {
            data1.map(item=>(
              <Picker.Item label={item} value={item} />
            ))
          }
       </Picker>
       </View>

       <Header title='工作年限' />
       <View style={styles.body}>
        <Picker
        selectedValue={this.state.experience}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) =>this.valInp({experience: itemValue})} >
          {
            data2.map(item=>(
              <Picker.Item label={item} value={item} />
            ))
          }
       </Picker>
       </View>

       <Header title='电话' />
       <View style={styles.body}>
        <TextInput
            keyboardType='numeric'
            style={{fontSize:16,color:'#1fc8a1'}}
            value={this.state.tel}
            onChangeText={(tel)=>this.valInp({tel})} 
            placeholder="在这里输入你的联系电话......" />
       </View>

       <Header title='邮箱' />
       <View style={styles.body}>
        <TextInput
            keyboardType='email-address'
            style={{fontSize:16,color:'#1fc8a1'}}
            value={this.state.email}
            onChangeText={(email)=>this.valInp({email})} 
            placeholder="在这里输入你的常用邮箱......" />
       </View>

       <TouchableOpacity
          onPress={this.saveAction.bind(this)}>
            <View style={styles.btn}>
              <Text style={styles.login}>保存</Text> 
            </View>
       </TouchableOpacity>
     </ScrollView>
    )
  }
}

export default Personalnfo;

const styles = StyleSheet.create({
  body:{
    padding:10
  },
  login:{
    color:'#fff',
    fontSize:18,
    alignSelf:'center'
  },
  btn:{
    marginTop:30,
    marginBottom:30,
    alignSelf:'center',
    backgroundColor:'#1fc8a1',
    width:'80%',
    borderWidth:0,
    padding:10,
    borderRadius:5
  },
  picker:{
    height: 50, 
    width: 130,
    fontSize:16,
    color:'#1fc8a1'
  },
});