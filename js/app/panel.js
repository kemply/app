"use strict";
;(function(){

  window.app
    .controller("PanelCTRL", inc.concat(["scope", "root", "http", "location", "param.route", PanelCTRL]));

  function PanelCTRL(scope, root, http, location, param){
    // Инициализация
    var title   = "Панель управления";
    root.currentPage = "panel";

    if( typeof param.module == "undefined" )
      return location.path("/panel/users");

    if( typeof root.Panel == "undefined" )
      root.Panel = {
        module  : {}
      };

    // Локальная видимость
    scope.module  = param.module;
    scope.content = "/view/panel/" + param.module + ".php";

    // Глобальная видимость
    // if( root. )

    switch (param.module){
      case "users":
        root.title = "Редактирование пользователей: Функциональная панель архива";
        scope.DaTa = [{id:1000,name:0,begin:1800,end:1800} ,{id:1001,name:1000,begin:2800,end:2800} ,{id:1002,name:500,begin:2300,end:2300} ,{id:1003,name:333,begin:2133,end:2133} ,{id:1004,name:250,begin:2050,end:2050} ,{id:1005,name:200,begin:2000,end:2000} ,{id:1006,name:166,begin:1966,end:1966} ,{id:1007,name:142,begin:1942,end:1942} ,{id:1008,name:125,begin:1925,end:1925} ,{id:1009,name:111,begin:1911,end:1911} ,{id:1010,name:100,begin:1900,end:1900} ,{id:1011,name:90,begin:1890,end:1890} ,{id:1012,name:83,begin:1883,end:1883} ,{id:1013,name:76,begin:1876,end:1876} ,{id:1014,name:71,begin:1871,end:1871} ,{id:1015,name:66,begin:1866,end:1866} ,{id:1016,name:62,begin:1862,end:1862} ,{id:1017,name:58,begin:1858,end:1858} ,{id:1018,name:55,begin:1855,end:1855} ,{id:1019,name:52,begin:1852,end:1852} ];
      break;
    }
  }

})();
