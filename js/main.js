// by Mark Pajak (Bristol Museums Galleries and Archives
require.config({
	paths:{
	jquery:'libs/jquery/jquery-min',
	underscore:'libs/underscore/underscore-min',
	backbone:'libs/backbone/backbone-min',	
	templates: '../templates',
	Globals:'helpers/Globals',
	workshops:'text!data/workshops.JSON'
	}
	})

require([

//load the app module and pass it to the definition function

"app"], function(App) {

console.log('production mode - logging disabled')
console.log = function() {}

require.onerror = function() {
  location.reload()	
}

App.initialize();
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".


	


});
