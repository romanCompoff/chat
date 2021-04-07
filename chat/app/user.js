const tableChat = document.querySelector("#tableChat"),
    chatForm = tableChat.querySelector("#sendMessageForm"),
    divChat = document.querySelector("#divChat"),
    timerIds = {};
let tryCount = 0,
    adminTimeout,
    timerId1,
    timerId2;

function getChannels() {
    let request = new asyncRequest()
    request.open("POST", "/chat/api/getConnectToChannel.php", true);
    request.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded");
    request.onreadystatechange = function () {

        if (this.readyState == 4) {
            if (this.status == 200) {

                if (this.responseText != null) {
                    channels = JSON.parse(this.responseText);
                    channels.city = ymaps.geolocation.city;
                    pusher = new Pusher(channels.app_key, {
                        cluster: channels.cluster
                    });

                    pusher.connection.bind('connected', () => {
                        senderJS(chatForm.querySelector("[type = text]").value);
                        chatForm.querySelector("[type = text]").value = "";
                    });
                    channel = pusher.subscribe('my-channel');
                    channel.bind('my-event', function (data) {
                        checkData(data.message, "cl");
                        checkData(data.admin, "adm", true);
                        checkData(data.err, "err");

                    });
                    channel.bind('writeShower', function (data) {
                        if (data.admin) {
                            adminWriteShower();
                            
                        }
                        console.log(data);
                    });

                    let timerId3;
                    if (timerId3) {
                        clearTimeout(timerId3)
                    };
                    timerId3 = setTimeout(() => {
                        channels = undefined;
                        pusher.channels.channels["my-channel"] = false;
                        pusher = false;
                    }, 200000);


                } else {
                    tableChat.querySelector("#divChat").innerHTML += `<p class = "ad">Нет ответа, или все линии заняты1</p>`;
                }
            } else {
                tableChat.querySelector("#divChat").innerHTML += `<p class = "ad">Нет ответа, или все линии заняты2</p>`;
            }
        }
    }
    request.send();
    let responseChannel = request.responseText;
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
                    console.log(this.responseText);
                }
            }
        }
    }

    request.send(params);
}

function writeShower(message = "") {
    let params = `client=${message}&channels=${JSON.stringify(channels)}`;
    let request = new asyncRequest()
    request.open("POST", "/chat/api/writeShower.php", true);
    request.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded")

    request.onreadystatechange = function () {

        if (this.readyState == 4) {
            if (this.status == 200) {

                if (this.responseText != null) {
                    console.log(this.responseText);
                }
            }
        }
    }

    request.send(params);
}

chatForm.addEventListener("submit", sendMessage);

function sendMessage(event = null, checkEvent = true) {

    if (event) {
        event.preventDefault()
    };
    let message = chatForm.querySelector("[type = text]").value;
    if (channels == undefined) {
        getChannels();
        if (tryCount < 10) {
            tryCount++;
        } else {
            checkData("Нет свободных каналов связи", "err");
        }
    } else {
        senderJS(message);
        chatForm.querySelector("[type = text]").value = "";
        if (timerId1) {
            clearTimeout(timerId1)
        };
        if (timerId2) {
            clearTimeout(timerId2)
        };
        tryCount = 0;
    }
}
document.querySelector("#hideChat").addEventListener("click", (event) => {
    event.preventDefault();
    tableChat.classList.toggle("hide");
});
if (!document.cookie.match("show=true")) {
    timerId1 = setTimeout(checkData, 22000, "Здравствуйте", "adm", true);
    timerId2 = setTimeout(() => {
        checkData("Могу чем-то вам помочь?", "adm", true);
        document.cookie = "show=true";
        setTimeout(() => tableChat.classList.add("hide"), 2000);
    }, 26000);
}

function adminWriteShower() {
    clearTimeout(timerIds['adminTimeout']);
    tableChat.querySelector("#indicator").innerHTML = "Пишет &#9997; &#9997; &#9997; &#9997; &#9997;";
    timerIds['adminTimeout'] = setTimeout(() => tableChat.querySelector("#indicator").innerHTML = "", 3000);
}

function midleAdminShover() {
    if (channels == undefined) { return }
    let message = tableChat.querySelector("#message").value;
    if (!midleData['midleAdminShover']) {
        midleData['midleAdminShover'] = true
        setTimeout(() => midleData['midleAdminShover'] = false, 3000);
        writeShower(message);
    }
}


tableChat.querySelector("#message").addEventListener("input", midleAdminShover);