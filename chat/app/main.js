
      // app_id = tableChat.dataset.id,
      // APP_KEY = tableChat.dataset.key,
      // secret = tableChat.dataset.secret,
      // APP_CLUSTER = tableChat.dataset.cluster,
      
var channels;
var pusher;
var channel;

function asyncRequest() {
   try {
      var request = new XMLHttpRequest()
   } catch (e1) {
      try {
         request = new ActiveXObject("Msxml2.XMLHTTP")
      } catch (e2) {
         try {
            request = new ActiveXObject("Microsoft.XMLHTTP")
         } catch (e3) {
            request = false
         }
      }
   }
   return request
}

function checkData(data, classes){
   if (data && data.trim()){tableChat.querySelector("#divChat").innerHTML += `<p class = "${classes}">${data}</p>`;}
   return true;
}