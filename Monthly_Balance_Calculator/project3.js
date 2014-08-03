/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Project 3: Monthly Balance Calculator
	Shane May
	11/08/2012
	
	This file organized into:
	
		* User Authentication
		* Objects
		* Listeners
		* Handlers
		* Input Validation
		* Calculations
		* Display Related
		
*/

//
//	Ensure user has a right to visit this web page.
//

	//attach load event listener to window  
	window.addEventListener('load', verifyPassword, false);
	
	// attach blur event listener to window
	window.addEventListener('blur', verifyPassword, false);
	
	/*
		Event handler for window load event. Ensures user has proper credentials
		via looking for password name:value pair held in document.cookie collection.
	*/
	function verifyPassword(){
		
		// decode cookies
		var allCookies = decodeURIComponent(document.cookie);
		
		var password;
		
		// is the password cookie present?	
		if(hasCookie("password", allCookies)){
			
			// password cookie present, get password value 
			password = getCookie("password", allCookies);	
			
		}else{			
			// send user to login page 
			location.href = "project3_login.html";
		}
		
		// password is present, is it valid?
		if(isValidPassword(password)){
			// they get to stay		
			// cookie expires in...
		}else{
			// send user to login page 
			location.href = "project3_login.html";
		}
	}
	
//
//	Objects
//
			
	// default account balance
	var DEFAULT_BALANCE = 2000.00;
	
	// object initializer for an Account
	var Account = {
		startBalance: DEFAULT_BALANCE,
		runningBalance: 0.0,
		endingBalance: 0.0,
		totalDeposits: 0.0,
		totalWithdrawals: 0.0,
		transactionsArray: []	
	};	
	
	/*
		The Transaction class is for creating Transaction objects.
		
		@param date is the date of the transaction.
		@param type is the type of transaction (eg, withdrawal, deposit).
		@param amount is the amount of the transaction.
	*/
	function Transaction(date, transactionType, amount){
		this.date = date;
		this.type = transactionType;
		this.amount = amount;	
	}

	/*
		Create a new Date object from user's input.
		
		@param element is the form element that had date data.
		Note: this parameter has been verified to conform to format restrictions.
		
		@return new date object.
	*/	
	function getDateObject(element){	
	
		// Get value from element
		var dateString = element.value;
		
		// Ensure proper format: 12.12.1222 or 12-12-1222 --> 12/12/1222
		var dateString = dateString.replace(/[-.]/g, "/");
	
		// Create new date from properly formatted string
		var date = new Date(dateString);		
		
		return date;
	}	
	
	
//
//	Listeners
//

	/* attach event listener to form's "Add Transaction" button */
	document.getElementById('button').addEventListener('click', saveTransaction, false);
	
//
// Handlers
//

	/*
		Event handler for "Add Transaction" button.
		Calls function for validating user's input.
		Then saves user's input as a Transaction object to the Account.transactionsArray.
		Then calls a calculation function to perform calculations.
		Then calls a display function for updating the web page's display of this data.
	*/
	function saveTransaction(){
	
		// transaction variables
		var date;
		var transactionType;
		var amount;
	
		// check that user entered valid date format of "mm/dd/yyyy"
		if(isValidDateFormat(this.form.transactionDate)){			
		
			// if number of days in month is proper, create date object.
			if(hasProperDaysPerMonth(this.form.transactionDate)){
			
				// create new date object
				date = getDateObject(this.form.transactionDate);	
				
			}else{
			
				// return user to form
				return;
				
			}
		}else{
		
			// return user to form
			return;
			
		}
		
		// obtain type of transaction
		transactionType = getTransactionType(this.form.transactionType);
		
		// validate user entered amount between 0 and 100,000
		if(isValidAmount(this.form.transactionAmount)){
		
			amount = getTransactionAmount(this.form.transactionAmount);
			
		}else{
		
			// return user to form
			return;
		}
		
		// if withdrawal: change amount to negative value.
		if(transactionType === "withdrawal"){
		
			var NEGATIVE = -1;
			
			amount *= NEGATIVE;
			
		}//else amount remains positive (deposit).
		
		// push new Transaction onto transaction array		
		Account.transactionsArray.push(new Transaction(date, transactionType, amount));
		
		// perform calculations: running balance, total deposits, total withdrawls, ending balance
		accountCalculations(transactionType, amount);
		
		// update displays: transactions and summary displays
		updateDisplays(transactionType);	
	}

	
