
/* 
 发现页面的数据
 参数：pageNo=1 
*/
const DESCOVERY_JOBS:string  = 'https://m.lagou.com/listmore.json?pageSize=15&pageNo=';


/* 
 公司内部职位搜索
 参数：
   pageNo = 1 
   companyId = 62538 
   positionFirstType = [技术,产品,设计,运营,职能,金融,市场与销售] 
*/
const COMPONY_JOBS:string = 'https://m.lagou.com/user/companyjobs.json?pageSize=15&';


/* 
   搜素页面的数据
   参数：
     city = 上海  
     positionName = 前端 
     pageNo= 1 
*/
const SEARCH_JOBS:string  = 'https://m.lagou.com/search.json?pageSize=15&';

export default {
  DESCOVERY_JOBS,
  SEARCH_JOBS,
  COMPONY_JOBS
};