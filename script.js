function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function openNav() {
  document.getElementById("mySidenav").classList.add("sideNavOpen");

  // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
function closeNav() {
  document.getElementById("mySidenav").classList.remove("sideNavOpen");

  //  document.body.style.backgroundColor = "white";
}


var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}

var dishType = "";
if (dishType == "") {
  openTab('', 'allMenu', '', 'allMenuGrid');
}

function openTab(evt, tabName, dishType = "", menuGridId = "") {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" actives", "");
  }
  document.getElementById(tabName).style.display = "block";
  loadAllMenues(dishType, menuGridId);
  if (evt != '') {
    evt.currentTarget.className += " actives";

    event.preventDefault();
  }
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();

// Menu function:

function loadAllMenues(dishType = "", menuGridId = "") {
  const menues = JSON.parse(data);

  console.log(menues);
  var dishMenu = [];

  if (dishType == "")
    dishMenu = menues.filter(x => x.menuType == "regular");

  else {
    dishMenu = menues.filter(x => x.dishType == dishType);
  }
  console.log(dishMenu);
  let menuContent = "";

  for (let menu of dishMenu) {
    menuContent += `
  <div class="tab-column">
  <div class="tab-menu-image">
    <img src= '${menu.images[0]}'>
    </div>
  <div class="tab-menu-text">
    ${menu.name}
    <span>${menu.ingredients}</span>
    <div class="cart-icon">
    <div class="tooltip">
      <i class="fa fa-cart-plus" style="margin-left:0px;" onclick="addToCart('${menu.id}',1)"></i>
      <span class="tooltiptext">Add to Cart</span>
    </div>
    <div class="tooltip">
      <i class="fas fa-pager"></i>
      <span class="tooltiptext">View Details</span>
    </div>
  </div>
  </div>
  <div class="tab-menu-price">
  ${menu.price}  </div>
</div>`;

    let menuGrid = "";

    menuGrid = document.getElementById(menuGridId);
    menuGrid.innerHTML = menuContent;

    console.log(menuContent);

  }
}

//Cart processing

var cart = [];

33
// 1. Get dish from Json with dishId
// 2. Add the dish to the cart
//    2. A. If the dish is already in cart, just increase the quantity
function addToCart(dishId, quantity = 1) {
  const menues = JSON.parse(data);

  let selectedDish = menues.find(x => x.id == dishId);

  console.log("selected Dish:", selectedDish);

  //Is it already in cart
  //then increase the quantity then update the cart
  if (cart.length > 0) {
    let cartSelectedDish = cart.find(x => x.id == dishId);
    if (cartSelectedDish != undefined) {
      quantity = cartSelectedDish.quantity + quantity;
      cart = cart.filter(x => x.id != dishId);
    }
  }
  var cartItem = new CartItem(selectedDish.id, selectedDish.name,
     selectedDish.price, quantity, selectedDish.price * quantity);

  cart.push(cartItem);
  console.log("My Cart", cart);

  saveCartInSession(cart);
}

function saveCartInSession(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
  getCartFromSession();
}

function getCartFromSession() {
  let cartFromSession = JSON.parse(sessionStorage.cart);
  console.log("Cart from session", cartFromSession);
}

class CartItem {
  constructor(id, name, unitPrice, quantity, itemTotal) {
    this.id = id;
    this.name = name;
    this.name = name;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.itemTotal = itemTotal;
  }
}