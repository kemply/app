"use strict";
!function(){
  var a = {};
  var i = {};

  Object.prototype.Push = function(k,v){
    if( typeof k == "object" )
      for(v in k) this[v] = k[v];
    else this[k] = v;

    return this
  }

  window.inc = i.Push({
    Yamap     : "yaMap",
    Cookies   : "ngCookies",
    Sanitize  : "ngSanitize",
    Route     : "ngRoute",
    http      : "$http",
    cookies   : "$cookies",
    scope     : "$scope",
    root      : "$rootScope",
    location  : "$location",
    provider  : {
      route     : "$routeProvider",
      location  : "$locationProvider"
    },
    store     : {
      cookies   : "$cookieStore"
    },
    param     : {
      route     : "$routeParams",
      location  : "$locationParams"
    }
  });

  window.api = a.Push({
    user      : {
      signIn    : "",
      signUp    : "",
      quit      : ""
    },

    archive   : {
      funds     : {},
      registers : {},
      cases     : {}
    },

    search    : {
      funds     : {},
      registers : {},
      cases     : {}
    }
  })
}()
