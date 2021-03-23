const tableChat = document.querySelector("#tableChat");
const chatForm = tableChat.querySelector("#sendMessageForm");
let tryCount = 0;
function getChannels() {
    let request = new asyncRequest()
    request.open("POST", "/chat/api/getConnectToChannel.php", false);
    request.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {

        if (this.readyState == 4) {
            if (this.status == 200) {

                if (this.responseText != null) {
                    channels = JSON.parse(this.responseText);
                    pusher = new Pusher(channels.app_key, {
                        cluster: channels.cluster
                    });
                    channel = pusher.subscribe('my-channel');
                    channel.bind('my-event', function (data) {
                        checkData(data.message, "cl");
                        checkData(data.admin, "adm");
                        checkData(data.err, "err");
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
    console.log(responseChannel);
    return responseChannel;
}

function senderJS(message) {
    let params = `message=${message}&channels=${JSON.stringify(channels)}`;
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
}
chatForm.addEventListener("submit", sendMessage);

function sendMessage(event = null) {
    if (event) {
       event.preventDefault()
    };
    let message = chatForm.querySelector("[type = text]").value;
    if (channels == undefined) {
       console.log(channels);
       getChannels();
       if(tryCount<10){
        setTimeout(sendMessage, 400);
        tryCount++;
       }else{
        checkData("Нет свободных каналов связи", "err");
       }
       console.log("sendMessage");
    } else {
       senderJS(message);
       chatForm.querySelector("[type = text]").value = "";
       tryCount = 0;
    }
 }
 document.querySelector("#hideChat").addEventListener("click", (event) => {
    event.preventDefault();
    tableChat.classList.toggle("hide");
 });