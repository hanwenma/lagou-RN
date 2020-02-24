import React from 'react';
import Icons from "react-native-vector-icons/AntDesign";
import {View,Text,TextInput,StyleSheet,Alert,TouchableOpacity} from "react-native";

interface Prop{
  showAction: any,
  store?: any,
  searchAction: ({positionName,type})=>void
}

interface Sate{
  
}

export default class Top extends React.Component<Prop,Sate>{
  state = {
    value: '',
  };
  onChange = value => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };

  showAction(){
   this.props.showAction(true);
  }

  searchAction(){
    if(!this.state.value){
      Alert.alert(
      '系统提示',
      '请先输入你要查询的职位或公司！',
      [
        {text: '取消'},
        {text: '确定'},
      ],
      { cancelable: false });
      return;
    }
    this.props.searchAction({positionName:this.state.value,type:'r'});
  }

  render(){
    return(
      <View style={styles.top}>
        <View style={styles.left} onTouchStart={this.showAction.bind(this)}>
          <Text numberOfLines={1}
           style={styles.city}>{this.props.store.slectCity}
          </Text>
          <Icons name="down" size={12} color="#555" style={{translateY:2}}/>
        </View>
        <View style={styles.right} >
          <TextInput
            style={styles.input}
            placeholder="搜索职位或公司"
            onChangeText={(value) => this.setState({value})}
            value={this.state.value}
          />
          <TouchableOpacity 
           onPress={this.searchAction.bind(this)}>
            <View style={{padding:5}}>
              <Icons name="search1"  size={20} color='#ccc' />
            </View>
          </TouchableOpacity>
        </View>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top:{
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'#e8e8e8',
    flexDirection:'row',
    backgroundColor:'#fff'
  },
  left:{
    flexDirection:'row',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
    width:'25%',
    borderRightWidth:1,
    justifyContent:'center',
    borderStyle:'solid',
    borderRightColor:'#e8e8e8'
  },
  city:{
    maxWidth:'70%',
    textAlign:'center',
    color:'#555',
    fontSize:15,
    paddingRight:1
  },
  right:{
    width:'75%',
    flexDirection:'row',
    alignItems:'center'
  },
  input:{
    height:40,
    fontSize:16,
    paddingLeft: 20,
    paddingRight: 20,
    width:'82%',
    marginRight:10
  }
});