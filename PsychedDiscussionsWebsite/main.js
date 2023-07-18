function render(data) {
    var html = "<div class='commentBox'><div class='leftPanelImg'><img src='../Images/ying-yang-3104351-2586390.png'> </div><div class='rightPanel'><span>" + data.name + "</span><div class='date'>" + data.date + "</div><p>" + data.body + "</p></div><div class='clear'></div></div>";
    $('#container').append(html);
}
$(document).ready(function () {



    for (var i = 0; i < coment.length; i++) {
        render(coment[i]);
    }


    $('#addComent').click(function () {
        var addObj = {
            "name": $('#name').val(),
            "date": $('#date').val(),
            "body": $('#bodytext').val()
        };
        coment.push(addObj);
        render(addObj);
        $('#name').val('');
        $('#date').val('dd/mm/yyyy');
        $('#bodyText').val('');

    });

});