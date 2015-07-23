define([], function () {
    var model = { facebook : {},
      fields : ["first_name", "last_name", "email", "birthday", "relationship_status", "location"]
    };

    function loadMe(data){
      if (!data) return;
      var keys = model.fields;
      var html = "<table class=\"u-full-width\"><tr><th>Key</th><th>Value</th><tr>";
      function addKeyValuePair(key, value){
        var keyName = key.substr(0,1).toUpperCase() + key.substr(1).replace(/_/g, " ");
        var valueName = (typeof value == "string" ? value : value.name);
        html += "<tr><td>" + keyName  + "</td><td>" + valueName + "</td></tr>";
      }
      var key, val;
      for(var k in keys){
        key = keys[k];
        val = data[key];
        if(val){
          addKeyValuePair(key, val);
        }
      }
      key = "significant_other";
      val = data[key];
      if(val && val.name){
        addKeyValuePair(key, val.name);
      }
      $("#primary").html(html + "</table>");
    }

    function loadResponse(response, template){
      if (!(response && response.data &&  response.data.length)){
        return;
      }
      var html ="<div class=\"row\">";
      var count = 0;
      var total = 0;
      for(var i in response.data) {
        var item = response.data[i];

        if (item && item[template.key]) {
          html += template.append(item[template.key]);
          count++;
          total++;
          if (!(count < 6)){
            count = 0;
            html += template.delimeter;
          }
        }
      }
      var mainId = "#" + template.title.toLowerCase();
      $(mainId+"-count").html(template.title + ": " + total);
      $(mainId).html("<div class=\"twelve columns\"><h3><a name=\""+
      mainId + "\"></a>"+

      template.title +
      "</h3></div>" +
      html + "</div>");
    }

    function loadPhotos(response) {
      loadResponse(response, {
        title : "Photos",
        delimeter : "</div><div class=\"row\">",
        key:"picture",
        append: function(x){
          return "<img src=\"" + x + "\" class=\"two columns\"/>"
        }
      });
    }
    function loadFamily(response){
      loadResponse(response, {
        title : "Family",
        delimeter : "",
        key: "name",
        append: function(x){
          return  x + ", ";
        }
      });
    }
    function loadLikes(response){
      loadResponse(response, {
        title : "Likes",
        delimeter : "",
        key: "name",
        append: function(x){
          return  x + ", ";
        }
      });
    }
    function loadLocation(){


    }
    function loadAccount(){
      var fields = model.fields[0];
      for(var i =1; i < model.fields.length;i++){
        fields +="," + model.fields[i]
      }
      model.facebook.api("/me?fields=" + fields, loadMe);
      model.facebook.api("/me/photos?type=uploaded", loadPhotos);
      model.facebook.api("/me/photos?type=uploaded", loadPhotos);
      model.facebook.api("/me/likes", loadLikes);
      model.facebook.api("/me/family", loadFamily);
    }

    function load (/*args*/) {
      model.facebook = window.FB;
      model.facebook.getLoginStatus(function(response){
        if(response && response.status && response.status === "connected"){
          loadAccount();
        }
      });
  };
  return load;
});
