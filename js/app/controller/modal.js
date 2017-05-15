'use strict';
(function(){
  var modal = [];

  angular
    .module('modal', [])
    .directive('openModal', function(){
      return function(scope, element, attribute){
        var id = attribute.openModal
        if( typeof modal[id] == 'undefined' )
          modal[id] = {};

        element.on('click', function(){
          
        })
      }
    })

})();
