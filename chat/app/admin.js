 const dialogs = {};
 const chatWindows = {};
 var pusher = {};
 var channel = {};
 const previewChats = document.querySelector("#previewChats");
 const dialogChats = document.querySelector("#dialog");
 let userId;
  
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
                     channels.forEach((item, i) => {
                         pusher[i] = new Pusher(item.app_key, {
                             cluster: item.cluster
                         });
                         channel[i] = pusher[i].subscribe('my-channel');
                         channel[i].bind('my-event', function (data) {
                             clickAudio();
                             let coockieData = data.coockieData.split("|=|");
                                 userId = coockieData[0];
                             if (!previewChats.querySelector("#prev" + userId)) {
                                 let chatNotice = document.createElement("div");
                                 chatNotice.setAttribute("id", "prev" + userId);
                                 chatNotice.setAttribute("class", "chatNotice");
                                 chatNotice.setAttribute("data-user", userId);
                                 let date = new Date(+userId * 1000);
                                 chatNotice.append( `Клиент ${date.getUTCFullYear()}-${date.getDate()}-${date.getMonth()} | ${date.getHours()} : ${date.getMinutes()}`  ) ;
                                 previewChats.appendChild(chatNotice);
                             }
                             if (!chatWindows[userId]) {
                                 let userDialog = document.createElement("div");
                                 userDialog.setAttribute("id", "dialog" + userId);
                                 userDialog.setAttribute("class", "userDialog");
                                 chatWindows[userId] = userDialog;
                                 // document.appendChild(userDialog);
                             }
                             chatWindows[userId].append(data.message);
                             chatWindows[userId].append(data.admin);
                             dialogs[userId] = data.channel;
                             console.log(data);
                             console.log("fdas");
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
 previewChats.addEventListener("click", (e) => {
     if (e.target && e.target.classList.contains("chatNotice")) {
        //  let userId = e.target.dataset.user;

         if (document.querySelector(`#dialog${userId}`)) {
             return false
         }

         let textArea = document.createElement("input"),
             button = document.createElement("input"),
             dialogForm = document.createElement("form");

        dialogForm.setAttribute("id", "dialogForm");
         textArea.setAttribute("type", "text");
         textArea.setAttribute("id", "textMessage");
         button.setAttribute("type", "submit");
         button.setAttribute("value", "Отправить");
         dialogForm.appendChild(chatWindows[userId]);
         dialogForm.appendChild(textArea);
         dialogForm.appendChild(button);
         dialogChats.appendChild(dialogForm);
         dialogForm.addEventListener("submit", (event) => {
             event.preventDefault();
             let message = event.target.querySelector("#textMessage").value;
             let channel = dialogs[userId];
             if (!channel || typeof (channel) != "object") {
                 return false;
             }
             senderJS(message, channel);
             document.querySelector("#textMessage").value = "";
             eventT = channel;
             console.log(userId);
         })
     }
 });

 function senderJS(message, channels) {
     let params = `admin=${message}&channels=${JSON.stringify(channels)}&coockieData=${userId}`;
     let request = new asyncRequest()
     request.open("POST", "/chat/api/sender.php", true);
     request.setRequestHeader("Content-type",
         "application/x-www-form-urlencoded")

     request.onreadystatechange = function () {

         if (this.readyState == 4) {
             if (this.status == 200) {

                 if (this.responseText != null) {
                     console.log(request.responseText);
                 }
             }
         }
     }

     request.send(params);
 };

 getChannelsAdmin();