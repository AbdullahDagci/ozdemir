function setAlertCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getAlertCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkAlertCookie() {
    var cookie_alert_popup_visited=getAlertCookie("cookie_pop_visited");
    if (cookie_alert_popup_visited === ''){
        setTimeout(function () {

            $("body").append(cookie_popup_html);

            var close = document.getElementsByClassName('alert-popup__policy-card-close')[0];
			var card = document.getElementsByClassName('alert-popup__policy-card')[0]; // Burası düzeltildi
			var button = document.getElementsByClassName('alert-popup-button')[0];


            card.classList.add('cookie-alert-popup--opened');
            card.classList.remove('cookie-alert-popup--closed');

            card.addEventListener('click', function (e) {
                if (e.target === close | e.target === button) {
                    card.classList.remove('cookie-alert-popup--opened');
                    card.classList.add('cookie-alert-popup--closed');
                    setAlertCookie("cookie_pop_visited", true, 365);
                }
            });
        }, 1000);
    }
};

function setAlertCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



if(typeof(isLoggedIn) == "undefined") var isLoggedIn = false;
if(isLoggedIn !== undefined && isLoggedIn && updateStatusLink !== undefined){
    var windowActivityStatus = "on",requestStatus=false;
    function updateOnlineStatus(){
        if(requestStatus) return false;
        if(windowActivityStatus === "off") return false;

        requestStatus = true;

        var request = MioAjax({
            action:updateStatusLink,
            data:{
                operation: "update_online",
                title: document.title,
            },
            method:"POST",
        },true,true);
        request.done(function(response){
            requestStatus = false;
        });
    }
    setInterval(updateOnlineStatus,10000);
    setTimeout(updateOnlineStatus,2000);
    document.addEventListener('visibilitychange',function(){
        if (document.visibilityState == "hidden"){
            windowActivityStatus = "off";
        } else {
            windowActivityStatus = "on";
        }
    }, false);

    var repeatIntervalId;
    $(window).focus(function() {
        if (!repeatIntervalId)
            repeatIntervalId = setInterval(function(){
                windowActivityStatus = "on";
            }, 1000);
    });

    $(window).blur(function() {
        clearInterval(repeatIntervalId);
        windowActivityStatus = "off";
    });

    $(document).mousemove(function(){ 
        if(windowActivityStatus == 'off')
        {
            windowActivityStatus = "on";
            if(!repeatIntervalId)
            repeatIntervalId = setInterval(function(){
                windowActivityStatus = "on";
            }, 1000);

        }
    });

}