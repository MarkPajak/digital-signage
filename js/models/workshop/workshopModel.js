define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    	WorkShopModel = Backbone.Model.extend({

        defaults: {
            category: '',
			imageIrn:93503,
			type: '',//nb DO NOT USE
			source: 'google',
			name: 'school '	,		
            room: 'Schools Room',
			roomLocation: 'front hall',
			startTime:10,
			endTime:11,
			startDate:'', 
			endDate:'',           
			timings:"",
			images:"",
			startTimeAMPM:"",
			startTimeMinutes:"",
			endTimeMinutes:"",
			endTimeAMPM:"",
			requirements:""
     
        },
        initialize: function(){
            //alert("Welcome to this world");
        },
        adopt: function( newChildsName ){
           // this.set({ child: newChildsName });
        }
    	})

  return WorkShopModel;

});


