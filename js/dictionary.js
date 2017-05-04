"use strict";
!function(){
  var a = {};
  var i = {concat:function(array){
    var q, i;
    for(i = 0; q = array[i]; ++i){
      if( typeof array[i] == "function" ) continue;

      q = q.split(".");
      if( q.length == 1 )
        array[i] = this[q[0]];
      else {
        var a, w;
        for(a = 0; w = q[a]; ++a)
          if(!a) array[i] = this[w];
          else array[i] = array[i][w];
      }
    }

    return array;
  }};

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
    window    : "$window",
    scroll    : "$anchorScroll",
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

  inc.inject = [inc.scope, inc.root, inc.http, inc.location, inc.param.route];
}()
