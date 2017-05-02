"use strict";
;(function(){

  angular
    .module("app.guide", [inc.Route, inc.Sanitize])
    .config(configGuide)
    .controller("GuideCTRL", GuideCTRL);

  GuideCTRL.$inject = [inc.scope, inc.root, inc.http, inc.location, inc.param.route];
  function GuideCTRL(scope, root, http, location, param){
    var title   = "Путеводитель по архиву";
    root.currentPage = "guide";

    if( typeof root.links == "undefined" ){
      http
        .get("/api/guide/all.json")
        .success(function(json){
          var i, q, links = [];
          for(i = 0; q = json[i]; ++i){
            links.push({
              id        : i,
              url       : q.url,
              shortName : q.shortName,
              fullName  : q.fullName
            })
          }

          root.links = links;

          if( typeof root.guide == "undefined" ){
            root.guide = {
              now       : param.document || 0,
              document  : []
            }
          }

          scope.changeGuide(links[ root.guide.now ]);
        })
    }

    scope.changeGuide = function(link){
      location.path("/guide/" + link.id);
      root.title = title + ": " + link.fullName;
      root.guide.now = link.id;

      if( typeof root.guide.document[link.id] == "undefined" ){
        http
          .get(root.links[link.id].url)
          .success(function(json){
            // Не рекомендую вникать в код ниже до следующего комментария
            // Серьезно, чувак! Если тебе важна психика, то не лезь!
            // Там такой хаус, что сам черт ногу сломает
            // Это всего лишь парсер JSON в HTML
            // Дохуя Оптимизированный
            // Уверен, через неделю сам не буду понимать, что это такое

            var c, i, p, s, h = {
              c : function(t, a){
                for(var z, r = "", x = 0; x != a.length; ++x)
                  if( z = a[x] ){
                    if( x == a.length-1 ) r += z;
                    else r += z + " ";
                  }

                  return t + '="' + r + '"';
              },
              p : function(a){
                for(var z, x = 0; z = a[x]; ++x)
                  this.t += z;
              },
              t : ""
            };

            for(i = 0; s = json.document[i]; ++i){
              p = s.position  || "none";
              c = s.class     || "";

              if( p == "left" || p == "right")
                s.content = '<span class="span">' + s.content + '</span>';

              if( !s.type.search("title-") ){
                s.type = "h" + s.type.substr(6);
                h.p(["<", s.type, h.c(" class", [s.type, c, p]), ">", s.content, "</", s.type, ">"])
              }
              else switch (s.type){
                case "paragraph":
                  h.p(["<p", h.c(" class", ["p", c, p]), '>', s.content, "</p>"]);
                break;

                case "italic":
                  h.p(["<p", h.c(" class", ["p", "italic", c, p]), '>', s.content, "</p>"]);
                break;

                case "link":
                  h.p(["<a", h.c(" href", [s.link]), h.c(" class", [c, p]), '>', s.content, "</a>"]);
                break;

                case "table":
                  var ti, tr, td, ti2;
                  h.p(['<table class="table"><thead class="head"><tr>']);
                  for(ti = 0; td = s.head[ti]; ++ti)
                    h.p(['<th class="th"', h.c(" colspan", [td.sizeX]), h.c(" rowspan", [td.sizeY]), ">", td.content, "</th>"]);

                  h.p(['</tr></thead><tbody class="body">']);
                  for(ti = 0; tr = s.body[ti]; ++ti){
                    h.p(['<tr class="tr">']);
                    for(ti2 = 0; td = tr[ti2]; ++ti2){
                      if( typeof td.bold != "undefined" ) td.bold = "bold";
                      h.p(['<td', h.c(" class", ["td", td.bold]), h.c(" colspan", [td.sizeX]), h.c(" rowspan", [td.sizeY]), ">", td.content, "</td>"]);
                    }

                    h.p(["</tr>"]);
                  }

                  h.p(["</table>"]);
                break;
              }
            }

            // Вот теперь, дальше безопасно =)
            root.guide.document[link.id] = h.t;
          })
      }

    }
  }

  configGuide.$inject = [inc.provider.route, inc.provider.location];
  function configGuide(route, location){
    location.html5Mode(true);

    route
      .when("/guide", {
        templateUrl : "/view/guide.html",
        controller  : "GuideCTRL"
      })
      .when("/guide/:document", {
        templateUrl : "/view/guide.html",
        controller  : "GuideCTRL"
      });
  }

})();
