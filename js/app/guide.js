"use strict";
;(function(){

  window.app
    .controller("GuideCTRL", inc.concat(["scope", "root", "http", "location", "window", "param.route", GuideCTRL]));

  function GuideCTRL(scope, root, http, location, wind, param){
    // Var init
    var title   = "Путеводитель по архиву";

    // Scope init

    // Root Scope init
    root.currentPage = "guide";

    // Init via functions
    changeNav(true);

    // Actions
    if( typeof root.links == "undefined" ){
      http
        .get("/get.all.guide.php")
        .success(function(json){
          var i, q, links = [];
          for(i = 0; q = json[i]; ++i){
            links.push({
              id        : i,
              url       : q.url,
              shortName : q.shortName,
              fullName  : q.fullName
            })
          }

          root.links = links;

          if( typeof root.guide == "undefined" ){
            root.guide = {
              now       : param.document || 0,
              document  : []
            }
          }

          scope.changeGuide(links[ root.guide.now ]);
        })
    }

    // Create functions
    scope.changeGuide = function(link){
      var bodyTop = document.body.scrollTop;
      var navTop = document.getElementById("guide-nav").scrollTop;
      location.path("/guide/" + link.id);
      root.title = title + ": " + link.fullName;
      root.guide.now = link.id;

      if( typeof root.guide.document[link.id] == "undefined" ){
        http
          .get(root.links[link.id].url)
          .success(function(json){
            root.guide.document[link.id] = JSON2HTML(json);
            scrollTop(bodyTop, navTop);
          })
      } else scrollTop(bodyTop, navTop);
    }

    function scrollTop(body, nav){
      setTimeout(function(){
        document.body.scrollTop = body;
        document.getElementById("guide-nav").scrollTop = nav;
      }, 10)
    }

    function changeNav(isInit){
      scope.navHeight = (wind.innerHeight - 130) + "px";
      scope.docHeight = wind.innerHeight + "px";
      scope.top     = wind.scrollY;

      scope.scrollTop = document.body.scrollTop;

      if( isInit !== true ) scope.$digest();
    }

    // Bindings and Watchers
    angular.element(wind).bind("resize", changeNav);
    angular.element(wind).bind("scroll", changeNav);
  }

})();