//
//	Input Validation
//

	/*
		Ensure user's date was entered in an acceptable format.
		
		@param element is the form element holding the date data.
		
		@return true if user's date meets acceptable format, else false.
	*/
	function isValidDateFormat(element){
		
		// trim white space
		var date = element.value.trim();
		
		// regular expression pattern: dd/dd/dddd;
		// where first pair: 01-12; second pair: 01-31; third quartet: 1000-3000.
		var regEx = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[-\/.](((1[0-9]|2[0-9])[0-9]{2})|3000)$/;
		
		// test input against regular expression
		if(regEx.test(date)){
		
			return true;
			
		}else{
		
			// if not valid date, ask user for proper date format
			alert("Date was not in mm/dd/yyyy format. \n A separator (.-\/) is required." +
					"\n Be sure to use 2 numbers for month and day.");
					
			// shift webpage focus to failed field
			element.focus();
			
			return false;
		}
	}
	
	/*
		Determine if user's supplied date violates days per month.
		
		@param element is the form element holding the date data.
		
		@return true if days per month is not excessive, else false.
	*/
	function hasProperDaysPerMonth(element){
	
		// months of the year	
		var MONTHS_ARRAY = ["January", "February", "March", "April", "May", "June", "July", "August", 
			"September", "October", "November", "December"];

		// months with default days per month		
		var MONTHS_DAYS = {
			"January" : 31, "February":28, "March": 31, "April": 30, "May" : 31, "June" : 30, "July" : 31,
			"August" : 31, "September" : 30, "October" : 31, "November" : 30, "December" : 31		
		};
		
		// MONTH_ARRAY begins at zero index (months 0-11); user's months are 1-12.
		var MONTH_OFFSET = 1; 
	
		// trim potential white space from user's input
		var date = element.value.trim();
		
		// split mm/dd/yyyy string on "/" and store in array.
		var dateArray = date.split("/");
		
		// radix for parseInt
		var RADIX = 10;
		
		// assign contents of array to variables
		var month = parseInt(dateArray[0], RADIX) - MONTH_OFFSET;	// subtract offset
		var day = parseInt(dateArray[1], RADIX);
		var year = parseInt(dateArray[2], RADIX);
		
		// if leap year increase February to 29 days.		
		if(isLeapYear(year)){
		
			MONTHS_DAYS.February = 29;
			
		}//else do nothing.
		
		// check if user's input days exceed number of days the month should have
		if(day > MONTHS_DAYS[MONTHS_ARRAY[month]]){
		
			// User input has too many days
			alert(MONTHS_ARRAY[month] +" can't have " + day + " days in it, not in " + year + ", anyway.");
			
			// shift webpage focus to failed field
			element.focus();
			
			// failed test
			return false;
			
		}else{
		
			// passed test
			return true;
			
		}		
	}
	
	/*
		Determine if a given year is a leap year.
		
		@param year is the year to be tested.
		
		@return true if is leap year, else false;
	*/
	function isLeapYear(year){
	
		// if year evenly divisible by 4 but not by 100, then leap year; if divisible by 400, is leap year
		return ( (year % 4 === 0) && (year % 100 !== 0) ) || (year % 400 === 0);
	}
	
	/*
		Determine if user's amount is within range of 0.0 to 100,000.
		
		@param element is the amount to be checked.
		
		@return true if value is within range, else false.
	*/
	function isValidAmount(element){
	
		// user's amount
		var amount = element.value;	
		
		// parse amount as float
		amount = parseFloat(amount);
		
		// if amount is number, parse amount
		if(!isNaN(amount) && amount > 0.0 && amount < 100000){
		
			// test passed
			return true;
			
		}else{
		
			// alert user of error
			alert("Amount has to be in range: 0 to 100,000.");
			
			// shift focus to failed webpage field
			element.focus();
			
			// test failed
			return false;
		}
	}
	
	/*
		Obtain the transaction type from the form's select menu.
		
		@param element is the form element under consideration.
		
		@return the value of the user's selected option.
	*/
	function getTransactionType(element){
	
		return element.options[element.selectedIndex].value;		
	}
	
	/*
		Obtain the user's input to form element holding amount of transaction.
		
		@param element is the form element holding user's amount.
		
		@return a float number of the user's amount.
	*/
	function getTransactionAmount(element){
	
		// parse user's input amount as float
		return parseFloat(element.value);
	}
	
