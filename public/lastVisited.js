function getCookie(){  
  if(document.cookie === ""){
    document.getElementById('lastVisit').innerHTML = "You have not visited this page before";
  }
  else{
    document.getElementById('lastVisit').innerHTML = "Last Visit: " + document.cookie;  
  }
  document.cookie = new Date();
}
getCookie();