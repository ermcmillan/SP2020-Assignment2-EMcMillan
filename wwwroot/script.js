var len;
var results = '';

function apiSearch() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://ermcmillan-421-search-api.cognitiveservices.azure.com/bing/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "088fba2318534938aa033fe90359db4d");
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            for (i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert("error");
        });
}

function searchClick() {
    $("#search").click(function () {
        apiSearch();
    });

    $("#query").keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });

    $("#query").bind("enterKey", function (e) {
        apiSearch();
    });
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function currentTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    var currTime = h + ":" + m;
    $("#time").empty();
    $('#time').html(currTime);
    $(function () {
        $("#time").dialog();
    });
}
/*
$("#smartSearchHeader").click(function () {
    $('body').css('background-image','url("https://images.unsplash.com/photo-1581985449868-ad30e0d0c321?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80")');
});
*/

$(document).ready(function () {
    $(function () {
        $('.page').click(function () {
            $(this).toggleClass("feedback-minus");
        });
    })
});




