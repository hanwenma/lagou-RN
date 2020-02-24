import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import Icons  from "react-native-vector-icons/AntDesign"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {TouchableOpacity} from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import Position from "./pages/position/descovery"
import Search from "./pages/search/search"
import Mine from "./pages/mine/mine"
import Resume from "./pages/mine/resume"
import Dtail from "./pages/detail/detail"
import Login from "./pages/login/login"
import Compony from "./pages/compony/compony"
import City from "./pages/condition/city"
import Job from "./pages/condition/job"
import Salary from "./pages/condition/salary"
import Type from "./pages/condition/type"
import Map from "./pages/map/map"
import Personalnfo from "./pages/login/personalnfo"
import Collection from "./pages/collection/collection"
import {AsyncStorage} from "react-native"
import {inject,observer} from "mobx-react"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
  showIcon: true,
  activeTintColor:'#00b38a',
  activeBackgroundColor:'#e7f3f0',
  inactiveBackgroundColor:'#f6f6f6',
  inactiveTintColor:'#c2cfcc',
};

const Tabs = ({ navigation, route })=>{

  return (
    <Tab.Navigator
    tabBarOptions={tabBarOptions}>
      <Tab.Screen 
        options={{
        tabBarIcon:({color})=>(
        <Icons name="home" size={18} color={color}></Icons>
        )}}
        name="职位" 
        component={Position} />
      <Tab.Screen 
        options={{
        tabBarIcon:({color})=>(
        <Icons name="search1" size={18} color={color}></Icons>
        )}}
        name="搜索" 
        component={Search} />
      <Tab.Screen
        options={{
        tabBarIcon:({color})=>(
        <Icons name="user" size={18} color={color}></Icons>
        )}} 
        name="我的" 
        component={Mine} />
    </Tab.Navigator>) 
}

const screenOptions = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: '#00b38a' },
};

const Right = ({navigation})=>(
  <TouchableOpacity
  style={{paddingRight:15}}
  onPress={() => navigation.replace("Home")}>
    <Icons
      name="home"
      size={22}
      color="#fff"
    />
  </TouchableOpacity>
);


interface Props{
  store?:any
}

interface State{
  
}

@inject("store")
@observer
class Index extends React.Component<Props,State> {
  async mounted(){
    this.props.store.setIsLogin(await AsyncStorage.getItem('currUser'));
  }

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator
      
        screenOptions={screenOptions}
        initialRouteName="Home">
          <Stack.Screen name="Home"
           options={{title: '拉勾网',}} 
           component={Tabs} />

          <Stack.Screen name="Dtail" 
          options={ ({ navigation, route}) => ({
            title:"职位详情",
            headerRight: () => <Right navigation={navigation}/>,
          })}
          component={Dtail} />

          <Stack.Screen name="Map" 
          options={ ({ navigation, route}) => ({
            title:"地图导航",
            headerRight: () => <Right navigation={navigation}/>,
          })}
          component={Map} />

          <Stack.Screen name="Resume" 
          options={{title: '个人简历',}}
          component={Resume} />

           <Stack.Screen name="City"
          options={{title: '设置定制信息',}}
          component={City} />
           <Stack.Screen name="Type"
          options={{title: '设置定制信息',}}
          component={Type} />

           <Stack.Screen name="Salary"
          options={{title: '设置定制信息',}}
          component={Salary} />

          <Stack.Screen name="Job"
          options={{title: '设置定制信息',}}
          component={Job} />

           <Stack.Screen name="Collection"
          options={{title: '我的收藏'}}
          component={Collection} />

          <Stack.Screen name="Login" 
           options={{title: '拉勾网',}}
           component={Login} />

          <Stack.Screen name="Personalnfo" 
           options={({ navigation, route}) => ({
            title:"设置个人信息",
            headerRight: () => <Right navigation={navigation}/>,
          })}
           component={Personalnfo} />

          <Stack.Screen name="Compony" 
          options={({ navigation, route}) => ({
            title:"公司职位",
            headerRight: () => <Right navigation={navigation}/>,
          })}
          component={Compony} />
          
        </Stack.Navigator>

      </NavigationContainer>
   )
  }
}

export default Index;