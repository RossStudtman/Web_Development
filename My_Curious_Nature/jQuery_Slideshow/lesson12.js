/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Lesson 11: JQuery
	Shane May
	11/29/2012
*/

	$(document).ready(function(){
	
		/*
			Learning how to obtain a specific Element returned by a jQuery selector (which
			returns a whole collection).
			
			Chose to use the .get(index) method. Reference: http://api.jquery.com/get/#get-index
			
			Certainly could have used $('p:first').
		
		*/
			// Obtain the first <p>
			var elem = $("p").get(0);
			
			// Display the element:
			console.log("The paragraph ELEMENT: \n\t" +elem);
			
			// Turn that <p> int a jQuery object
			var jelem = $(elem);
			
			// Display the jQuery object
			console.log("That paragraph element turned into a jQuery object: \n\t" +jelem);
			
			// Call a jQuery function on the jQuery object
			console.log("Text inside first paragraph: \n\t" +jelem.text());
			
			// Obtain a jQuery object holding all the <p> elements
			var pElem = $("p");
			
			// Display the jQuery object
			console.log("The $(\"p\") jQuery object: \n\t" +pElem);
			
			// Display the text inside the jQuery object
			console.log("The $(\"p\") jQuery object using .text(): \n\t" +pElem.text());
			
			/*
				step 1) get all <p> elements 									--> $('p')
				step 2) get a specific <p> element 								--> .get(0)
				step 3) turn the specific element back into a jQuery object: 	--> $( step 1 code, step 2 code)
				step 4) call the jQuery function .text() on the jQuery object:	--> .text()
			
			*/
			console.log("Content of first <p> using -->$($('p').get(0)).text(): \n\t<--" +  $($('p').get(0)).text()  );
			
			// And the simpler way:
			console.log("Content of first <p> using -->:first<-- \n\t" + $('p:first').text());

			
			
		/* lesson 11-1 code */		
		
		$('input').on('click', function(){		
			
			// grab all <p> elements
			var ourParagraphs = $('p');
			
			// grab current font size of text in paragraph
			var currentFontSize = ourParagraphs.css('fontSize');
			
			// Log currentFontSize
			console.log(currentFontSize); 	// ex: 16px
			
			// not concerned with the "px" because parseFloat stops when it encounters a non-numeric
			var newFontSize = parseFloat(currentFontSize); 
			
			// Obtain the "px" portion of the font size
			var px = currentFontSize.slice(-2); 
			
			// Decision based on "this.id"
			if(this.id == 'large'){
			
				newFontSize *= 1.2;
				
			}else if(this.id == 'small'){
			
				newFontSize /= 1.2;
				
			}else if(this.id == "changeSecondParagraph"){
			
				// Second paragraph as a jQuery object
				var $secondParagraph = $($('p').get(1));
				
				// font size of 2nd paragraph
				var currentFontSize = $($('p').get(1)).css('fontSize');
				
				// Calculate new font size
				var newFontSize = parseFloat(currentFontSize) * 1.2;
				
				// Assign new font size to 2nd paragraph
				$secondParagraph.css('fontSize', newFontSize + px);
				
				// stop this function from finishing
				return;		
				
				/*
					Code smells! This functionality was shoe-horned in after the
					other code was written. The only goal here was a personal
					learning objective. 
				*/
			
			}
			
			// set paragraph text to new font size
			ourParagraphs.css('fontSize', newFontSize + px);		
		});
		
		/* lesson 11-2 code to run at document load */
		setInterval(slideSwitch, 5000);
		
		
		
	});

