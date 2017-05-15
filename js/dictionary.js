"use strict";
!function(){
  var a = {Push:function(k,v){
    if( typeof k == "object" )
      for(v in k) this[v] = k[v];
    else this[k] = v;

    return this
  }};
  var i = {Push:a.Push, concat:function(array){
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

  window.inc = i.Push({
    module    : {
      user      : 'user',
      modal     : 'modal'
    },
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
      location  : "$locationProvider",
      http      : "$httpProvider"
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
    mirror    : '/mirror.php',
    base      : "http://api.app.loc:8080/wax/a/archive/default",
    user      : {
      signIn    : "/ru/session/sessionIn",
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
    },

    Prepare    : function(o){
      var k, v, r = "";
      for(k in o)
        if( typeof k != "undefined" ) r += k + "=" + o[k] + "&";
      return r.substr(0, r.length-1)
    }
  })

  inc.inject = [inc.scope, inc.root, inc.http, inc.location, inc.param.route];
}()
