addEvent(window, 'load', initForm);

window.onload= function(){
var today = new Date().toISOString().split('T')[0];
document.getElementsByName("Field31")[0].setAttribute('min', today);
}

var highlight_array = new Array();

function initForm(){
	initializeFocus();
	var activeForm = document.getElementsByTagName('form')[0];
	addEvent(activeForm, 'submit', disableSubmitButton);
	ifInstructs();
	showRangeCounters();
}

function disableSubmitButton() {
	document.getElementById('saveForm').disabled = true;
}

// for radio and checkboxes, they have to be cleared manually, so they are added to the
// global array highlight_array so we dont have to loop through the dom every time.
function initializeFocus(){
	var fields = getElementsByClassName(document, "*", "field");
	
	for(i = 0; i < fields.length; i++) {
		if(fields[i].type == 'radio' || fields[i].type == 'checkbox') {
			fields[i].onclick = function() {highlight(this, 4);};
			fields[i].onfocus = function() {highlight(this, 4);};
		}
		else if(fields[i].className.match('addr') || fields[i].className.match('other')) {
			fields[i].onfocus = function(){highlight(this, 3);};
		}
		else {
			fields[i].onfocus = function(){highlight(this, 2); };
		}
	}
}

function highlight(el, depth){
	if(depth == 2){var fieldContainer = el.parentNode.parentNode;}
	if(depth == 3){var fieldContainer = el.parentNode.parentNode.parentNode;}
	if(depth == 4){var fieldContainer = el.parentNode.parentNode.parentNode.parentNode;}
	
	addClassName(fieldContainer, 'focused', true);
	var focusedFields = getElementsByClassName(document, "*", "focused");
	
	for(i = 0; i < focusedFields.length; i++) {
		if(focusedFields[i] != fieldContainer){
			removeClassName(focusedFields[i], 'focused');
		}
	}
}

function ifInstructs(){
	var container = document.getElementById('public');
	if(container){
		removeClassName(container,'noI');
		var instructs = getElementsByClassName(document,"*","instruct");
		if(instructs == ''){
			addClassName(container,'noI',true);
		}
		if(container.offsetWidth <= 450){
			addClassName(container,'altInstruct',true);
		}
	}
}

function showRangeCounters(){
	counters = getElementsByClassName(document, "em", "currently");
	for(i = 0; i < counters.length; i++) {
		counters[i].style.display = 'inline';
	}
}

function validateRange(ColumnId, RangeType) {
	if(document.getElementById('rangeUsedMsg'+ColumnId)) {
    var field;
    if (document.getElementById('Field'+ColumnId)) {
      field = document.getElementById('Field'+ColumnId);
    } else if (document.getElementById('Field'+ColumnId+'_other')) {
      field = document.getElementById('Field'+ColumnId+'_other');
    }
		var msg = document.getElementById('rangeUsedMsg'+ColumnId);

		switch(RangeType) {
			case 'character':
				msg.innerHTML = field.value.length;
				break;
				
			case 'word':
				var val = field.value;
				val = val.replace(/\n/g, " ");
				var words = val.split(" ");
				var used = 0;
				for(i =0; i < words.length; i++) {
					if(words[i].replace(/\s+$/,"") != "") used++;
				}
				msg.innerHTML = used;
				break;
				
			case 'digit':
				msg.innerHTML = field.value.length;
				break;
		}
	}
}




function handleRadioOther(id, last) {
  var label = document.getElementById(id+'_otherlabel');
  if (label) {
    if (last) {
      label.style.display = 'block';
    } else {
      label.style.display = 'none';
    }
  }
}



/*--------------------------------------------------------------------------*/

//http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];		
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}	
	}
	return (arrReturnElements)
}

//http://www.bigbold.com/snippets/posts/show/2630
function addClassName(objElement, strClass, blnMayAlreadyExist){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      if ( blnMayAlreadyExist ){
         var strClassUpper = strClass.toUpperCase();
         for ( var i = 0; i < arrList.length; i++ ){
            if ( arrList[i].toUpperCase() == strClassUpper ){
               arrList.splice(i, 1);
               i--;
             }
           }
      }
      arrList[arrList.length] = strClass;
      objElement.className = arrList.join(' ');
   }
   else{  
      objElement.className = strClass;
      }
}

//http://www.bigbold.com/snippets/posts/show/2630
function removeClassName(objElement, strClass){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      var strClassUpper = strClass.toUpperCase();
      for ( var i = 0; i < arrList.length; i++ ){
         if ( arrList[i].toUpperCase() == strClassUpper ){
            arrList.splice(i, 1);
            i--;
         }
      }
      objElement.className = arrList.join(' ');
   }
}

//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ) };
    obj.attachEvent( "on"+type, obj[type+fn] );
  } 
  else{
    obj.addEventListener( type, fn, false );	
  }
}

 $(document).ready(function() {
        $("#saveForm").click(function() {
        	$(":input[required]").each(function(){
        		var myForm= $('#form2');
        		if (myForm[0].checkValidity()){
        			formsubmit ();
        		}
        	})
            
     });
  });

 function formsubmit (){
 	        var position =$("#Field21").val();
            var avdate = $("#Field31").val();
            var fname = $("#Field1").val();
            var lname = $("#Field2").val();
            var ic = $("#Field19").val();
            var address = $("#Field5").val();
            var add2 = $("#Field6").val();
            var city = $("#Field7").val();
            var state = $("#Field8").val();
            var zip = $("#Field9").val();
            var country = $("#Field10").val();
            var ctc = $("#Field24").val();
            var email = $("#Field25").val();
            var skills = $("#Field28").val();
            var exp = $("#Field29").val();
  			var sent = '{"Field21":"' + position + '", "Field31":"' + avdate + '", "Field1":"' + fname + '", "Field2":"' + lname + '","Field19":"' + ic + '","Field5":"' + address + '", "Field6":"' + add2 + '","Field7":"' + city + '","Field8":"' + state + '","Field9":"' + zip + '","Field10":"' + country + '","Field24":"' + ctc + '","Field25":"' + email + '","Field28":"' + skills + '", "Field29":"' + exp + '"}';
            console.log (sent);

            $.ajax({
                url: "https://sheetsu.com/apis/v1.0/90b6fba5cd3a",
                type: "POST",
                data: sent,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function() {
                    alert('Your application is successfully submitted. We will call you soonest as possible. Thank you.')
                    location.reload ();
                }
            });
 }