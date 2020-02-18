
/*****************************
CREATE MODAL OVERLAY/BACKGROUND
 ****************************/

  var overlay = document.createElement('div');
  overlay.style.zIndex = "3";
  overlay.style.backgroundColor = "navy";
  overlay.style.position = "fixed";
  overlay.style.display = "none";
  overlay.style.height = "100%";
  overlay.style.width = "100%";
  overlay.style.opacity = ".4";
  overlay.style.top = "0";
  document.body.appendChild(overlay);

const parentDiv = document.getElementById('gallery');
const url = 'https://randomuser.me/api/?results=12';
let employeeData;
let targetCard;
let i = 0;  

/*****************************
 FETCH API
 ****************************/

fetch(url)
  .then(response => response.json())
  .then(data => data.results.map((employee) => {
    // save data in variable for modal  
    employeeData = data;
    // create cards
    var cardDiv = document.createElement("div");
      cardDiv.classList.add('card');
      cardDiv.innerHTML = 
      `<div class="card-img-container">
          <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
      </div>
  </div>`;

  /*****************************
   LISTENER FOR OPENING MODAL
 ****************************/    
      cardDiv.classList.add(i);  
      cardDiv.addEventListener("click", (e) => {
       // set variable for click at current target (only selects on card- not children)
          targetCard = e.currentTarget;
          // call function to execute click action
          cardListen();
          // show overlay
          overlay.style.display = "";
       }
     
      )  
      parentDiv.appendChild(cardDiv);
      i++;
  }));


/* ***********
CREATE MODAL
*********** */
var modal = document.createElement('div');
modal.setAttribute('id', 'modal-container');
// align modal
modal.style.position = "fixed";
modal.style.top = "100px";
modal.style.left= "50%";
modal.style.width = "500px";
modal.style.marginLeft = "-250px";
modal.style.zIndex = "5";
var body = document.getElementsByTagName('body')[0];
body.style.alignItems = "center";
body.insertAdjacentElement("afterbegin", modal);

// hide modal on loading page
window.onload = function() {
    document.getElementById('modal-container').style.display = "none";
  } 

