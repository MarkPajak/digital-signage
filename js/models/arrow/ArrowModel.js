define([
  'jquery',
  'underscore',
  'backbone',
], function($,_, Backbone) {

  var ArrowModel =  Backbone.Model.extend({
  
    initialize : function(){

         // console.log( 'Before bind events how is our model?', this.toJSON() );

          this.bind("change", this.changeHandler)
          this.bind("change:site_name", this.nameChangeHandler)
          this.bind("change:age", this.ageChangeHandler)

        },
		
/*

+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| machine_id  | int(11)      | YES  |     | NULL    |                |
| event_space | varchar(255) | YES  |     | NULL    |                |
| direction   | int(11)      | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+


*/

 defaults: {
       
		  machine_id:"123456", 
		  event_space: "new space",		
		  direction: 1
      
        },
   
  sync: function (method, model, options) {

//with thanks to https://amitgharat.wordpress.com/2012/06/23/writing-your-first-application-using-backbone-js/

    if (method === 'create' ||method === 'edit' || method === 'update') {
		      return $.ajax({
			dataType: 'json',
			url: 'data/arrows.JSON',
			data: {
			machine_id:(this.get('machine_id')||'default'),
			id:(this.get('id')||'default'),
			event_space:(this.get('event_space')||'default'),
			direction:(this.get('direction')||'default'),
			action:method		  
						},
			success: function (data) {
			
			}
			});
				
			
    	}
	else
	{
	 return $.ajax({
			dataType: 'json',
			url:  'data/arrows.JSON',
			data: {
			 id:(this.get('id')||'default'),
			  heading:this.get('heading'),
			  text: (this.get('text') || ''),
			  action:'delete'
			},
			success: function (data) {
			//alert('model deleted')
		  	
			}
		      	});
	}
  }
    	})


  return ArrowModel;

});
