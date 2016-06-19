requirejs(['jquery'],
function   ($) {



define({


Globals: { //these can be passed into any template
Thesaurus:[],
ImageFolder: 'images/',
ImageRedirectURLInternal : "http://emudev-app1/~brlsmp4/bmga/multimedia/entry.php?request=resource&irn=",
ImageSizePrefix: '',
ImageRedirectURL: 'http://museums.bristol.gov.uk/emuweb/php5/media.php?irn=',
viewportwidth:   $(window).width(),
viewportheight : $(window).height(),
 MaxNoImages: Math.round( $(window).width() * window.innerHeight *0.000115)+20,
 MaxBoxSize: Math.round(this.MaxNoImages*0.003),
 halfMaxBoxSize: Math.round(this.MaxBoxSize/2),
  shuffle: function(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;

},

comments:[],
addImagesToBackgroundCollege: function(){
var self=this
},

curentView:[],
count:0,

 

 boxsises :[11,33,32,11,11,11,31,22,11,21,22,11,12,21,23,22,21,12,23,11,21,12,21,22,22, Number("" +  this.MaxBoxSize +  this.MaxBoxSize)],
 
FindTermDefinition: function(termTomatch){

var termTomatch = termTomatch||"xxxx"
var TermDefinition = false;


		 $.each(this.Thesaurus, function(key, term) {


				 if(termTomatch.toLowerCase()==term.attributes.term.toLowerCase()){
				 TermDefinition=term.attributes.definition
				
				
				 }
		 })
 return TermDefinition;
},

 addPopover: function(title,dataContent,unpoppedText,idToappendTo,TitleYes){
var title = title||"Optional Title"
var dataContent = dataContent||"Content that is too long to display because there is too much of it to fit in your table cell. But it all fits in this popover!"
var unpoppedText = unpoppedText||"Content that is too long to display..."
			var popOverhtml =  '<p><td>';
			if(TitleYes)	{popOverhtml += '<a  role="button" data-toggle="popover" data-trigger="focus"  href="#" style="color:#FFFFFF;text-decoration: none;" class=" too-long" title="' + title + '"   data-content="' + dataContent  + '"  data-placement="bottom">';}
			else
			{
			popOverhtml += '<a href="#"  style="color:#FFFFFF;text-decoration: none;" role="button" data-toggle="popover" data-trigger="focus"data-container="body" class=" too-long"    data-content="' + dataContent  + '"  data-placement="bottom">';
			
			}
				popOverhtml += unpoppedText + '</a>';
				popOverhtml += '</td>';
 var StickpopoverAfter = document.getElementById(idToappendTo);
 $(StickpopoverAfter).append( popOverhtml)

//$('.too-long').popover({ html : true, container: 'body'})

$('.too-long').click(function(e) {
     // do something fancy
     return false; // prevent default click action from happening!
     e.preventDefault(); // same thing as above
});

return popOverhtml
},

 ReplaceBodyTextWithPopover: function(BodyText){
var BodyText=BodyText||"xxx"
 var text = BodyText.split(' ');
 var NewBodyText=[];

 for( var i = 0, len=text.length; i<len; i++ ) {

           var Word = text[i]
         Word= this.ReplaceWordWithPopOverHTML(Word) ||Word
          
		 NewBodyText.push(Word)
		  
        }
           
	
	return NewBodyText.join(" ");		
},

ReplaceWordWithPopOverHTML: function (Word){
var Word = Word||"xxxx"
var Definition = this.FindTermDefinition(Word)||Word;

if(this.FindTermDefinition(Word)){

var title = title||"Definition"
var dataContent = Definition||"Content that is too long to display because there is too much of it to fit in your table cell. But it all fits in this popover!"
var unpoppedText = Word||"Content that is too long to display..."
			var popOverhtml =  '<td>';
		
			popOverhtml += '<a href="#" data-container="body" class="thesauruspopover"    data-content="' + dataContent  + '"  data-placement="bottom">';
			
			
				popOverhtml += unpoppedText + '</a>';
				popOverhtml += '</td>';

				
				
return popOverhtml;
}
//return false;
},
 
 CheckFieldForKeyword: function(field, keyword){
									var sentencex=""
  									if (field.length>0) {
								
											var keywordx=" " + keyword + " "
		                                    var strs = "xxx " + field.toUpperCase() + " XXX " ;//+ whatIsitx + " XXX";
		                                    var n = strs.indexOf(keywordx );	
											if (n == 0) {n = strs.indexOf(keyword + ".")}
											if (n == 0) {n = strs.indexOf(keyword + "es")}
											if (n == 0) {n = strs.indexOf(keyword + "s")};
											if (n == 0) {n = strs.indexOf(keyword + "ing")};
											if (n > 0) {
											var newSentenct=[]
											var sentenceArray= field.split(/[\\.!\?]/);
											newSentenct.push(sentenceArray)
											if(newSentenct){
											
											$.each(sentenceArray, function(i, sentence) {
											var strs = "xxx " + sentence.toUpperCase() + " XXX " ;//+ whatIsitx + " XXX";
											var n = strs.indexOf(keyword);
											 if (n > 0) {
											  sentencex=sentence
											 return '"' + sentencex	+ '"'	
											}
											})
												if( sentencex.length>0){																
													return sentencex}//else{													return false}
											}
																																				
											   }  else  { return false};
											  
											   
									}  else  { return false};
								
									}

}


	   
	 
    
});

});