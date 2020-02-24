import React, { Component } from 'react'
import { View } from 'react-native'
import {observer,inject} from "mobx-react";
import Top from "./top";
import City from "./city";
import styles from "../style.js";
import JobList from "../../common/job-list/jobList";
import Http from "../../utils/http";
import Api from "../../utils/api";



interface Prop{
  showAction:any,
  store?: any
}

interface State{
  
}

let page = 0;

@inject("store")
@observer
export default class search extends Component<Prop,State> {
  state = {
    showCityList: false,
    jobData: []
  };

  changeState = (bool:boolean,city?:string)=>{
    this.setState({
      showCityList: bool
    });
    if(city){
      this.props.store.setSlectCity(city);
    }
  }

  async searchJobs({type}){
    page++;
    let rs = await Http.fecth_get(Api.DESCOVERY_JOBS+page);
    let data:any[] = rs.content.data.page.result;
    data = data.map(item=>{
      item.key = item.positionId+'key';
      item.companyLogo = "http://www.lgstatic.com/"+item.companyLogo;
      return item;
    });
    if(!data.length){
      page = 0;
      return;
    }
    if(type === 'l'){
      if(data.length!=0){
        this.setState({jobData:this.state.jobData.concat(data)});
      }else{
        page = 0;
      }
    }else{
      this.setState({jobData:data});
    }
  }

  render() {
    let {showCityList} = this.state;
    return (
      <View style={styles.page}>
        {
          showCityList
            ?<City store={this.props.store}
              hideAction={this.changeState.bind(this)}/>
            :<Top 
            searchAction={this.searchJobs.bind(this)}
            store={this.props.store} 
            showAction={this.changeState.bind(this)} />
        }
        <JobList
          showNoting={true}
          headText = "将搜索地区和关键词设为定制条件" 
          store={this.props.store} 
          getList={this.searchJobs.bind(this)} 
          list={this.state.jobData}/>
      </View>
    )
  }
}