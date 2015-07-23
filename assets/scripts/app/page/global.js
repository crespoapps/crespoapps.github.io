define([], function () {
    var model = { facebook : {} };
    function showLoggedIn(){
      $(".logged-status").hide();
      $(".logged-in").show();
      model.facebook.api('/me', function (response) {
          $("#welcome").html("Hi " + response.first_name);
      });
    }
    function showLoggedOut(){
      $(".logged-status").hide();
      $(".logged-out").show();
    }



    function load() {
        model.facebook = window.FB;
        $("head").append("<link rel=stylesheet href=/assets/styles.min.css>");

        model.facebook.getLoginStatus(function (response) {
          if(response && response.status && response.status === "connected"){
            showLoggedIn();
          }
          else{
            showLoggedOut();
          }
        });

        // Login
        $(".login").click(function(){
            model.facebook.login(function(){window.location.reload()},
              { scope: 'public_profile,email,user_birthday,user_location,user_likes,user_friends,user_relationships,user_photos' });
        });

        // Logout
        $(".logout").click(function(){
            model.facebook.logout(function(){window.location.reload()});
        });
    };
    return load;
});
