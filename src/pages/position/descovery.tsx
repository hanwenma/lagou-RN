import React from 'react';
import { View, AsyncStorage } from 'react-native';
import {observer,inject} from "mobx-react";
import JobList from "../../common/job-list/jobList";
import Custom from "./custom";
import styles from "../style.js";
import Http from "../../utils/http";
import Api from "../../utils/api";

interface Prop{
  store:any
}

interface State{
  list:any[]
}

let page = 0;

@inject("store")
@observer
class Descovery extends React.Component<Prop,State>{  
  state = {
    list:[]
  };

  async getList ({type}){
    page++;
    const rs:any = await Http.fecth_get(Api.DESCOVERY_JOBS+page);
    let data:any[] = rs.content.data.page.result;
    data = data.map(item=>{
      item.key = item.positionId+'key';
      item.companyLogo = "http://www.lgstatic.com/"+item.companyLogo;
      return item;
    });
    if(type === 'l'){
      if(data.length!=0){
        this.setState({list:this.state.list.concat(data)});
      }else{
        page = 0;
      }
    }else{
      this.setState({list: data});
    }
  };

 async componentDidMount(){
    let personal = await AsyncStorage.getItem("currUser");
    personal && this.props.store.setIsLogin(true);
    this.getList({type:'l'});
  }

  render(){
    let {store} = this.props;
    return (
      <View style={styles.page}>
        <Custom store={store}/>
        <JobList 
          store={store} 
          getList={this.getList.bind(this)} 
          list={this.state.list}/>
      </View>
    )
 }
}

export default Descovery;
