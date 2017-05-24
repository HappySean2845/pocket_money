
var clickFlag = true;
var validate = {
    isEmpty: function (val) {
        if (val == "") {
            return false;
        } else {
            return true;
        }
    },
    isMobile: function (val) {
        if (val == "") {
            return false;
        }
        if (!val.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/) || val.length != 11) {
            return false;
        } else {
            return true;
        }
    },
}

function addInfo(_name, _tel, _province, _city, _dealer) {
    clickFlag = false;
    $.ajax({
        url: "http://www.sgmw.com.cn/ashx/reservation_json.aspx",
        dataType: 'jsonp',
        data: {
            aid: 165,
            fid: $_GET('MediaID'),
            lid: 0,
            name: _name,
            phone: _tel,
            key: md5(_tel).toUpperCase().substr(0, 10),
            province: _province,
            city: _city,
            dealercode: _dealer,
            cartype: '宝骏730',
            mark: '',
            source: '全新宝骏730预约试驾',
            ordering: 0,
            driving: 1,
            credit: 0

        },
        jsonp: 'callback',
        success: function (result) {
            var wr = result.success[0].result;
            if (wr == 1) {
                alert('预约成功，可以进行抽奖');
                // var p = $("#pro option:selected").text();
                // var c = $("#city option:selected").text();
                // var d = $("#delear option:selected").text();
                // _tel = _tel.replace(_tel.substr(3,4),'****');
                // _gsq.push(['T', 'GWD-002942', 'trackEvent', 'click', '730',location.pathname]);
                // if (window.gsTracker) {
                //     var orderid = leadsID;
                //     gsTracker.addOrder(orderid, 1);
                //     gsTracker.setEcomProperty(orderid, "1", _name);
                //     gsTracker.setEcomProperty(orderid, "2", _tel);
                //     gsTracker.setEcomProperty(orderid, "3", "宝骏730");
                //     gsTracker.setEcomProperty(orderid, "4", p);
                //     gsTracker.setEcomProperty(orderid, "5", c);
                //     gsTracker.setEcomProperty(orderid, "6", _dealer);
                //     gsTracker.addProduct(orderid, location.pathname, location.pathname, 1, 1, "全新宝骏730");
                //     gsTracker.trackECom();
                //     gsTracker.track("/targetpage/formsubmit/sqtywlpc");
                // }
            } else if (wr == 2) {
                alert('您已预约成功,请勿重复提交');
            } else {
                alert('预约失败，请稍后重试');
            }
            clickFlag = true;
        }

    });
}
function $_GET(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}