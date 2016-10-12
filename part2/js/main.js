$(function(){
    var html = $("#test").html();

    var user = {
        firstname: "Denys",
        lastname: "Dmytruk",
        birthdate: "1988.07.07",
        image: "img/user.jpg"
    }

    var content = tmpl(html, user);

    $("#user-profile").append(content);


});
