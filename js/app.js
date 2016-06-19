// by Mark Pajak (Bristol Museums Galleries and Archives


define([
  'jquery', 
  'underscore', 
  'backbone',
  'router'

], function($, _, Backbone, Router){
  var initialize = function(){

  
  
  Backbone.View.prototype.close = function () { //KILL ZOMBIE VIEWS!!!!

  this.undelegateEvents();
  this.$el.empty();
  this.unbind();
};
 


	

  
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});
