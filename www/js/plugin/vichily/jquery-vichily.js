;
! function(window, undefined) {

    //主入口
    ready.run = function() {
        $ = jQuery;
        win = $(window);
        $.layer = function(deliver) {
            var o = new Class(deliver);
            return o.index;
        };
    };


    window.vichily = {
        msg: function(msgText, msgTime, parme, callback) {
            var icon, conf = {
                title: false,
                closeBtn: false
            };
            (msgText == '' || msgText == undefined) && (msgText = ' ');
            msgTime === undefined && (msgTime = 2);
            if (typeof parme === 'number') {
                icon = parme;
            } else {
                parme = parme || {};
                icon = parme.type;
                conf.success = function() {
                    vichily.shift(parme.rate)
                };
                conf.shade = parme.shade;
            }
            conf.time = msgTime;
            conf.dialog = {
                msg: msgText,
                type: icon
            };
            conf.end = typeof parme === 'function' ? parme : callback;
            return $.vichily(conf);
        },
    }

}(window);