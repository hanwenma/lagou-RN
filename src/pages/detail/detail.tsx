import React, { PureComponent } from 'react';
import { Text, View,ScrollView,StyleSheet, Alert,ToastAndroid } from 'react-native';
import { inject,observer } from "mobx-react";
import Info from "./info";
import Request from "./requst";
import Comment from "./comment";

const Head = (props)=>(
  <Text style={{backgroundColor:'#d2f9f0',color:'#00b38a',fontSize:16,width:'100%',paddingTop:10,paddingBottom:10,paddingLeft:10}}>{props.title}{props.count>=0&&`（${props.count}）`}</Text>
);

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

}

@inject("store")
@observer
class detail extends PureComponent<Prop,State> {

  diliver(){
    if(!this.props.store.isLogin){
      ToastAndroid.showWithGravity(
        "请先登录，在进行此操作！",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    Alert.alert('消息通知',
    '您的简历已经成功提交，请耐心等待！',
    [
      {text: '关闭'},
      {text: '确认'}
    ],
    { cancelable: false });
  }

  render() {
    return (
      <View style={styles.box}>
        <ScrollView>
          <Info store={this.props.store} navigation={this.props.navigation}/>
          <Head title="职位详情"/>
          <Request />
          <Head title="面试评价" count={0}/>
          <Comment />
        </ScrollView>
        <View style={styles.wrap}>
          <Text 
            onPress={this.diliver.bind(this)}
            style={styles.btn}>投递简历</Text>
        </View>
      </View>
    )
  }
}

export default detail;

const styles = StyleSheet.create({
  box:{
    paddingBottom:82
  },
  btn:{
    backgroundColor:'#00b38a',
    borderRadius:5,
    alignSelf:'center',
    padding:10,
    color:'#fff',
    fontSize:18,
    width:'80%',
    textAlign:'center'
  },
  wrap:{
    backgroundColor:'#fff',
    paddingBottom: 20,
    paddingTop: 20,
    position:'absolute',
    bottom:0,
    width:'100%',
    zIndex:10
  }
});