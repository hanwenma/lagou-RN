import { observable,action,computed } from "mobx";

class  Store{

  @observable
  isLogin = false;

  @observable
  customJobs = {
    positionName: '',
    city: '',
    salary:'',
    companyType:''
  }

  @observable
  resume = {
    attr:'',
    name:"",
    education:'',
    experience:'',
    tel:"",
    email:''
  }

  @computed get
  customInfo (){
    return `${this.customJobs.positionName}/${this.customJobs.city}/${this.customJobs.salary}/${this.customJobs.companyType}`
  }

  @observable
  currJobInfo = {
    logger: {},
    positionId: 0,
    positionName: '',
    city: '',
    createTime: '',
    salary:'',
    companyId: 0,
    companyLogo:'',
    companyName: '',
    companyFullName: ''
  }

  @observable 
  slectCity="全国"

  @action.bound
  setCurrJobInfo(info){
    this.currJobInfo = info;
  }

  @action.bound
  setCustomJobs(info,val){
    this.customJobs[info] = val;
  }

  @action.bound
  setResume(key,val){
    this.resume[key] = val;
  }

  @action.bound
  setSlectCity(city){
    this.slectCity = city;
  }
  
  @action.bound
  setIsLogin(bool){
    this.isLogin = bool;
  }

}

export default new Store();