//
//	CALCULATIONS RELATED CODE
//
	
	/*
		The accountCalculations function directs which calculation
		related functions to call based on the type of transaction.
		
		@param type is the transactionType of transaction.
		@param amount is the amount of the transaction.
	*/
	function accountCalculations(transactionType, amount){	
	
		// if withdrawal run these functions
		if(transactionType === "withdrawal"){
		
			updateTotalWithdrawals(amount);	

		// if a deposit run these functions
		}else if(transactionType === "deposit"){
		
			updateTotalDeposits(amount);
			
		}else{
		
			console.log("Error: accountCalculations - if conditional");
		}	

		updateEndingBalance(amount);
		updateRunningBalance(amount);
		
	}
	
	/*
		Updates total withdrawls.
		
		@param amount is the amount to increase total withdrawals.
	*/
	function updateTotalWithdrawals(amount){
	
		Account.totalWithdrawals += amount;
	}
	
	/*
		Updates total deposits.
		
		@param amount is the amount to increase total deposits.
	*/
	function updateTotalDeposits(amount){
	
		Account.totalDeposits += amount;
	}
	
	/*
		Updates the running balance.
		
		@param amount is the amount to augment running balance by.
	*/
	function updateRunningBalance(amount){
	
		Account.runningBalance = Account.endingBalance;
	}
	
	/*
		Updates the ending balance.
		
		@param amount is the amount to augment ending balance by.
	*/
	function updateEndingBalance(amount){
	
		// start balance
		var start = Account.startBalance;
		
		// Deposits
		var deposits = Account.totalDeposits;
		
		// Withdraws
		var withdraws = Account.totalWithdrawals;
		
		// Update ending balance
		Account.endingBalance = (start + deposits + withdraws);
	}

