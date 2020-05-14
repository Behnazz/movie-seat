const container = document.querySelector('.container');
const seats = document.querySelectorAll('.rows .seat:not(occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = parseInt(movieSelect.value);

//save selected  movie and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update count and total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.rows .seat.selected');
  //copy of the selected seat into an array(using spread operator to just take the value inside the array)
  //map through that array
  //return a new array of indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = ticketPrice * selectedSeatsCount;
}
// get data from local storage and populate UI

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  //check if anything is in the selected seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex === selectedMovieIndex;
  }
}

//add event listener to movie select
movieSelect.addEventListener('change', e => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//add an event listener to the container
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

//initial counts and total
updateSelectedCount();