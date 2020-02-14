

  // OVERLAY

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
var targetCard;

fetch(url)
  .then(response => response.json())
  .then(data => data.results.map((employee) => {
      employeeData = data;
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
       
    
      parentDiv.appendChild(cardDiv);
  })
  );

  setTimeout(function() {

  
     var cardClass = document.getElementsByClassName('card');
       for (var i = 0; i < cardClass.length; i++) {
         cardClass[i].classList.add(i);
        };

  for (var i = 0; i < cardClass.length; i++) {
    cardClass[i].addEventListener("click", (e) => {
    targetCard = e.currentTarget;
    cardListen();
    overlay.style.display = "";
    }
    )};  
  }, 500);


/* ***********
MODAL
*********** */
var modal = document.createElement('div');
modal.setAttribute('id', 'modal-container');
modal.style.position = "fixed";
modal.style.top = "100px";
modal.style.left= "50%";
modal.style.width = "500px";
modal.style.marginLeft = "-250px";
modal.style.zIndex = "5";
var body = document.getElementsByTagName('body')[0];
body.style.alignItems = "center";
var header = document.getElementsByTagName('header')[0];
body.insertAdjacentElement("afterbegin", modal);

window.onload = function() {
    document.getElementById('modal-container').style.display = "none"
  } 

   
  function cardListen() {
      console.log(targetCard);
      var modalCount = 0;
      for (var i = 0; i < employeeData.results.length; i++) {
       
        if (targetCard.firstElementChild.nextElementSibling.innerHTML.includes(employeeData.results[i].name.first)) {
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

      if (document.getElementById('modal-container').style.display == "none") {
       document.getElementById('modal-container').style.display = "block";
       
     }
  
        document.getElementById('modal-close-btn').addEventListener("click", (e) => {
          overlay.style.display = "none";
        if (document.getElementById('modal-container').style.display == "block") {
        document.getElementById('modal-container').style.display = "none";

    }  
  });
  /* *****************
  NAVIGATE MODAL 
  ***************** */
var i;

document.getElementById('left').addEventListener("click", (e) => {

  if (modalCount == 0) { 
  var currentCard = targetCard.className.charAt(5);
   i = Number(currentCard) - 1;
   if (i == -1) {
     i = 11;
   }
   modalContent.innerHTML = 
   `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
   <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
   <p class="modal-text">${employeeData.results[i].email}</p>
   <p class="modal-text cap">${employeeData.results[i].location.city}</p>
   <hr>
   <p class="modal-text">${employeeData.results[i].phone}</p>
   <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
   <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
   
    modalCount++;
    i--;
  }
  else {
    if (i == -1) {
        i = 11;
    }
    modalContent.innerHTML =
    `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
       <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
       <p class="modal-text">${employeeData.results[i].email}</p>
       <p class="modal-text cap">${employeeData.results[i].location.city}</p>
       <hr>
       <p class="modal-text">${employeeData.results[i].phone}</p>
       <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
       <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
      i--;
      }
 });
 
 document.getElementById('right').addEventListener("click", (e) => {
  
  if (modalCount == 0) { 
    var currentCard = targetCard.className.charAt(5);
     i = Number(currentCard) + 1;
     if (i == 11) {
       i = 0;
     }
     modalContent.innerHTML = 
     `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
     <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
     <p class="modal-text">${employeeData.results[i].email}</p>
     <p class="modal-text cap">${employeeData.results[i].location.city}</p>
     <hr>
     <p class="modal-text">${employeeData.results[i].phone}</p>
     <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
     <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
     
      modalCount++;
      i++;
    }
    else {
      if (i == 11) {
          i = 0;
      }
      modalContent.innerHTML =
      `<img class="modal-img" src="${employeeData.results[i].picture.medium}" alt="profile picture">
         <h3 id="name" class="modal-name cap">${employeeData.results[i].name.first} ${employeeData.results[i].name.last}</h3>
         <p class="modal-text">${employeeData.results[i].email}</p>
         <p class="modal-text cap">${employeeData.results[i].location.city}</p>
         <hr>
         <p class="modal-text">${employeeData.results[i].phone}</p>
         <p class="modal-text">${employeeData.results[i].location.street.number} ${employeeData.results[i].location.street.name}, ${employeeData.results[i].location.city}, ${employeeData.results[i].location.state} ${employeeData.results[i].location.postcode}</p>
         <p class="modal-text">${employeeData.results[i].dob.date.slice(5, 7)}/${employeeData.results[i].dob.date.slice(8,10)}/${employeeData.results[i].dob.date.substr(0,4)} `;
        i++;
        }
   });

  }

  /* **********
  AUTOCOMPLETE SEARCH
  ************** */
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
  
  
  searchBar.addEventListener('keyup', myFunction);
  
  function myFunction() {
      searchBar.value = searchBar.value.toLowerCase();
      var mySearch = searchBar.value;
      console.log(mySearch);
  
      for (var i = 0; i < items.length; i += 1) {
          var title = items[i].innerHTML.toLowerCase();
          console.log(title);
          if (title.includes(mySearch)) {
            itemsParent[i].style.display = "";
                } else {
             itemsParent[i].style.display = "none";
            }
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
          if (alphabet.includes(title.charAt(0)) == false) {
                itemsParent[i].style.display = "none";
      }
        
  } 
  };

