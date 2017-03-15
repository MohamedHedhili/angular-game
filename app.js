var app = angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function ($scope,$timeout){
	var words = ["rat","cat","bat"] ; 
	$scope.inCorrectLettersChosen =[];
	$scope.correctLettersChosen = [];
	$scope.guesses = 6 ; 
	$scope.displayWord = '';
	$scope.input = {
		letter :''
	}
	var  selectWord='';
	var  selectRandom =  function ()
	{
		var index = Math.round (Math.random()*words.length);
		return  words[index];
	}
	var newGame =  function ()
	{
	$scope.inCorrectLettersChosen =[];
	$scope.correctLettersChosen = [];
	$scope.guesses = 6 ; 
	$scope.displayWord = '';
	selectWord = selectRandom();
			console.log(selectWord);

	var  tempDisplayWord = '';
	for (var i = 0; i < selectWord.length; i++) {
			tempDisplayWord +='*';
		}
		console.log(tempDisplayWord );
		$scope.displayWord = tempDisplayWord;
	}	


	$scope.letterChosen =  function () {
		for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
			if ($scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase())
			{
				$scope.input.letter = "" ; 
				return  ;
			}
		}

		for (var i = 0; i < $scope.inCorrectLettersChosen.length; i++) {
			if ($scope.inCorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase())
			{
				$scope.input.letter = "" ; 
				return  ;
			}

		}
		console.log("working") ;
		var  correct  =  false  ; 
		for (var i = 0; i < selectWord.length; i++) {
			if (selectWord[i].toLowerCase() == $scope.input.letter.toLowerCase())
			{
				$scope.displayWord = $scope.displayWord.slice(0,i) +$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1) ;
				correct =  true  ; 
			}
		}
		if (correct)
		{var objhand = $(".correct-icon");
			objhand.animate({height: '-100px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '200px', opacity: '0.8'}, "fast");
	        objhand.animate({height: '100px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '100px', opacity: '0.8'}, "fast");
			$scope.correctLettersChosen.push($scope.input.letter.toLowerCase()) ;
		}
		else 
		{
				var objhand = $(".incorrect-icon");
			objhand.animate({height: '200px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '-200px', opacity: '0.8'}, "fast");
	        objhand.animate({height: '100px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '100px', opacity: '0.8'}, "fast");

			$scope.guesses -- ; 
		$scope.inCorrectLettersChosen.push($scope.input.letter.toLowerCase()) ;
	     
		}
		$timeout(function() {
				$('.dial').trigger('change');
			},500);
		$scope.input.letter =  "";
		if  ($scope.guesses == 0)
		{
			alert("you  lost  !  :(") ;
				$timeout(function() {
				newGame();
				$timeout(function() {
				$('.dial').trigger('change');
			},500);
			},500);

		}
		if  ($scope.displayWord.indexOf("*")== -1)
			{alert ("success yeah :D !");

          	$timeout(function() {
				newGame();
				$timeout(function() {
				$('.dial').trigger('change');
			},500);
				 
			},500);
	}
	}
	newGame();
}]);