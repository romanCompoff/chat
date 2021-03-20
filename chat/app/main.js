const app_id = "798784",
   APP_KEY = "5bb5b14a93403d2d92c3",
   secret = "69bae25d1045cb88259b",
   APP_CLUSTER = "eu",
   tableChat = document.querySelector("#tableChat"),
   chatForm = tableChat.querySelector("#sendMessageForm");
   document.querySelector("#hideChat").addEventListener("click", (event)=>{
      event.preventDefault();
      tableChat.classList.toggle("hide");
   })

var pusher = new Pusher(APP_KEY, {
   cluster: APP_CLUSTER
});
var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function (data) {
   tableChat.querySelector("#divChat").innerHTML += `<p class = "cl">${data.message}</p>`;
});




function senderJS(message) {
   let params = "message=" + message;
   let request = new asyncRequest()
   request.open("POST", "/chat/api/sender.php", true);
   request.setRequestHeader("Content-type",
      "application/x-www-form-urlencoded")

   // request.onreadystatechange = function()
   // {

   //   if (this.readyState == 4)
   //   {
   //     if (this.status == 200)
   //     {

   //       if (this.responseText != null)
   //       {
   // document.getElementById('modalWindow').innerHTML =
   //           alert(this.responseText);
   //       }
   //       else alert("Письмо не отправлено: нет ответа")
   //     }
   //     else
   // {
   //   alert( "Письмо не отправлено: " + this.statusText);
   // } 			  
   //   }
   // }

   request.send(params)
}


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

chatForm.addEventListener("submit", (event)=>{
   event.preventDefault();
   let message = chatForm.querySelector("[type = text]").value;
   senderJS(message);
   chatForm.querySelector("[type = text]").value = "";
})