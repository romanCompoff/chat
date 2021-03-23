// pusher = new Pusher(channels.app_key, {
//    cluster: channels.cluster
// });
// channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function (data) {
//    checkData(data.message, "cl");
//    checkData(data.admin, "adm");
//    checkData(data.err, "err");
// });
const dialogs = {};
const chatWindows = {};
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
                            let coockieData = data.coockieData.split("|=|");
                            let userId = coockieData[0];
                            if (!previewChats.querySelector("#prev" + userId)) {
                                let chatNotice = document.createElement("div");
                                chatNotice.setAttribute("id", "prev" + userId);
                                chatNotice.setAttribute("class", "chatNotice");
                                chatNotice.setAttribute("data-user", userId);
                                previewChats.appendChild(chatNotice);
                            }
                            if(!chatWindows[userId]){
                                let userDialog = document.createElement("div");
                                userDialog.setAttribute("id", "dialog" + userId);
                                userDialog.setAttribute("class", "userDialog");
                                chatWindows[userId] = userDialog;
                                // document.appendChild(userDialog);
                            }
                            chatWindows[userId].append(data.message);
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
        let dialogForm =  document.createElement("form");
        let textArea = document.createElement("textarea");
        let button = document.createElement("input");
        button.setAttribute("type", "submit");
        button.setAttribute("value", "Отправить");
        dialogForm.appendChild(chatWindows[e.target.dataset.user]);
        dialogForm.appendChild(textArea);
        dialogForm.appendChild(button);
        dialogChats.appendChild(dialogForm);

        console.log(e.target.dataset.user);
    }
})

getChannelsAdmin();