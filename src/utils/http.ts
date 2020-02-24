export default class Http{
   static fecth_get(url:string){
    return fetch(url)
    .then((response) => response.json())
    .then((rsJson) => {
      return rsJson;
    })
    .catch((error) => {
      console.error(error);
    });
   }

   static fecth_post(url:string,params:object){
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
   }
}