"use strict";
var guide = app.controller("guide", ["$scope", "$http", function($scope, $http){
  document.title = "Путеводитель по архиву";

  var guide = {
    content : "Содержание:",
    list    : [],
    company : {
      name        : "Архив чего-то там им. кого-то",
      description : "Документы про КазССР, текущую политику, экономику социальное положение и НЛО"
    }
  };

  $http.get("/api/guide/all.json")
    .success(function(json){
      var i, doc, id = 0;
      for(i = 0; doc = json[i]; ++i)
        $http.get(doc.url).success(function(docJson){
          guide.list.push({
            id    : id++,
            data  : docJson
          });
        });
    })
    .error(function(json){

    });

  $scope.guide = guide;
}]);
