"use strict";
;(function(){

  window.app
    .controller("PanelCTRL", inc.concat(["scope", "root", "http", "location", "param.route", PanelCTRL]));

  function PanelCTRL(scope, root, http, location, param){
    // Инициализация
    var title   = "Панель управления";
    root.currentPage = "panel";

    if( typeof param.module == "undefined" )
      location.path("/panel/users");

    if( typeof root.Panel == "undefined" )
      root.Panel = {
        module  : {}
      };

    // Локальная видимость
    scope.module = param.module;

    // Глобальная видимость
    // if( root. )
  }

})();
