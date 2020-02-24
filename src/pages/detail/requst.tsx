import React from 'react'
import { Text, View } from 'react-native'

// 精灵图
const spriteSheet = 'https://m.lagou.com/images/mobile/asset/common/img/icon.png';

function requst () {
  return (
    <View style={{padding:10,backgroundColor:'#fff'}}>
      <Text>【岗位职责】</Text>
      <Text>1．负责业务团队的BText工作；</Text>
      <Text>2．结合公司业务发展战略，参与制订人员成长计划和人才梯队建设规划，提供HR解决方案并推动实施；</Text>
      <Text>3．主动与各部门各区域管理层、一线主管及员工进行多种形式的接触和有效沟通，保证信息在不同层级间的有效传递，提高业务团队的HR管理效率，同时充分调动员工积极性，增强员工的归属感和团队的凝聚力；</Text>
      <Text>4．推动公司价值观的传承和团队的文化建设，作为企业和员工的桥梁，负责企业文化和价值理念的传播、落地、考核；</Text>
      <Text>5．不断进行人员的盘点，优化、完善团队组织架构，诊断并解决日常运营中组织问题。</Text>
      <Text style={{marginTop:10}}>【任职要求】</Text>
      <Text>1．互联网公司背景，支持至少100人以上业务线BText经验，大学本科及以上学历，2年以上销售团队管理经验或人力资源经验。</Text>
      <Text>2．了解HR各模块，擅长招聘、培训、组织发展、企业文化建设等方向的落地、实施、完善。</Text>
      <Text>3．学习理解能力强，能够快速熟悉新业务,善于从业务角度发现并解决问题。</Text>
    </View>
  )
}

export default requst;
