define([],
function () {
  var model = {
    list: [],
    listIndex : 0,
    max: 20,
    points : 0,
    paused : false
  };
  function showOptions(options){
    for(var i = 0; i < options.length; i++){
      $("#option" +(i+1)).val(options[i]).html(options[i]);
    }
  }
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  function chooseOptions(){
    var answer = model.list[model.listIndex].a;
    var temp = model.list;
    var chunk = 1;
    var done = false;
    while (!done) {
      var candidates = $.grep(temp, function(e){
        return e.a !== answer &&
        e.a.toUpperCase().indexOf(answer.substr(0, chunk).toUpperCase()) === 0;
      });
      if (candidates.length < 3){
        done = true;
      }
      else{
        temp = candidates;
        chunk++;
      }
    }
    if(temp.length > 3){
      temp = temp.splice(0,3);
    }
    var options = [answer];
    for(var t = 0; t < temp.length; t++){
      options.push(temp[t].a);
    }
    var i = model.listIndex + 1;
    while(options.length < 4 && i < model.list.length){
      options.push(model.list[i].a);
      i++;
      if (!(i < model.list.length)) i = 0;
    }
    return options;
  }
  function showQuestion(){

      var i = model.listIndex;
      $(".option").blur();
      $("#question").html(model.list[i].q);
      $("#progress").html((model.listIndex + 1) + " of " + model.max);
      var options = chooseOptions();
      shuffle(options);
      showOptions(options);
  }
  function showAnswer(e){
      if (model.paused) {
        return;
      }
      model.paused = true;
      var answer = model.list[model.listIndex];
      var isCorrect = answer.a === $(e.target).val();

      $("button[value='" + answer.a + "']").attr("style", "background-color:#cfc");
      $("#answer").html(isCorrect ? "Correct" : "Wrong");
      var pause = 5000;
      if(isCorrect) {
        model.points++;
        pause = 1000;
      }

      window.setTimeout(function(){
        model.listIndex++;
          $("button.option").attr("style", "");
        if(model.listIndex < model.max){
          showQuestion();
          $("#answer").html("&nbsp;");
          model.paused = false;
        }
        else{
          $("#answer").html("Refresh to Start Over");
          $("#score").html("Score " +
            Math.floor( model.points/(model.listIndex + 1)*100) + "%");
          model.paused = true;
        }
      }, pause);
  }
  function loadJson(data){
    if (!(data && data.list && data.list.length)) return;
    model.list = data.list;
    if(model.list.length < model.max){
      model.max = model.list.length;
    }
    $(".option").on("click", showAnswer);
    shuffle(data.list);
    showQuestion();
  }
  function load(settings){
    var dataSet = settings.attr("data-set");
    if (dataSet) {
      $.getJSON( "/assets/json/" + dataSet + ".json", loadJson);
    }
  }
  return load;
});
