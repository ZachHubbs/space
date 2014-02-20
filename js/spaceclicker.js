
var total_metal = 0; //increment this by one every click
var manual_clicks = 1; //value of manually clicking the asteroid

var barge_multiplier = 1; // increases based on upgrades
var cps = 0; //the number of total metal per second 
var upgrades = "Upgrades: ";  //purchased upgrades

//Space Miner Variables
var space_miner = 0; //the number of space miners hired
var space_miner_cost = 15; //the cost of hiring a space miner.  Increases exponentially

//Mining Barge Variables
var mining_barge = 0; //the number of mining barges purchased
var mining_barge_cost = 100; //the cost of this should increase exponentially


//update the title counter
function update_title() {
	document.title = 'Space Miner: ' + Math.round(total_metal * 10)/10;
}

//update the total number of metal
function update_total_metal() {
    var e = document.getElementById("metal_resource_bar");
    e.innerHTML = 'Metal: ' + Math.round(total_metal * 10)/10;
}

//update the amount of metal per second
function update_cps()  {
	cps = ((space_miner / 10) + (mining_barge * barge_multiplier));
	var e = document.getElementById("metal_per_second");
	e.innerHTML = 'Metal per second: ' + cps;
	
}

//update the bought upgrades
function update_upgrades() 	{
	var e = document.getElementById("bought_upgrades");
	e.innerHTML = upgrades;
}

//add a click when the asteroid is manually clicked
document.getElementById("asteroid").onclick =    function() {  

	total_metal = total_metal + manual_clicks;
    update_total_metal(); //updates the text
};

//purchases 1 space miner and updates all number fields accordingly while increasing cost of each
//additional miner exponentially
document.getElementById("buy_space_miner").onclick =    function() {  
    if (total_metal < space_miner_cost) {
        return alert('need more metal.');
    }
    space_miner++; 
    total_metal -= space_miner_cost;
	space_miner_cost = Math.round(space_miner_cost * 1.15);
    var e2 = document.getElementById("buy_space_miner");
    e2.innerHTML = 'Hire a space miner for ' + space_miner_cost;
	var e3 = document.getElementById("total_space_miners");
	e3.innerHTML = "Space Miners: " + space_miner;
	
    update_total_metal();
	update_cps();
};

//purchases 1 mining barge and updates all number fields accordingly while increasing cost of each
//additional barge exponentially
document.getElementById("buy_mining_barge").onclick =    function() {  
    if (total_metal < mining_barge_cost) {
        return alert('need more metal.');
    }
    mining_barge++; 
    total_metal -= mining_barge_cost;
    mining_barge_cost = Math.round(mining_barge_cost * 1.15);  
    var e2 = document.getElementById("buy_mining_barge");
    e2.innerHTML = 'Buy a mining barge for ' + mining_barge_cost;
	var e3 = document.getElementById("total_mining_barges");
	e3.innerHTML = "Mining Barges: " + mining_barge;
	
    update_total_metal();
	update_cps();
};

//purchases the click barge_multiplier, disabling the button
document.getElementById("buy_multiplier").onclick =    function() {  
	if (total_metal < 50) {
		return alert('need more metal.');
	}	
		
  // var e = document.getElementById("current_multiplier");
  // e.innerHTML = 'multiplier: ' + barge_multiplier * 2;
   barge_multiplier++;
   document.getElementById("buy_multiplier").disabled = true;
   
   //update_cps();
   total_metal -= 50;
   upgrades += "Titanium Drill Bit";
   update_total_metal();
   update_upgrades();

};

//updates text fields once per second
setInterval(function () {
    total_metal += (((space_miner / 10) + (mining_barge * barge_multiplier))/10);

	update_total_metal();
	update_cps();
    update_title();
	
}, 100); //once per second use the auto clickers
