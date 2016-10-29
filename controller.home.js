app.controller('HomeCtrl', ['$scope', '$location', 'DataService', function ($scope, $location, DataService) {
    var onLoad = checkData();
    
    //Reroutes the user if they haven't logged into the app
    //Loads data from the DataService if they have
    function checkData(){
    	if(DataService.getSpreadsheet() == null)
    		$location.path('/');
    	else{
    		$scope.charaData = DataService.getSpreadsheet();
    		$scope.loadedChar = $scope.charaData[0];
    	}
    };
    
    //Sets the character to display in the information box
    $scope.displayData = function(index){
    	$scope.loadedChar = $scope.charaData[index];
    };
    
    //Checks rate of atk/crit/hit/avo to see if they are greater than 0
    $scope.checkRate = function(index){
    	if($scope.loadedChar == undefined) return false;
    	
    	var rate = parseInt($scope.loadedChar[index]);
    	if(rate >= 0) return true;
    	else return false;
    };
    
    //Checks if a weapon name is a valid type, so that weapon proficiency can be displayed
    $scope.existsWeapon = function(index){
    	if($scope.loadedChar == undefined) return false;
    	
    	var weaponName = $scope.loadedChar[index];
    	if(weaponName == "Sword" || weaponName == "Lance" || weaponName == "Axe"
    		|| weaponName == "Tome" || weaponName == "Knife" || weaponName == "Bow"
    		|| weaponName == "Stone" || weaponName == "Staff")
    		return true;
    	else
    		return false;
    };
    
    //Returns the icon route relevant to the passed weapon type
    $scope.weaponIcon = function(index){    	
    	var weaponName = $scope.loadedChar[index];
    	if(weaponName == "Sword"){ return "IMG/sword_rank.png";}
    	if(weaponName == "Lance"){ return "IMG/lance_rank.png";}
    	if(weaponName == "Axe"){ return "IMG/axe_rank.png"; }
    	if(weaponName == "Tome"){ return "IMG/tome_rank.png"; }
    	if(weaponName == "Knife"){ return "IMG/star_rank.png"; }
    	if(weaponName == "Bow"){ return "IMG/bow_rank.png"; }
    	if(weaponName == "Stone"){ return "IMG/stone_rank.png"; }
    	if(weaponName == "Staff"){ return "IMG/stave_rank.png"; }
    	return "";
    };
    
    //Calculates the percentage of weapon proficicency for a specific weapon,
    //then returns the width of the progress bar in pixels
    $scope.calcWeaponExp = function(index){
    	if($scope.loadedChar == undefined) return 0;
    	
    	var exp = $scope.loadedChar[index];
    	var slash = exp.indexOf("/");
    	var progress = parseInt(exp.substring(0,slash));
    	var total = parseInt(exp.substring(slash+1,exp.length));
    	
    	return (progress/total) * 30;
    };
    
    //Checks to see if the weapon name in the passed slot is null
    $scope.validWeapon = function(index){
    	if($scope.loadedChar == undefined) return false;
    	
    	var weaponName = $scope.loadedChar[index];
    	if(weaponName != "-" && weaponName != "- (-)")
    		return true;
    	else return false;
    };
    
    /* Calculates total buff/debuffs for each stat (str/mag/skl/etc) and
     * returns the appropriate text color.
     * red (#af2b00) <- total<0
     * blue (#42adf4) <- total>0
     * tan (#E5C68D) <- total=0
     */
    $scope.determineStatColor = function(stat){
    	var color = "#E5C68D"; //default tan
    	var debuff;
    	var weaponBuff;
    	var pairUp;
    	
    	if($scope.loadedChar == undefined) return color; //returns tan
    	
    	//Determine appropriate indicies for stat being evaluated (passed string)
    	if(stat == "str"){
    		debuff = 19; weaponBuff = 45; pairUp = 59;
    	}else if(stat == "mag"){
    		debuff = 20; weaponBuff = 46; pairUp = 60;
    	}else if(stat == "skl"){
    		debuff = 21; weaponBuff = 47; pairUp = 61;
    	}else if(stat == "spd"){
    		debuff = 22; weaponBuff = 48; pairUp = 62;
    	}else if(stat == "lck"){
    		debuff = 23; weaponBuff = 49; pairUp = 63;
    	}else if(stat == "def"){
    		debuff = 24; weaponBuff = 50; pairUp = 64;
    	}else if(stat == "res"){
    		debuff = 25; weaponBuff = 51; pairUp = 65;
    	}else{ return color; } //if string passed is invalid, return tan
    	
    	if($scope.loadedChar[debuff] == "") debuff = 0;
    	else debuff = parseInt($scope.loadedChar[debuff]);
    	
    	weaponBuff = parseInt($scope.loadedChar[weaponBuff]);
    	
    	if($scope.loadedChar[pairUp] == "") pairUp = 0;
    	else pairUp = parseInt($scope.loadedChar[pairUp]);
    	
    	var totalBuffs = debuff + weaponBuff + pairUp;
    	if(totalBuffs > 0)
    		color = "#42adf4"; //blue buff
    	else if(totalBuffs < 0)
    		color = "#af2b00"; //red debuff
    	return color;
    };
    
    //Checks if there is a value in the index
    $scope.validDebuff = function(index){
    	if($scope.loadedChar == undefined) return false;
    	
    	if($scope.loadedChar[index] == "") return false;
    	else return true;
    };
    
    //Checks if the value in the index is != 0
    $scope.validWeaponBuff = function(index){
    	if($scope.loadedChar == undefined) return false;
    	
    	var value = parseInt($scope.loadedChar[index]);
    	if(value == 0) return false;
    	else return true;
    };
    
    //Checks if the loaded character is a) paired with someone
    //and b) if the stat has a buff that is != 0
    $scope.validPairUpBuff = function(index){
    	if($scope.loadedChar == undefined) return false;
    	if($scope.loadedChar[index] == "") return false;
    	
    	var value = parseInt($scope.loadedChar[index]);
    	if(value == 0) return false;
    	else return true;
    };
    
    //For displaying skill gems, checks to see if the character's
    //level >= lvlCap (passed in, value at which character obtains skill)
    $scope.checkLvl = function(lvlCap){
    	if($scope.loadedChar == undefined) return false;
    	
    	var lvl = parseInt($scope.loadedChar[2]);
    	if(lvl >= lvlCap) return true;
    	else return false;
    };
}]);