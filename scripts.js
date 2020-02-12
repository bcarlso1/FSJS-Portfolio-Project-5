// to do...
// modal nav
// event target for modal
// modal display



const parentDiv = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const url = 'https://randomuser.me/api/?results=12';
let employeeData;

fetch(url)
  .then(response => response.json())
  .then(data => data.results.map((employee) => {
      employeeData = data;
      // console.log(data);
      var employeeDiv = document.createElement("div");
      employeeDiv.innerHTML = 
      `<div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
      </div>
  </div>`;
       
      employeeDiv.classList.add("employee");
      parentDiv.appendChild(employeeDiv);
      var cardClass = document.getElementsByClassName('card');
        for (var i = 0; i < cardClass.length; i++) {
          cardClass[i].setAttribute("id", `card-${i}`);
        }
  }));



/* ***********
MODAL
*********** */
var modal = document.createElement('div');
modal.setAttribute('id', 'modal-container');
modal.setAttribute('z-index', '2');
modal.setAttribute('position', 'fixed');
modal.setAttribute('width', '100vw');
modal.setAttribute('height', '100vh');
var body = document.getElementsByTagName('body')[0];
var header = document.getElementsByTagName('header')[0];
header.insertAdjacentElement("afterend", modal);

window.onload = function() {
    document.getElementById('modal-container').style.display = "none"
  } 

    //document.querySelector('.card')
parentDiv.addEventListener("click", (e) => {
     console.log(e.target);
      // console.log(employeeData.results[1].location.postcode)
     
      for (var i = 0; i < employeeData.results.length; i++) {
       
        if (e.target.firstElementChild.innerHTML.includes(employeeData.results[i].name.first)) {
          modal.innerHTML = 
          `<div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div id="right">&#62;</div>
            <div id="left">&#60;</div>
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
          // console.log(modalContent)
          modalContent.setAttribute('position', 'absolute');
          modalContent.setAttribute('top', '200px');
          modalContent.setAttribute('z-index', '10');  
        //  event.target.setAttribute('id', 'selection10');
        } 
      }
    
      if (document.getElementById('modal-container').style.display == "none") {
       document.getElementById('modal-container').style.display = "block";
       
     }
  
   document.getElementById('modal-close-btn').addEventListener("click", (e) => {
    if (document.getElementById('modal-container').style.display == "block") {
      document.getElementById('modal-container').style.display = "none";

    }  
  });

  
  /* *****************
  NAVIGATE MODAL 
  ***************** */
  var counter = 10;
   console.log(document.getElementById('left').innerHTML);
 document.getElementById('left').addEventListener("click", (e) => {
    
    document.getElementById('modal-info-container').innerHTML = document.getElementById(`selection${counter}`).previousElementSibling.innerHTML;
    var newSelection = document.getElementById(`selection${counter}`).previousElementSibling;
    counter--;
    newSelection.setAttribute("id", `selection${counter}`); 
  });
  
  document.getElementById('right').addEventListener("click", (e) => {
    document.getElementById('modal-info-container').innerHTML = document.getElementById(`selection${counter}`).nextElementSibling.innerHTML;
    var newSelection = document.getElementById(`selection${counter}`).nextElementSibling;
    counter++;
    newSelection.setAttribute("id", `selection${counter}`); 
  }); 

});
  /* **********
  AUTOCOMPLETE SEARCH
  ************** */
  var search = document.createElement('input');
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
  } 
  ;
  