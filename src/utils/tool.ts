
export default class tool {
   // 防抖和节流的本质都是一个闭包，就是对原本的事件回调，
    // 进行了一层包裹，内部在进行触发的判断
    
    /* 事件的节流（throttle） 
      在规定的时间内触发对应的事件回调，其余的回调不在进行处理。
    */
    
   static throttle(cb:(any)=>any,time:number) {
    let lastTime = 0;
    return function(){
      let context = this;
      let args = arguments;

      // 当前触发的时间
      let currTime = +new Date();

      if(currTime-lastTime>time){
        // 更新上次的值
        lastTime = currTime;
         cb.call(context,args);
      }
    }
  }
  
  
  
  /* 防抖（debounce）
    在规定时间内只会执行最后一次的事件触发，之前的触发全部作废
  */
 static debounce(cb:(any)=>any,time:number) {
    let timer = null;

    return function(){
      let context = this;
      let args:any = arguments;

      // 清除上一次的触发
      if(timer){
        clearTimeout(timer);
      }

      // 设置新的计时器
      timer = setTimeout(function () {
        cb.call(context,...args);
      }, time)
      
    }
  }
}