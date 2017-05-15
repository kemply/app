'user strict';
(function(){

  angular
    .module('user', [])
    .controller('user', user);

  user.$inject = inc.concat(['scope', 'root', 'http']);
  function user(scope, root, http){
    scope.signIn = signIn;
    scope.signUp = signUp;

    function signIn(){
      var data = {
        url     : api.base + api.user.signIn,
        login   : scope.login,
        passwd  : scope.passwd
      };

      http
        .post((api.morror || data.url), data, { 'Content-Type' : 'application/x-www-form-urlencoded' })
        .success(function(data, status){

        })
    }

    function signUp(){
      var data = {
        url     : api.base + api.user.signUp,
        login   : scope.login,
        passwd  : scope.passwd
      };

      http
        .post((api.morror || data.url), data, { 'Content-Type' : 'application/x-www-form-urlencoded' })
        .success(function(data, status){

        })
    }
  }

})();
