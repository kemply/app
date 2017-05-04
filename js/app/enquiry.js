"use strict";
;(function(){

  window.app
    .controller("EnquiryCTRL", inc.concat(["scope", "root", EnquiryCTRL]));

  function EnquiryCTRL(scope, root){
    var title   = "Справочник";
    root.title   = "Справочник";
    root.currentPage = "enquiry";

    scope.geoObject = {
      geometry: {
        type: "Point",
        coordinates: [71.433494, 51.135751]
      }
    };

  }

})();
