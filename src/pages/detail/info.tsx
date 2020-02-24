import React,{useState,useMemo,useCallback} from 'react'
import { Text, View,StyleSheet,Image,TouchableOpacity,AsyncStorage,ToastAndroid } from 'react-native'
import Icons from "react-native-vector-icons/AntDesign";

function info ({store,navigation}) {
  
  let [star, setStar] = useState(1);

  let type = useMemo(()=>{
    return star % 2 != 0 ? 'staro': 'star'
  },[star]);
  
  let data = store.currJobInfo;

  const isLogin = useCallback(()=>{
    if(!store.isLogin){
      ToastAndroid.showWithGravity(
        "请先登录，在进行此操作！",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    return true;
  },[]);

  const toCompony = useCallback(()=>{
    if(!isLogin()) return;
    navigation.push('Compony');
  },[]);

  const collection = useCallback(async ()=>{
    if(!isLogin()) return;
    let like:any = await AsyncStorage.getItem('likes');
    like = like?JSON.parse(like):[];
    if(star%2==0){
      let data = store.currJobInfo;
      like.push(data);
    }
    setStar(star++);
    await AsyncStorage.setItem('likes',JSON.stringify(like));
  },[star]);

  return (
    <View style={{backgroundColor:'#fff'}}>
      <View style={styles.top}>
        <Text 
         numberOfLines={1}
         style={styles.position}>
          {data.positionName}
        </Text>
        <TouchableOpacity 
         style={styles.right}
         onPress={collection} >
          <Icons name={type} color='#ffac38' size={15} style={{alignSelf:'center'}}/>
          <Text style={{color:'#888'}}>{type=='staro'?'未收藏':'已收藏'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <View style={styles.centerItem}>
          <Icons name="pay-circle-o1" color='#00b38a' size={15} />
          <Text style={styles.txt}>{data.salary}</Text>
        </View>
        <TouchableOpacity
        onPress={()=>navigation.push("Map")} 
        style={{...styles.centerItem,justifyContent:'center'}}>
          <Icons name="enviromento" color='#00b38a' size={15} />
          <Text style={styles.txt}>{data.city}</Text>
        </TouchableOpacity>
        <View style={{...styles.centerItem,justifyContent:'flex-end'}}>
          <Icons name="clockcircleo" color='#00b38a' size={15} />
          <Text style={styles.txt}>全职</Text>
        </View>
        <View style={styles.centerItem}>
          <Icons name="switcher" color='#00b38a' size={15} />
          <Text style={styles.txt}>1-3年</Text>
        </View>
        <View style={{...styles.centerItem,justifyContent:'center'}}>
          <Icons name="file-markdown" color='#00b38a' size={15} />
          <Text style={styles.txt}>学历不限</Text>
        </View>
        <Text style={styles.desc}>
          职位诱惑:五险一金、 节假日福利、餐补、体检等等
        </Text>
      </View>
      <View>
        <TouchableOpacity 
         style={styles.bto}
         onPress={toCompony}>
          <Image
          style={{height:60,width:60}}
          source={{uri:data.companyLogo}} />
          <View style={{width:'65%'}}>
            <Text style={{
              color:'#00b38a',
              fontSize:20,
              fontWeight:'bold'
            }}>{data.companyName}</Text>
            <Text style={{color:'#888',fontSize:12}}>
              移动互联网/上市公司/2000人以上
            </Text>
          </View>
          <Image
          source={require('../../../assets/pic.png')} />
         </TouchableOpacity>
      </View>
    </View>
  )
}

export default info;

const styles = StyleSheet.create({
  top:{
    padding:10,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent:"space-between",
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#e8e8e8',
    borderBottomWidth:1,
    borderStyle:'solid',
    marginBottom: 5
  },
  position:{
    fontSize: 18,
    color:'#333',
    width:'80%'
  },
  star:{
    width:50,
    height:50
  },
  desc:{
    paddingTop:5,
    paddingBottom:10,
    color:'#888'
  },
  right:{
    
  },
  center:{
    paddingLeft:10,
    paddingRight:10,
    flexDirection:'row',
    flexWrap:'wrap',
    borderColor:'#e8e8e8',
    borderBottomWidth:1,
    borderStyle:'solid',
    marginBottom: 5
  },
  centerItem:{
    width:'33%',
    paddingTop:10,
    paddingBottom:10,
    flexDirection:'row',
    alignItems:'center'
  },
  txt:{
    paddingLeft:5
  },
  bto:{
    flexDirection:'row',
    padding:10,
    justifyContent:'space-around',
    alignItems:'center'
  }
});