//
//	DISPLAY RELATED CODE
//

	/*
		updateDisplays directs the calling of all display-related functions.
		
		@param type is the type of transaction the user selected.
	*/
	function updateDisplays(transactionType){
	
		// update transaction display 
		updateTransactionsDisplay();
		
		// update starting balance display 
		updateStartingBalanceDisplay();		
		
		// update total deposits
		updateTotalDepositsDisplay();	

		// update total withdrawals
		updateTotalWithdrawalsDisplay();
		
		// update ending balance display 
		updateEndingBalanceDisplay();
		
		// clear web form fields
		resetWebForm();
	}
	
	/*
		Updates the transactions display.
	*/
	function updateTransactionsDisplay(){
	
		// date to display --> in Date format
		var date =  Account.transactionsArray[Account.transactionsArray.length -1].date ;
		
		// date to display --> in string format
		date = getDisplayDate(date);
		
		// transaction amount to display
		var amount = Account.transactionsArray[Account.transactionsArray.length -1].amount.toFixed(2);
		
		// running balance to display
		var runBalance = Account.runningBalance.toFixed(2) ;
		
		formatDisplay(date, amount, runBalance);
	}
	
	/*
		Helper function to updateTransactionsDisplay. For fine tuning
		the display to the user.
		
		@param date is the date to display.
		@param amount is the amount to display.
		@param runBalance is the running balance to display.
	*/
	function formatDisplay(date, amount, runBalance){
	
		AMOUNT_LEAD = 5;
		BALANCE_LEAD = 9;
	
		// element to add content to
		var display = document.getElementById('displayTransactions');
		
		// Pad the amount with blank spaces
		var pad = padAmount(AMOUNT_LEAD, amount);
		amount = pad + amount;
		
		// Pad the balance with blank spaces
		pad = padAmount(BALANCE_LEAD, runBalance);
		runBalance = pad + runBalance;
		
		// Header printing		
		var header =    "Date          Amount        Running Balance";
		var underLine = "------------ ------------   ----------------";
		
		// Data printing
		var dataLine = date + "    " +"$" +amount +"   $" +runBalance;
		
		// First time information is being displayed?
		if(display.innerHTML === ""){
		
			display.innerHTML = header +"\n" + underLine + "\n" + dataLine +"\n";
			
		// Subsequent information being displayed
		}else{
		
			display.innerHTML += dataLine + "\n";
		}
	}
	
	/*
		padAmount creates blanks spaces, " ", to add prior to 
		displaying a number. The larger the number, the less
		padding is required. This helps keep output aligned. 
		
		@lead is the default number of spaces that should
		appear before the number. 
		
		@amount is the number that needs padding. 
		
		@return is a string containing a variable number of
		blank spaces.
		
		NOTE: The switch statement below is kind of cool. 
		However, instead of switching on the actual amount of
		the number you could find the length of the 
		number's string, then loop on that length to add
		padding.
	*/
	function padAmount(lead, amount){
	
		var pad = ""; // no padding
		var padamount = lead;
		
		switch(true){
			
		case amount > 99999:
			padamount -= 4;
			break;
			
		case amount > 9999:
			padamount -= 3;
			break;
			
		case amount > 999:
			padamount -= 2;
			break;
			
		case amount > 99:
			padamount -= 1
			break;
			
		case amount > 9:
			break;
			
		case amount > 0:
			padamount += 1;
			break;				
		
		case amount < -99999:
			padamount -= 5;
			break;
			
		case amount < -9999:
			padamount -=4;
			break;
			
		case amount < -999:
			padamount -= 3;
			break;
			
		case amount < -99:
			padamount -= 2;
			break;
			
		case amount < -9:
			padamount -= 1;
			break;
		}
		
		for(var i = 0; i < padamount; i++){
			pad += " ";
		}
		
		return pad;	
	}
	
	/*
		Helper function to updateTransactionDisplay. For obtaining
		the following string format from a Date object:
			mm/dd/yyyy
		
		@param dateObject is a Date object to be converted to a string.
		
		@return a string representation of a Date object in the desired format.
	*/
	function getDisplayDate(dateObject){
	
		// programming months begin at zero
		var MONTH_OFFSET = 1;
		
		// Get date components: month/day/year
		var month = dateObject.getMonth() + MONTH_OFFSET;
		var day = dateObject.getDate();
		var year = dateObject.getFullYear();
		
		// some precautions to keep formatting somewhat aligned. But not robust enough.		
		month = (month < 10) ? ("0" + month) : month;
		day = (day < 10) ? ("0" + day) : day;

		
		// create date display string 
		var date = month +"/" +day +"/" +year;
		
		return date;
	}
	
	/*
		Update starting balance display.
	*/
	function updateStartingBalanceDisplay(){
	
		// display element to update
		var display = document.getElementById('startBalance');
		
		// content for display
		var amount = Account.startBalance.toFixed(2);
		
		// update display
		display.value = amount;
	}
	
	/*
		Update total deposits display.
	*/
	function updateTotalDepositsDisplay(){
	
		// display element to update 
		var display = document.getElementById('totalDeposits');
		
		// content for display 
		var amount = Account.totalDeposits.toFixed(2);

		// update display 
		display.value = amount;
	}
	
	/*
		Update total withdrawals display.
	*/
	function updateTotalWithdrawalsDisplay(){
	
		// display element to update 
		var display = document.getElementById('totalWithdrawals');
		
		// content for display 
		var amount = Account.totalWithdrawals.toFixed(2);
		
		// Change the "-" sign on amount
		amount *= -1;

		// update display 
		display.value = amount;
	}
	
	/*
		Update ending balance display.
	*/
	function updateEndingBalanceDisplay(){
	
		// display element to update 
		var display = document.getElementById('endBalance');
		
		// content for display 
		var amount = Account.endingBalance.toFixed(2);
		
		// update display 
		display.value = amount;	
	}
	
	/*
		Reset text input form elements to blank.
	*/
	function resetWebForm(){
	
		// Could have done this several different ways
		document.forms[0].elements[0].value = "";
		document.forms[0].elements[2].value = "";
		
		// reassign focus to first element 
		document.forms[0].elements[0].focus();
	}