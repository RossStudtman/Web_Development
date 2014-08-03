/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Project 3: Monthly Balance Calculator
		javascript for cookie functionality
	Shane May
	11/08/2012
*/

	
	/*
		Determines if document.cookie has a specific cookie in it.
		
		Note: this function was created to avoid running the code in "getCookie" if the
		name of the cookie was not present in the cookie collection (document.cookie).
		This function is slightly redundant.
		
		See "getCookie" function. 
		
		@param nameOfCookie is the name of the cookie to search for.
		@param cookieCollection is the document.cookie collection.
	*/
	function hasCookie(nameOfCookie, cookieCollection){
	
		return (cookieCollection.indexOf(nameOfCookie +"=") >=0); // -1 === not found = false
	}
		
	/*
		Retrieves a specified cookie value from document.cookie collection.
		
		Note: this could perform the same function as "hasCookie" (by returning null),
		the choice was made to create a "hasCookie" function to avoid running this 
		code if the cookie's name isn't in the collection. See "hasCookie" function.
		
		@param nameOfCookie is the name of the cookie to search for.
		@param cookieCollection is the document.cookie collection.
		
		@return value of cookie, if cookie not present return null.
	*/
	function getCookie(nameOfCookie, cookieCollection){

		// create cookie array 
		var cookieArray = cookieCollection.split("; ");
		
		// variable used in for-loop to hold iterated names of cookies in cookieArray.
		var arrayCookie;
		
		// iterate over cookie array 
		for(var iterator = 0; iterator < cookieArray.length; iterator++){
			
			// assign current name of iterated cookie
			arrayCookie = cookieArray[iterator].substring(0, cookieArray[iterator].indexOf("="));
			
			// do current iterated-cookie name and searched-for cookie match?
			if(arrayCookie === nameOfCookie){
			
				// cookie name is present, return value of 
				return cookieArray[iterator].substring(cookieArray[iterator].lastIndexOf("=") +1);
				
				//return true;	// ...if wanted to only return if cookie name was present.
			}//else do nothing
			
			// reset arrayCookie
			arrayCookie = "";
		}
		
		// nameOfCookie was not found in for-loop
		return null;
	}
	

	
// testing code
/*
var xArray = ["hello=five", "Goodbye=10"];

console.log(
	// get value of "cookie"
    xArray[0].substring(xArray[0].lastIndexOf("=") +1)
);        

console.log(
	// get name of "cookie"
    xArray[0].substring(0, xArray[0].indexOf("="))
);

*/