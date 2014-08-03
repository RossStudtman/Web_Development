/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Project 4: Baseball Team Roster
	Shane May
	12/06/2012
*/

	/*
		When DOM is loaded this function is invoked.
	*/
	$(document).ready(function(){
	
		// populate the <select> with options
		selectOptions();
		
		// give focus to first textbox
		formFocus();

		// event handler for "Set" button.
		$('#setTeamName').click(function(event){
		
			// get text from #teamName and place into #displayTeamName
			$('#displayTeamName').html($('#teamName').val());

			// move focus to next text field
			playerFocus();
		});
		
		// event handler for "Add" button.
		$('#addPlayer').click(function(){
		
			// jQuery object
			var $newLi = $('<li>' + $('#playerName').val() + ' - ' +$('#positionSelect').val()   +'</li>');
			
			// insert jquery object
			$('#displayPlayerPosition').append($newLi);
			
			// remove selected option from <select> 
			$('#positionSelect option:selected').remove();
			
			// remove <select> and "Add" button if no more options available
			if($('#positionSelect option').length === 0){
			
				$('.hide').hide();
				
				// reveal a message when <select> and button are hidden
				$('#revealMessage').addClass('revealMessage').text("no more positions");
			}
			
			// rest player name
			resetPlayerName()
			
			// return focus to player text field.
			playerFocus();
		});
		
		// event handler for reset button.
		$('#reset').click(reset);			
	});
	
	/*
		For populating player position <select> with options. Contains
		event handlers for sport buttons (baseball, basketball, football,
		footballOL and footballDL).
		
		Note: this function SHOULD NOT be invoked by anything other
		than the .ready() function because more than one invokation 
		will result in multiple event handlers being created.
			This could possibly be fixed with a program life-long 
			boolean that allows access to an inner function only once.
	*/
	function selectOptions(){
	
		// load default select options		
		defaultSelectOptions();			
	
		// event handler for sport buttons
		$('#sportButtons button').click(function(){
		
			// clear displays for team name and roster
			clearDisplays();
			
			// ensure <select> is displayed.
			displaySelect();

			// give focus to first text field of form
			formFocus();
			
			// string representing #id of clicked button
			var buttonString = $(this).attr('id');
			
			// determine whether to show or hide auxillary football buttons
			if(buttonString === "football"){
			
				$('.hiddenFootball').show();

				// remove default <select> option
				removeOptions();
				
			}else{
			
				$('.hiddenFootball').hide();
				
				// buttonString is baseball or basketball, create <option>s
				createOptions(buttonString);
			}
			
			// create <option>s
			//createOptions(buttonString);
		});
				
		// event handler for "Offensive Line" & "Defensive Line" buttons.
		$('.hiddenFootball').click(function(event){
			
			// clear displays for team name and roster
			clearDisplays();
			
			// ensure <select> is displayed.
			displaySelect();	
			
			// give focus to player name text field of form
			playerFocus();

			// string representing #id of clicked button
			var buttonString = $(this).attr('id');
			
			// create <option>s
			createOptions(buttonString);			
		});		
	}	
	
	/*
		Function createOptions populates a <select> with appropriate <option>s.
		
		@param fileRoot is the name of the file without the .json extension
		(is the URL of the file).
	*/
	function createOptions(fileRoot){
	
		// remove any options remaining in <select>
		removeOptions();

		// create JSON string
		var jsonFile = fileRoot + ".json";		
	
		// create JSON connection, get file, parse file, add contents to <select> as <options>.
		$.getJSON(jsonFile, function(data){
		
			$.each(data, function(key, val){
			
				$('#positionSelect').append('<option value="'+val+'">'+val +'</option>');
				
			});
		});			
	}
	
	/*
		Reset displays, form, and hide things that need hiding and
		show things that need showing.
	*/
	function reset(){
		
		// reset team name & player name text fields
		resetFormTextFields();
		
		// remove any options remaining
		removeOptions();
		
		// clear displays for team name and roster
		clearDisplays();
		
		// repopulate <select> with default options
		defaultSelectOptions();
		
		// display <select> and "Add" button
		displaySelect();
		
		// hide footballOL & footballDL buttons if showing
		$('.hiddenFootball').hide();
	}		
	
//
//	UTILITY FUNCTIONS
//

	/*
		Clear displays.
	*/
	function clearDisplays(){
		$('#displayTeamName, #displayPlayerPosition').empty();
	}
	
	/*
		Remove all <select> options.
	*/
	function removeOptions(){
		$('#positionSelect option').remove();
	}
	
	/*
		Reset form text fields.
	*/
	function resetFormTextFields(){
		$('#teamName, #playerName').val("");
	}
	
	/*
		Clears player name text field of form.
	*/
	function resetPlayerName(){
		$('#playerName').val("");
	}
	
	/*
		Fill <select> with default <option>s.
	*/
	function defaultSelectOptions(){
		createOptions("baseball");
	}	
	
	/*
		Remove revealed <span> message that appears when
		<select> options are empty.
	*/
	function removeRevealedMessage(){
		$('#revealMessage').removeClass('revealMessage').empty();
	}
	
	/*
		Displays <select> and "Add" button.
	*/
	function displaySelect(){
		$('.hide').show();
		removeRevealedMessage();
	}
	
	/*
		Set focus to first text field on form.
	*/
	function formFocus(){
		$('#teamName').focus();
	}
	
	/*
		Set focus to player text field on form.
	*/
	function playerFocus(){
		$('#playerName').focus();
	}

	
