"use strict";
;(function(){
  angular
    .module("app", [inc.Route, inc.Sanitize, inc.Cookies, "app.guide", "app.archive", "app.enquiry"])
    .config(Config)
    .controller("MainCTRL", MainCTRL)

    MainCTRL.$inject = [inc.scope, inc.root, inc.http, inc.store.cookies];
    function MainCTRL(scope, root, http, cookies, nav){
      http
        .get("/api/lang/list.json")
        .success(function(json){
          root.lang = {
            use   : false,
            list  : json
          };

          if( typeof cookies.get("lang") == "undefined" ){
            if( !(root.lang.use = json[navigator.language]) ){
              for(var l, i = 0; l = navigator.languages[i]; ++i)
                if( root.lang.use = json[l.substr(0, 2)] ) break;
            }

            if( !root.lang.use ) root.lang.use = json["ru"];
            cookies.put("lang", "ru");
          } else root.lang.use = json[ cookies.get("lang") ];

          scope.setLang(root.lang.use);

        })

        scope.setLang = function(lang){
          http
            .get(lang.file)
            .success(function(json){
              cookies.put("lang", lang.code);
              root.lang._ = json;
              root.lang.use = lang;
            })
        }

        root._ = function(key){
          return this.lang._[key];
        }
    }

    Config.$inject = [inc.provider.route, inc.provider.location];
    function Config(route, location){
      location.html5Mode(true);

      route.
        when("/", {
          redirectTo  : "/guide"
        });
    }
})();
