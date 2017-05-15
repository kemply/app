// "use strict";
;(function(){
  window.app = angular
    .module("app", inc.concat(['module.user', 'module.modal', "Route", "Sanitize", "Cookies", "Yamap"]))
    .run(['$http', '$cookies', function($http, $cookies) {
      $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    }])
    .config(inc.concat(["provider.route", "provider.location", "provider.http", Config]))
    .controller("MainCTRL", inc.concat(["scope", "root", "http", "store.cookies", "cookies", MainCTRL]))

    function MainCTRL(scope, root, http, cookies, hProvider, cook){
      scope.user = root.user;

      // session();
      window.cookies = cookies;

      scope.modal = {close:function(modal){
        if( typeof modal.keyCode != "undefined" && modal.keyCode == 27 )
          return this["signIn"] = this["signUp"] = false;

        if( modal.target.classList.contains("modal") )
          this[ modal.target.getAttribute("data") ] = false;
      }};

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

        function session(){
          if( typeof cookies.get("JSESSIONID") != "undefined" ) return;

          http.get("http://jsonip.com/").success(function(data){
            var hash = md5(navigator.userAgent + data.ip + Date()).toUpperCase();

            root.ip = data.ip;
            cookies('JSESSIONID', hash, {domain});
            return hash;
          })

        }
    }

    function Config(route, location, http){
      http.defaults.withCredentials = true;
      location.html5Mode(true);

      route.
        when("/", {
          redirectTo  : "/guide"
        })

        .when("/guide", {
          templateUrl : "/view/guide.html",
          controller  : "GuideCTRL"
        })
        .when("/guide/:document", {
          templateUrl : "/view/guide.html",
          controller  : "GuideCTRL"
        })

        .when("/archive", {
          templateUrl : "/view/archive.php",
          controller  : "ArchiveCTRL"
        })

        .when("/enquiry", {
          templateUrl : "/view/enquiry.php",
          controller  : "EnquiryCTRL"
        })

        .when("/panel", {
          templateUrl : "/view/panel.php",
          controller  : "PanelCTRL"
        })
        .when("/panel/:module", {
          templateUrl : "/view/panel.php",
          controller  : "PanelCTRL"
        });
    }
})();
