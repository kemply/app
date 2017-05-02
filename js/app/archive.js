"use strict";
;(function(){

  angular
    .module("app.archive", [inc.Route, inc.Sanitize])
    .config(configArchive)
    .controller("ArchiveCTRL", ArchiveCTRL);

  ArchiveCTRL.$inject = [inc.scope, inc.root, inc.http, inc.location, inc.param.route];
  function ArchiveCTRL(scope, root, http, location, param){
    var title   = "Читальный зал";
    root.title   = "Читальный зал";
    root.currentPage = "archive";

  }

  configArchive.$inject = [inc.provider.route, inc.provider.location];
  function configArchive(route, location){
    location.html5Mode(true);

    route
      .when("/archive", {
        templateUrl : "/view/archive.php",
        controller  : "ArchiveCTRL"
      });
  }

})();
