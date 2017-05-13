"use strict";
;(function(){
  window.app
    .controller("ArchiveCTRL", inc.concat(["scope", "root", ArchiveCTRL]));

  function ArchiveCTRL(scope, root){
    var title   = "Читальный зал";
    root.title   = "Читальный зал";
    root.currentPage = "archive";

  }

})();
