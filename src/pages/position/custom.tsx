import React,{useCallback,useEffect,useState} from "react";
import {StyleSheet,View,Text,AsyncStorage} from "react-native";
import Icons from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';

const Custom = ({store}) =>{
  const navigation = useNavigation();

  const [flag, setFlag] = useState(store.isLogin);

  const handleTap = useCallback(() => {
    if(store.isLogin){
      navigation.navigate('Job');
      setFlag(true);
    }else{
      setFlag(false);
      navigation.navigate('Login');
    }
  },[]);

  const Modify = ()=>(
    <>
      <Icons name="edit" size={15} color='#00b38a'></Icons>
      <Text style={{color:'#00b38a',paddingLeft:5}}>
      编辑
      </Text>
    </>
  );

  useEffect(()=>{
    AsyncStorage.getItem("currUser")
    .then((rs)=>{
      rs && store.setIsLogin(true);
    })
  },[]);

  return (
  <View style={styles.box}>
    <Text
    numberOfLines={1} 
     style={{color:'#555',width:"70%"}}>
      {store.customJobs.city?store.customInfo:'10秒钟定制职位'}
      </Text>
    <View style={styles.btn} onTouchStart={handleTap}>
        {
          flag ?
          <Modify />
          : <Text style={{color:'#00b38a',paddingLeft:5}}>
          去登陆
          </Text>
        }
    </View>
  </View>
  )
};


export default React.memo(Custom);

const styles = StyleSheet.create({
  box:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderColor:'#e8e8e8',
    borderStyle:'solid',
    borderWidth:1,
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  btn:{
    borderRadius:15,
    paddingTop:5,
    paddingBottom:5,
    paddingRight:10,
    paddingLeft:10,
    backgroundColor:'#f5f5f5',
    flexDirection:'row',
    alignItems:'center'
  }
});