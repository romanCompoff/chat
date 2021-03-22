// pusher = new Pusher(channels.app_key, {
//    cluster: channels.cluster
// });
// channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function (data) {
//    checkData(data.message, "cl");
//    checkData(data.admin, "adm");
//    checkData(data.err, "err");
// });
var pusher = {};
var channel = {};
function getChannelsAdmin() {
   let request = new asyncRequest()
   request.open("POST", "/chat/api/getChannelsToAdmin.php", false);
   request.setRequestHeader("Content-type",
       "application/x-www-form-urlencoded");
   request.onreadystatechange = function () {

       if (this.readyState == 4) {
           if (this.status == 200) {

               if (this.responseText != null) {
                   channels = JSON.parse(this.responseText);
                  channels.forEach((item, i)=>{
                     pusher[i] = new Pusher(item.app_key, {
                        cluster: item.cluster
                     });
                     channel[i] = pusher[i].subscribe('my-channel');
                     channel[i].bind('my-event', function(data){
                        console.log(data);
                        console.log("fdas");
                        checkData(data.message, "cl");
                        checkData(data.admin, "adm");
                        checkData(data.err, "err");
                     })
                  });


               } else {
                   tableChat.querySelector("#divChat").innerHTML += `<p class = "ad">Нет ответа, или все линии заняты1</p>`;
                   console.log("2");
               }
           } else {
               tableChat.querySelector("#divChat").innerHTML += `<p class = "ad">Нет ответа, или все линии заняты2</p>`;
           }
       }
   }
   request.send();
   let responseChannel = request.responseText;
   // console.log(responseChannel);
   return responseChannel;
}

getChannelsAdmin();