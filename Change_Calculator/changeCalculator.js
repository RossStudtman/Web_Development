/*
	Ross Studtman
	CIS 131
	Project 1: Change Calculator
	Shane May
	9/19/2012
*/

/*
	add click event handler to button
*/
	document.getElementById('calculate').addEventListener('click', calculate, false);
	
/*
	function calculate exchanges a quantity of pennies for fewest number of coins.
	Displays result to user.
*/
	function calculate(){
		// assign constants
		var QUARTER = 25;
		var DIME = 10;
		var NICKEL = 5;
		
		// obtain user's valid number of pennies. 
		var totalPennies = validateInput();
		
		// obtain quantity of quarters
		var qtyQuarters = Math.floor(totalPennies / QUARTER);
		
		// remaining pennies after quarters taken out
		totalPennies %= QUARTER;
		
		// obtain quantity of dimes
		var qtyDimes = Math.floor(totalPennies / DIME);
		
		// remaning pennies after dimes taken out
		totalPennies %= DIME;
		
		// obtain quantity of nickels
		var qtyNickels = Math.floor(totalPennies / NICKEL);
		
		// remaining pennies after nickels taken out
		totalPennies %= NICKEL;
		
		// remaining pennies equals pennies left over
		var qtyPennies = totalPennies;
		
		// assign output
		document.getElementById('quarters').value = qtyQuarters;
		document.getElementById('dimes').value = qtyDimes;
		document.getElementById('nickels').value = qtyNickels;
		document.getElementById('pennies').value = qtyPennies;
	}
	
	
/*
	function validateInput determins if user's input is a valid number.
	Return valid number of pennies.
*/
	function validateInput(){
		// obtain user's input
		var pennies = document.getElementById('qtyPennies').value;

		// convert user's input to number
		pennies = parseInt(pennies);
		
		// determine if input is a number, if not prompt for number
		while(isNaN(pennies)){
			
			// prompt
			pennies = prompt("Please enter a number: ");
			
			// set value of prompt to user input text field
			document.getElementById('qtyPennies').value = pennies;
		}		
		return pennies;
	}