/*****************************
 CORE FUNCTION OF MODAL LISTENER- INCLUDING NAVIGATE
 ****************************/   
  function cardListen() {
      console.log(targetCard);
      // counter to track if initial click on card or navigating in modal
      var modalCount = 0;
      // for each employee from fetch
      for (var i = 0; i < employeeData.results.length; i++) {
        // if name in clicked card include name of employee from fetch
        if (targetCard.firstElementChild.nextElementSibling.innerHTML.includes(employeeData.results[i].name.first)) {
         // populate modal w employee data from fetch
          modal.innerHTML = 
          `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div id="right" style="font-size:48px; width:30px; position:relative; right:-380px; top:245px;">&#62;</div>
            <div id="left" style="font-size:48px; width:30px; position:relative; left:10px; top:200px;">&#60;</div>
          <div id="modal-info-container">
           
              <img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
              <p class="modal-text">${employeeData.results[i].email}</p>
              <p class="modal-text cap">${employeeData.results[i].location.city}</p>
              <hr>
              <p class="modal-text">${employeeData.results[i].phone}</p>
              <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
              <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} 
          </div>`;
          var modalContent = document.getElementById('modal-info-container');
        } 
      }
      // show modal
      if (document.getElementById('modal-container').style.display == "none") {
       document.getElementById('modal-container').style.display = "block";
       
     }
     // hide modal & overlay on close
        document.getElementById('modal-close-btn').addEventListener("click", (e) => {
          overlay.style.display = "none";
          modalCount == 0;
        if (document.getElementById('modal-container').style.display == "block") {
        document.getElementById('modal-container').style.display = "none";

    }  
  });
  /* *****************
  NAVIGATE MODAL 
  ***************** */

// set variable i for tracking current card
  var i;
// on clicking left
document.getElementById('left').addEventListener("click", (e) => {
  // if first time navigating since opening modal
  if (modalCount == 0) { 
  // get numbered class name
  var currentCard = targetCard.className.slice(5, 7);
  // subtract 1 for class of card before
   i = Number(currentCard) - 1;
   // if none to left, set to class name of last card
   // use i == -1 bc subtracted already above
   if (i == -1) {
     i = 11;
   }
   while (document.getElementsByClassName(i)[0].style.display == "none") {
     i--;
     if (i == -1) {
      i = 11;
    }
     console.log('hidden');
   }
   // populate with content of previous employee (data saved from fetch)
   modalContent.innerHTML = 
   `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
   <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
   <p class="modal-text">${employeeData.results[i].email}</p>
   <p class="modal-text cap">${employeeData.results[i].location.city}</p>
   <hr>
   <p class="modal-text">${employeeData.results[i].phone}</p>
   <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
   <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
   // update to show future arrow clicks are not first one
    modalCount++;
    console.log(i);
  }
  // once you have navigated once already
  else {
        // if none to left, set to class name of last card
       if (i == 0) {
        i = 11;
       } else {
           // ptherwise set i to move to previous employee
        i--;
        console.log(i);
    }
    while (document.getElementsByClassName(i)[0].style.display == "none") {
      i--;
      if (i == -1) {
        i = 11;
      }
      console.log('hidden');
    }
    // populate modal
    modalContent.innerHTML =
    `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
       <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
       <p class="modal-text">${employeeData.results[i].email}</p>
       <p class="modal-text cap">${employeeData.results[i].location.city}</p>
       <hr>
       <p class="modal-text">${employeeData.results[i].phone}</p>
       <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
       <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
      }
 });
 
 document.getElementById('right').addEventListener("click", (e) => {
    // if first time navigating since opening modal
  if (modalCount == 0) { 
      // get numbered class name
    var currentCard = targetCard.className.slice(5, 7);
      // add 1 for class of card after
     i = Number(currentCard) + 1;
     // if no cards after, switch to beginning
     // i = 12 used bc already added 1 above 
     if (i == 12) {
       i = 0;
     }
     while (document.getElementsByClassName(i)[0].style.display == "none") {
      i++;
      if (i == 12) {
        i = 0;
      }
      console.log('hidden');
    }
     // populate html with next card content
     modalContent.innerHTML = 
     `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
     <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
     <p class="modal-text">${employeeData.results[i].email}</p>
     <p class="modal-text cap">${employeeData.results[i].location.city}</p>
     <hr>
     <p class="modal-text">${employeeData.results[i].phone}</p>
     <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
     <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
        // update to show future arrow clicks are not first one
      modalCount++;
    }
      // once you have navigated once already
    else {
      // if no cards after, switch to beginning
      if (i == 11) {
          i = 0;
      } else {
      // otherwise add 1 to move to next card
      i++;
      }
      while (document.getElementsByClassName(i)[0].style.display == "none") {
       i++;
        console.log('hidden');
        if (i == 12) {
          i = 0;
        }
      }
           // populate html with next card content
      modalContent.innerHTML =
      `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
         <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
         <p class="modal-text">${employeeData.results[i].email}</p>
         <p class="modal-text cap">${employeeData.results[i].location.city}</p>
         <hr>
         <p class="modal-text">${employeeData.results[i].phone}</p>
         <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
         <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
        }
   });

  }

  /* **********
  AUTOCOMPLETE SEARCH
  ************** */
 // create element and set type and stles
  var search = document.createElement('input');
  search.style.padding = "10px";
  search.setAttribute("id", "searchBar");
  search.setAttribute("type", "search");
  search.setAttribute("placeholder", "Find an employee..");
  search.style.height = "50px";
  search.style.width = "50%";
  document.getElementsByTagName('h1')[0].insertAdjacentElement("afterend", search);
  const searchBar = document.getElementById("searchBar");
  var items = document.getElementsByClassName('card-name');
  var itemsParent = document.getElementsByClassName('card');
  
  // add listener for keyup
  searchBar.addEventListener('keyup', myFunction);
  
  function myFunction() {
    // set search value to lower case  
    searchBar.value = searchBar.value.toLowerCase();
    // save search as variable
      var mySearch = searchBar.value;
      console.log(mySearch);
    // for each name in cards
      for (var i = 0; i < items.length; i += 1) {
        // save name as variable
        var title = items[i].innerHTML.toLowerCase();
          console.log(title);
          // if name include search
          if (title.includes(mySearch)) {
            // display corresponding card, otherwise hide it
            itemsParent[i].style.display = "";
                } else {
             itemsParent[i].style.display = "none";
            }
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        // if alphabet doesnt include 1st character of name hide the card   
        if (alphabet.includes(title.charAt(0)) == false && mySearch != "") {
                itemsParent[i].style.display = "none";
      }
        
  } 
  };

