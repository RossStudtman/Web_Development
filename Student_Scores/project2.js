/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Project 2: Student Scores
	Shane May
	10/18/2012
*/

/*
	Document Organization:
		Data Structures
		Class Objects
		Class Helper Functions
		Event Listeners
		Event Handlers
		Display-Related Functions
		Reset Display Functions
		Calculation Functions
*/

//
//	Data Structures
//

	/* create array to hold Student objects */
	var studentArray = [];
	
	/* create object array to hold calculated results */
	var calculationsArray = {};

//
//	Class Objects
//

	/* Student Class 
		Instantiates a student object.
		
		@param first is a student's first name.
		@param last is a student's last name.
		@param score is the score given the student. Instantiation aborted if 
		 score is not of the 0.0 to 100.0 range, or if score is not a number.
	*/
	function Student(first, last, score){
	
		// Class scoped variables
		var firstName; 		// = first;
		var lastName; 		// = last;
		var studentScore; 	// = score;
		
		// assign value to private delared variables
		setFirst(first);
		setLast(last);
		setScore(score);
		
		// get private variables
		this.getLast = function(){
			return lastName;
		};
		this.getFirst = function(){
			return firstName;
		};
		this.getScore = function(){
			return studentScore;
		};

		// set private variables    
		function setFirst(first){
			firstName = first;
		};
		function setLast(last){
			lastName = last;
		};
		function setScore(param){
		
			if(isNumber(param) && isInRange(param)){  
			
				studentScore = parseFloat(param);
				
			}else{
			 
				errorScore();		
			}    
		};
	}

//
//	Class Helper Functions
//

	/* 
		Determins if a piece of data is a number.
		
		@param number is the data to be checked.
		
		@return true if is number, else return false.
	*/
	function isNumber(number){
		return (isNaN(number))? false : true;
	}

	/*
		Determine if a number is of the 0.0 to 100.0 range.
		
		@param number is the data to be checked.
		
		@return true if data is of the range 0.0 to 100.0, 
		 else return false.
	*/
	function isInRange(number){
		return (number > 0.0 && number < 100.0) ? true : false;
	}

	/*
		Error report to user: triggered if score data is either
		A) not a number, or B) not in the range of 0.0 to 100.0.
	*/
	function errorScore(){
	
			alert("Score must be a number between 0.0 and 100.0");
			document.getElementById('score').focus();
	}

//
//	Event Listeners
//

	/* attach event handler to window load event */
	window.addEventListener('load', giveFocus, false);
	
	/* attach event handler to "Add Student Score" button */
	document.getElementById("addStudent").addEventListener('click', pushNewStudent, false);

	/* attach event handler to "Clear Student Scores" button */
	document.getElementById("clearStudents").addEventListener('click', clearStudents, false);

	/* attach event handler to "Sort By Last Name" button */
	document.getElementById("sort").addEventListener('click', sortStudentsByLastName, false);