/* lesson 11-2 code */
			
	/*
		Describe to me in excruciating detail what is going on here. Thanks.
		
		CSS:
		A) The <div> that holds the <img> elements has position set to relative.
			This allows the <img> elements that have a position of absolute to be
			absolutely position within the <div>.
			
			All of the <img> elements share the same positioning.
			Hence, they are on top of each other.
			Changing the <img> z-index will allow the <img> with the largest z-index to 
			sit on top of <img> elements with smaller z-indexes. 
			
		B) <img> elements are given a z-index of 8.
		C) <img> with class="active" have a z-index of 10.
		D) <img> with class="last-active" have a z-index of 9.
		
			The order of these classes in the CSS is important. Later, when we add the
			"last-active" class to an <img> element it will briefly have both "active"
			and "last-active" classes attached to it; if there are conflicting properties
			in these classes then the lower (in the css file) defined property will have
			precidence (some of that "cascading" action at work). 
		
		1) Create a jQuery object from the one <img> element with class="active"
			
				var $active = $('#slideShow IMG.active');
			
		2) Use .next() to search for next sibling element. All of the <img> elements
		   only have other <img> elements as siblings.
		   
		3) If a sibling <img> element is found the .length will be 1.
		
				$active.next().length --> if found: length = 1
				$active.next().length --> if not found: length = 0
				
		4) In javascript zero is a "falsey" value.
		
		5) User a ternary operator to determine which of two values to assign to a new jQuery object.
		
			If .length = 1 --> assign the .next() <image> element.
			If .length = 0 --> assign the first child <img> element within the div where id="slideShow"
			
				var $next = $active.next().length ? $active.next() : $('#slideShow IMG:first');
				
		6) Add the "last-active" class to the first jQuery object.
		
				$active.addClass('last-active');
				
			Now the <img> element in $active has both "active" and "last-active" classes.
			The z-index inside of "last-active" takes precidence --> z-index of 9.
						
			If "last-active" is NOT assigned the images fade into each exactly the same except when moving
			from the last image to the first. When two HTML images occupy the same space and share the same
			z-index the one that is lower in the HTML is shown. When moving from the last image to the 
			first, the first is not revealed until the last image's z-index becomes 8 -- which happens
			when the "active" class is removed from it. So when moving from last --> first the first
			image suddenly appears rather than "fades into" view. 
			
			The solution for making the first appear to "fade into" view when moving from last to
			first is, of course, to make the z-index of the image that needs to "fade into" view be
			higher than the image that is "fading out" of view. 
			
			This is why "last-active" (z-index = 9) class is added to $active immediately prior to $next being
			assigned the "active" class (z-index = 10). 
								
			The description above is born out by what has been seen to occur on the page. However, there's an 
			article describing that even with a higher z-index an element with an opacity < 1.0 will always be 
			shown under the element with a 1.0 opacity. Source:
			
				Source: http://philipwalton.com/articles/what-no-one-told-you-about-z-index/
				
				Possible reason for our differences: my div's are relatively positioned, the article's are not?
					
			
		7) Change the opacity of the $next jQuery object --> opacity = 0.0
		
		8) Add class "active" to the $next JQuery Object --> z-index = 10
		
			But with an opacity of 0.0, the other <img> element with class="activty" is the
			one being seen.
			
		9) Animate the $next jQuery object;
		
			A) Animate the opacity
			B) take 1,000 ms to change opacity from 0.0 to 1.0
			
				As the opacity of this object increases it will appear to be "fading into view"
				and as it does that the other <img> element will appear to be "fading out of view".				
				
			C) when the animation is finished removed class="active" and class="last-active" from the $active jQuery object.
			
				The $active jQuery object now has a z-index of 8 and no classes assigned to it.				
			
		10) When this function runs again it will again look for a <img> element with class="active"
		
			And it will find it --> the jQuery object in the last run of this function, named $next, is now the new
			$active jQuery object.
	
	*/
	
	/* slideSwitch is the function used as an argument to the setInterval() function. */
	function slideSwitch(){
		
		// Find current active image and create jQuery object
		var $active = $('#slideShow IMG.active');
		
		// Create the next jQuery object
		var $next = $active.next().length ? $active.next() : $('#slideShow IMG:first');
		
		// Change z-index of current active image		
		$active.addClass('last-active');
		
		/* 
			To $next: make opacity zero, add z-index = 10, animate opacity --> 1.0, 
			when animation finishes remove classes from $active.		
		*/
		$next.css( 
			{
				opacity: 0.0
			}
		).addClass('active').animate(
			{
				opacity: 1.0
			}, 1000, function(){
				$active.removeClass('active last-active');
				//$active.removeClass('active');
		});	
		

	}		