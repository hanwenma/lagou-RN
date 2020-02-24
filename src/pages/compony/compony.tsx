import React, { Component } from 'react'
import { Text, View,Image, FlatList,TouchableOpacity,Alert } from 'react-native';
import {observer,inject} from "mobx-react";
import Icons from "react-native-vector-icons/AntDesign";
import Http from "../../utils/http";
import Api from "../../utils/api";
import styles from "./style.js";

interface Prop{
  store?:any,
  navigation?:any
}

interface State{

}

let page = 0;

const data = [{key:'js',title:'技术'},{key:'cp',title:'产品'},{key:'sj',title:'设计'},{key:'yy',title:'运营'},{key:'zn',title:'职能'},{key:'jr',title:'金融'},{key:'scyx',title:'市场与销售'}];

const inital = data.map((item,index)=>{
  if(!index) return styles.active;
  return {};
});

const Top = ({store})=>(
  <View 
   style={styles.top}>
    <Image
    style={{height:60,width:60}}
    source={{uri:store.currJobInfo.companyLogo}} />
    <View style={{width:'65%'}}>
      <Text style={{
        color:'#00b38a',
        fontSize:20,
        fontWeight:'bold'
      }}>{store.currJobInfo.companyName}</Text>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Icons name="enviromento" size={14} color="#00b38a"/>
        <Text style={{paddingLeft:5,fontSize:14,color:'#555'}}>{store.currJobInfo.city}</Text>
      </View>
      <Text style={{color:'#888',fontSize:12}}>
        移动互联网/上市公司/2000人以上
      </Text>
    </View>
    <Image
    source={require('../../../assets/pic.png')} />
  </View>
);

const activeAction = (self,sty,index,key)=>{
  self.setState({
    itemStyle: sty.map((it,id,arr)=>{if(index===id)return arr[id]=styles.active}),
    key
   },()=>{
    self.getJobList();
   });
}

const Center = ({sty,self})=>(
  <View >
    <Text style={{color:'#555',paddingLeft:10,paddingTop:10}}>职位分类</Text>
    <View style={styles.box}>
    {
      data.map((item,index)=>(
        <Text key={item.key} 
         onPress={()=>activeAction(self,sty,index,item.title)}
        style={{...styles.boxItem,...sty[index]}}>{item.title}</Text>
      ))
    }
    </View>
  </View>
);

const toDetail = (data,self)=>{
  self.props.store.setCurrJobInfo(data);
  self.props.navigation.replace("Dtail");
}

const Item = ({data,self})=>(
  <TouchableOpacity onPress={()=>toDetail(data,self)}>
    <View style={styles.itemBox}>
      <View style={{width:'80%'}}>
        <Text
        numberOfLines={1} 
        style={{fontSize:16,color:'#555',width:'90%'}}>
          {data.positionName+`[${data.city}]`}
        </Text>
        <Text style={{color:'#888'}}>{data.createTime}</Text>
      </View>
      <Text style={{fontSize:16,color:'#00b38a',fontWeight:'bold'}}>{data.salary}</Text>
    </View>
  </TouchableOpacity>
);

const Loading = ({action,title})=>(
   <Text 
    style={{width:"100%",textAlign:'center',padding:10,color:"#999",backgroundColor:'#fff'}}
    onPress={action}>{title}</Text>
);

@inject('store')
@observer
class mine extends Component<Prop,State> {

  state = {
    itemStyle: inital,
    key:"技术",
    city: this.props.store.currJobInfo.city,
    dataList:[],
    title:'加载更多'
  }

  async getJobList(){
    page++;
    let rs = await Http.fecth_get(Api.COMPONY_JOBS+`pageNo=${page}&companyId=${this.props.store.currJobInfo.companyId}&positionFirstType=${this.state.key}`);
    let dataList:any[] = rs.content.data.pageMap[this.state.key].result.map(item=>{
      item.key = item.positionId+'key';
      item.companyLogo = "http://www.lgstatic.com/"+item.companyLogo;
      return item;
    });
    if(!dataList.length){
      this.setState({title:'~ 暂无更多数据 ~'});
      page=0;
      Alert.alert('消息通知',
      `暂时没有发现有关[${this.state.key}]的职位`,
      [
        {text: '关闭'},
        {text: '确认'}
      ],
      { cancelable: false })
    }else{
      this.setState({dataList});
    }
  }
  
  componentDidMount(){
    this.getJobList();
  }

  render() {
    let store = this.props.store;
    return (
      <View style={styles.root}>
        <Top store={store}/>
        <Center sty={this.state.itemStyle} self={this}/>
        <FlatList 
         onEndReachedThreshold={0.2}
         data={this.state.dataList}
         ListFooterComponent={<Loading action={this.getJobList.bind(this)} title={this.state.title}/>}
         renderItem={({item})=><Item  self={this} data={item}/>} />
      </View>
    )
  }
}

export default mine;