//
//	Event Handlers
//

	/*
		Event handler for window load event that gives focus to the
		first input box.
	*/
	function giveFocus(){
		document.forms[0].elements[0].focus();
	}
	
	/*
		Event handler function for adding new students to the HTML display
		and for consideration in calulations of average, variance, and 
		standard deviation. 
		
		Obtains data from HTML form and instantiates a new Student Object
		with that data, and directly stores that object into an array.
		
		Student array is sent for processing to a display function and a 
		calculations function. The returned result of the calculations function
		is then sent to a display function for display to HTML.
	*/
	function pushNewStudent(){
	
		// obtain values from HTML form
		var firstName = document.getElementById("fName").value;
		var lastName = document.getElementById("lName").value;
		var score = document.getElementById('score').value;
		
		// validate data before sending to Class constructor
		if(isNumber(score) && isInRange(score)){
		
			// construct new object and push onto array
			studentArray.push(new Student(firstName, lastName, score));
			
			// print new student to HTML display
			printStudent(studentArray);
			
			// send array to function for calculations
			var calculatedValuesArray = calculations(studentArray);
			
			// send caculated results to function for displaying
			displayCalculatedValues(calculatedValuesArray);
			
			// clear the form of data
			clearForm();
			
		}else{
		
			// Invalid user input
			errorScore();
		}
	}
	
	/*
		Event handler function for clearing HTML data,
		and the array holding student data.
	*/
	function clearStudents(){
	
		// Clear the input fields
		clearForm();
		
		// Clear displayed student data
		clearStudentScoresDisplay();
		
		// Clear display of calculated values
		clearCalculatedDisplays();
		
		// Clear array holding student objects
		clearStudentArray();
	}

	/*
		Event handler function that sorts students by last name.
		Then clears the HTML display and displays the new data.
		
		@method compareLastNames taks two arguments, each used to represent an
		 object/index to be sorted by .sort().
		 
	*/
	function sortStudentsByLastName(){
	
	// source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort
	// source: http://www.webdotdev.com/nvd/content/view/878/
	// source: http://stackoverflow.com/questions/979256/how-to-sort-an-array-of-javascript-objects
	
		// Use a comparator function as argument to .sort()
		studentArray.sort(compareLastNames);
		
		// Clear display of student data
		clearStudentScoresDisplay();
		
		// Display newly sorted student data
		printStudent(studentArray);

		/*
			This comparator function compares both parameters and returns to its caller a number that
			is either greater than zero, zero, or less than zero (typically: 1 or 0 or -1). These
			numbers inform the calling sort what to do with the comparator objects (parameters) during
			the sort process.
		*/
		function compareLastNames(firstObject, secondObject){
		
			// convert parameters to lowercase
			var firstObjectLN = firstObject.getLast().toLowerCase();
			var secondObjectLN = secondObject.getLast().toLowerCase();
			var firstObjectFN = firstObject.getFirst().toLowerCase();
			var secondObjectFN = secondObject.getFirst().toLowerCase();
			
			// Compare last names
			if(firstObjectLN < secondObjectLN){
			
				return -1;                  // if compare(a,b) < 0, sort a lower than b
				
			}//else do nothing
			
			if(firstObjectLN > secondObjectLN){
			
				return 1;                   // if compare(a,b) > 0, sort b lower than a
				
			}//else do nothing
			
			// If last names are the same, compare first names
			if(firstObjectLN === secondObjectLN){
			
				if(firstObjectFN < secondObjectFN){
				
					return -1;
					
				}//else do nothing
				
				if(firstObjectFN > secondObjectFN){
				
					return 1;
				}
			}
			
			// If first and last names are the same
			return 0;
		}
		

	}

//
//	Display Related Functions
//

	/*
		Print an array to HTML textarea.
		
		@param array is the array to be printed.
	*/
	function printStudent(array){
	
		var length = array.length;
		var element = document.getElementById('studentOutput');
		var displayString = "";	
		
		for(var i = 0; i < length; i++){	
		
			// Iterate over all public members of Student class object
			for(var publicMember in array[i]){
			
				// Only want certain public members of the Student class
				if(isLastName(publicMember)){
				
					displayString += array[i][publicMember]() + ", ";	
					
				}else if(isFirstName(publicMember)){
				
					displayString += array[i][publicMember]() + ": ";
					
				}else{
				
					displayString += array[i][publicMember]() + "\n";
				}
			}	
		}
		element.innerHTML = displayString;
	}

	/*
		Check if object's public member is getFirst.
		
		@param member is the object member to check.
		
		@return true if public member is getFirst, else
		 return false.
	*/
	function isFirstName(member){
	
		return (member === "getFirst")? true : false;
	}
	
	/*
		Check if object's public member is getLast.
		
		@param member is the object member to check.
		
		@return true if public member is getLast, else
		 return false.
	*/
	function isLastName(member){
	
		return (member === "getLast")? true : false;
	}

	/*
		Display caluclated results to HTML.
		
		@param valuesArray is the array of values to print.
	*/
	function displayCalculatedValues(valuesArray){
	
		for(var x in valuesArray){
		
			if(x === "average"){
			
				document.getElementById('average').value = valuesArray[x];
				
			}else if(x === "variance"){
			
				document.getElementById('variance').value = valuesArray[x].toFixed(4);
				
			}else if(x === "standardDeviation"){
			
				document.getElementById('standardDeviation').value = valuesArray[x].toFixed(4);		
				
			}else{
			
				alert("Run, man, just run. This thing's gonna blow!" +
					"\nPS: error with displayCalculatedValues");
			}
			//console.log(valuesArray[x]
		}
	}

