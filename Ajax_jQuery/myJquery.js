/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Lesson 12: AJAX
	Shane May
	12/06/2012
*/


	/*
		When DOM is ready, do stuff.
	*/
	$(document).ready(function(){
		
		/*
			Click event handler for all inputs, which happen to be buttons.
		*/
		$('input').click(function(){
			
			// the String value of the clicked button, e.g., "Button 1"
			var clickedElementValue = this.value;
			var url = "";
			
			// depending on which button is clicked, add .js to page
			switch(clickedElementValue){
			
				case "Button 1":
					url = "Data1.js";
					
					// this works (would be used instead of "old school" way noted below).
					//$('body').append('<script type="text/javascript" src="Data1.js"></script>');
					break;
					
				case "Button 2":				
					url = "Data2.js";
					break;
					
				case "Button 3":
					url = "Data3.js";
					break;
					
				default:
					console.log("switch broken");		
			}
			
			// "old school" way of adding element to page			
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			$('body').append(script);
		
		});
	});

	/*
		ajaxFunction is invoked by javascript that has been added to the HTML page.
			When a button is clicked a <script> element is added, this adds javascript to the
			HTML page and the js compiler immediately (?) reads the script which invokes this function.
		
		@param URL is the location of the data file to retreive via AJAX.
		The argument is sent by the <script> file that runs.
		
		@see the Data1.js file for example of inserted script file.
	*/
	function ajaxFunction(URL_of_file){
		$('#ajaxDisplay').load(URL_of_file);
	}
	
	
