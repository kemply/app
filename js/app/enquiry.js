"use strict";
;(function(){

  angular
    .module("app.enquiry", [inc.Route, inc.Sanitize, inc.Yamap])
    .config(configEnquiry)
    .controller("EnquiryCTRL", EnquiryCTRL);

  EnquiryCTRL.$inject = [inc.scope, inc.root, inc.http, inc.location, inc.param.route];
  function EnquiryCTRL(scope, root, http, location, param){
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

  configEnquiry.$inject = [inc.provider.route, inc.provider.location];
  function configEnquiry(route, location){
    location.html5Mode(true);

    route
      .when("/enquiry", {
        templateUrl : "/view/enquiry.php",
        controller  : "EnquiryCTRL"
      });
  }

})();