//
//	Reset Display Functions
//

	/*
		Clears the firstName, LastName, and Score input displays.
	*/
	function clearForm(){
	
		// obtain form element from the HTML
		var formElement = document.getElementById('nameScoreForm');
		
		// Number of elements obtained
		var length = formElement.length;

		// iterate over the number of elements in the form,
		//	select all element types that are not "button".
		for(var i = 0; i < length; i++){	
		
			if(formElement.elements[i].type != "button"){
			
				// Clear the textbox
				formElement.elements[i].value = "";
			}
		}
	}

	/*
		Clears the textarea holding student information.
	*/
	function clearStudentScoresDisplay(){
	
		document.getElementById('studentOutput').innerHTML = "";
	}

	/*
		Clears the calculated results displays (average score, 
		variance, and standard deviation).
	*/
	function clearCalculatedDisplays(){
	
		document.getElementById('average').value = "";
		document.getElementById('standardDeviation').value = "";
		document.getElementById('variance').value = "";
	}
	
	/*
		Set the length of the array holding student data to zero.
		This should remove reference to the objects and allow them
		to be garbage collected.
	*/
	function clearStudentArray(){
	
		// set array holding student data to length 0, thus abandoning reference to them.
		studentArray.length = 0;
	}

//
//	Calculation Related Functions
//
	/*
		For calculating student average, variance, and standard deviation.
		
		@param array is an array of student objects holding necessary data.
		
		@return an array of calculated answers for average (mean), variance,
		 and standard deviation.
	*/
	function calculations(array){	
	
		// variable assignments call necessary calculation functions.
		var average = getAverage(array);
		var variance = getVariance_sample(array, average);
		var standardDeviation = getStandardDeviation(variance);

		// populate this "object literal aka associative array"
		calculationsArray = {
			"average" : average,
			"variance" : variance,
			"standardDeviation" : standardDeviation
		};
		
		return calculationsArray;
	}

	/*
		Calculate an average (mean).
		
		@param array holds the values for the calculation.
		
		@return a float value number that is the mean.
	*/
	function getAverage(array){
	
		var sum = 0.0;
		var length = array.length;
		
		for(var i = 0; i < length; i++){
		
			sum += array[i].getScore();
			
		}	
		
		// return average to two significant digits.
		return (sum / length).toFixed(2); 	
	}

	/*
		Calculate variance.
		
		@param array holds data to be calculated.
		@param average holds a calculated mean.
		
		@return returns the value calculated from: A), the return of 
		 invoking a function that itself returns the squared difference,
		 and B) dividing "A)" by the parameter array's length minus one 
		 (as this is a sample calculation rather than a full data set).
	*/
	function getVariance_sample(array, average){
	
		var SAMPLE_OFFSET = -1;
		
		var denominator = array.length + SAMPLE_OFFSET;
		
		return getSquaredDifference(array, average) / denominator;
	}

	/*
		A helper function to "getVariance_sample", calculates the square of
		two differences. Formula: (score - mean)^2 ... for each value in
		the collection.
		
		@param array is an array of student objects that hold student scores.
		@param average is a previously calculated average of student scores.
		
		@return the calculated result of squaring the differences.
	*/
	function getSquaredDifference(array, average){
	
		var squaredDifference = 0.0;
		var SQUARE_ROOT = 2;
		
		for(var i = 0; i < array.length; i++){
		
			squaredDifference += Math.pow( (array[i].getScore() - average), SQUARE_ROOT);
			
			//squaredDifference += Math.pow((array[i] - mean), SQUARE_ROOT)
		}
		
		return squaredDifference;
	}

	/*
		Calculate standard deviation given a variance. Formula: variance^(1/2).
		
		@param variance is a previously calculated variance.
		
		@return the calculated result.
	*/
	function getStandardDeviation(variance){
	
		return Math.sqrt(variance);
		
	}


//
// FOR TESTING
//

/*
var student1 = new Student("ross", "studtman", 82.0);
var student2 = new Student("clay", "studtman", 92.0);
var student3 = new Student("one", "alpha", 93.0);
//var student4 = new Student("two", "beta", 95.0);

//studentArray.push(new Student("bingo", "bongo", 50.0));
studentArray.push(student1);
studentArray.push(student2);
studentArray.push(student3);
//studentArray.push(student4);

testPrintArray();
console.log(studentArray);

function testPrintArray(){

	// iterate over the object array
	for(var i = 0; i < studentArray.length; i++){
	
		// iterate over each object in the array. Note, will only show public members.
		console.log("object at index " +i +":");	
		
		for(var x in studentArray[i]){
		
			// var x is a public member in object[i]
			// studentArray[i] references an object (Student object) in studentArray
			// studentArray[i][x] asks for the value inside the object's property. If a f(), simply says "function()"
			// studentArray[i][x]() invokes the property if it is a function

			console.log("\tThis object has public member: " +x +". \n\tThis member is a: " +typeof(studentArray[i][x]) +
				",\n\t...and returns the value: " + studentArray[i][x]());
			
			//console.log("\t" + x +": " + studentArray[i][x]());
		}
	}
}
*/