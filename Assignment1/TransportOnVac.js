function rentalCarCost(d) {
  var rent = 0; 
  if(!isNaN(d))
  {
    if(d >= 7){      
      rent = (d * 40) - 50;
    }
    else if(d >=3){
      rent = (d * 40) - 20;
    }    
    else{
      rent = d * 40;
    }
  }
  return rent;
}