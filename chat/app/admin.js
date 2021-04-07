 const dialogs = {};
 const chatWindows = {};
 const userParams = {};
 var pusher = {};
 var channel = {};
 const previewChats = document.querySelector("#previewChats");
 const dialogChats = document.querySelector("#dialog");
  
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
                                 let userId = coockieData[0];
                             if (!previewChats.querySelector("#prev" + userId)) {
                                 let chatNotice = document.createElement("div");
                                 chatNotice.setAttribute("id", "prev" + userId);
                                 chatNotice.setAttribute("class", "chatNotice");
                                 chatNotice.setAttribute("data-user", userId);
                                 let date = new Date(+userId * 1000);
                                 chatNotice.append( `Клиент ${date.getFullYear()}-${date.getDate()}-${date.getMonth()} | ${date.getHours()}:${date.getMinutes()}`);
                                 chatNotice.innerHTML += "<br>";
                                 chatNotice.append(`Город: ${data.channel.city}`);
                                 chatNotice.innerHTML += `<br>Писал ранее: ${coockieData.length} раз.`;
                                 previewChats.appendChild(chatNotice);
                             }
                             if (!chatWindows[userId]) {
                                 let userDialog = document.createElement("div");
                                 userDialog.setAttribute("id", "dialog" + userId);
                                 userDialog.setAttribute("class", "userDialog");
                                 chatWindows[userId] = userDialog;
                                 // document.appendChild(userDialog);
                             }
                             if(data.admin){
                                createMessage(data.admin, "adm", userId);
                             }

                             if(data.message){
                                 createMessage(data.message, "cl", userId);
                             }
                                                    
                             dialogs[userId] = data.channel;
                             console.log(data);
                             console.log("fdas");
                         })
                         channel[i].bind('writeShower', function (data) {
                            if (data.client) {
                                let coockieData = data.coockieData.split("|=|");
                                let userId = coockieData[0];
                                document.querySelector(`#dialog${userId} .showField`).innerHTML = (data.client);
                            }
                        });
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
         let userId = e.target.dataset.user;

         if (document.querySelector(`#dialog${userId}`)) {
             return false
         }
         if(dialogChats.querySelector("#dialogForm")){
            dialogChats.querySelector("#dialogForm").remove();
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
         let showField = document.createElement("div");
         showField.setAttribute("class", "showField");
         document.querySelector(`#dialog${userId}`).appendChild(showField);
         dialogForm.addEventListener("submit", (event) => {
             event.preventDefault();
             let message = event.target.querySelector("#textMessage").value;
             let channel = dialogs[userId];
             if (!channel || typeof (channel) != "object") {
                 return false;
             }
             senderJS(message, channel, userId);
             document.querySelector("#textMessage").value = "";
             eventT = channel;
             console.log(userId);
         })
     }
 });

 function senderJS(message, channels, userId) {
     let params = `admin=${message}&channels=${JSON.stringify(channels)}&coockieData=${userId}`;
     let request = new asyncRequest()
     request.open("POST", "/chat/api/sender.php", false);
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

 function createMessage(message, userClass, userId){
    let client =  document.createElement("p");
    client.setAttribute("class", userClass);
    client.append(message);
    chatWindows[userId].append(client);      
    if(dialogChats.querySelector(".userDialog")){
        dialogChats.querySelector(".userDialog").scrollTop = dialogChats.querySelector(".userDialog").scrollHeight; 
    }
 }

 function writeShower() {
    let params = `admin=true`;
    let request = new asyncRequest()
    request.open("POST", "/chat/api/writeShower.php");
    request.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded")

    request.onreadystatechange = function () {

    //     if (this.readyState == 4) {
    //         if (this.status == 200) {

    //             if (this.responseText != null) {
    //                 console.log(this.responseText);
    //             }
    //         }
    //     }
    }

    request.send(params);
}


 function midleAdminShover() {
    if (!midleData['midleAdminShover']) {
        midleData['midleAdminShover'] = true
        setTimeout(() => midleData['midleAdminShover'] = false, 3000);
        writeShower(message);
    }
}

 document.querySelector("#textMessage").addEventListener("input", midleAdminShover);
 getChannelsAdmin();