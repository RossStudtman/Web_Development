/*
	Ross Studtman
	CIS 131 - Web Dev 2
	Lesson 10: Dice
	Shane May
	11/8/2012
*/
	// global constant variable
	var SIDES_OF_DICE = 6;
	
	/* 
		"Class" Die instantiates a Die object. This class does not code for encapsulation,
		that is, members are publicly available.
		
		@param sides is the number of sides of the die.
	*/
	function Die(sides){
		this.sides = sides;
		//this.value; // ...unnecessary.
	}

	/*
		Add public function to Die class that determines value of die.
	*/
	Die.prototype.roll = function(){
		this.value = Math.floor((Math.random() * this.sides) +1);
	}

	/*
		Add public function to Die class that determines return value of die.
		
		Note: this is unnecessary as a direct reference to the public property is possible.
		That is, "myDie.value" will return the die value, making the necessity of this function circumspect.
	*/
	Die.prototype.getValue = function(){
		return this.value;
	}


	/*
		"Class" PairOfDice instantiates a pair of Die objects.
		
		@param sides indicates the number of sides of the dice (each, not collectively).
	*/
	function PairOfDice(sides){
		this.Die1 = new Die(sides);
		this.Die2 = new Die(sides);
	}
	
	/*
		Add public function to PairOfDice that assigns values to the Die objects.
	*/
	PairOfDice.prototype.roll = function(){
		this.Die1.roll();
		this.Die2.roll();
	}
	
	/*
		Add public function to PairOfDice that returns the value of the first die.
	*/
	PairOfDice.prototype.getValue1 = function(){
		return this.Die1.getValue();
		
		// note: because Die1's value is publicly available, this also works:
		// return this.Die1.value;
	}
	
	/*
		Add public function to PairOfDice that returns the value of the second die.
	*/
	PairOfDice.prototype.getValue2 = function(){
		return this.Die2.getValue();
		
		// note: because Die2's value is publicly available, this also works:
		// return this.Die2.value;
	}
	
	/*
		Add public function to PairOfDice that returns the sum of two dice.
	*/
	PairOfDice.prototype.getSum = function(){
		return this.getValue1() + this.getValue2();
	}

	// add event listener to Button
	document.getElementById('rollDice').addEventListener('click', rollDice, false);
	
	/*
		Event handler for button instantiates a PairOfDice object (which itself 
		instantiates two Die objects), assigns values to the dice; displays 
		results of die values to user; and if special dice rolls are achieved
		give user appropriate message.
	*/
	function rollDice(){
	
		// clear any previous message
		document.getElementById('results').innerHTML = "";
		
		// invoke PairOfDice using global constant variable for number of sides.
		var theDice = new PairOfDice(SIDES_OF_DICE);	// creates two Die objects.
		
		// assign values to Die objects
		theDice.roll();
		
		document.getElementById('die1Value').innerHTML = theDice.Die1.value;
		document.getElementById('die2Value').innerHTML = theDice.Die2.value;
		
		var sum = theDice.getSum();
		
		// messages to user for special dice rolls
		if(sum === 7){
		
			document.getElementById('results').innerHTML = "Craps!";
			
		}else if( sum === 2){
					
			document.getElementById('results').innerHTML = "Snake Eyes!";
				
		}else if( sum === 12){
			
			document.getElementById('results').innerHTML = "Box Cars!";
				
		}// else do nothing.	
	}



















