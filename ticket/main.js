const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll(".seat:not(.reserved)")

getFromLocalStorage();


container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){//e.targeta tıklanınca screen ve rowu da gösteriyordu bu şekilde filtreledik
        e.target.classList.toggle('selected')
        calculate();
    }
})

select.addEventListener('change', (e) =>{
    calculate();

})

const calculate = () => {
    const selectedSeat = container.querySelectorAll('.seat.selected');

    const selectedSeatArr =[];
    const seatsArr =[];

    selectedSeat.forEach(function(seat){
        selectedSeatArr.push(seat);
    })

    seats.forEach(function(seat){
        seatsArr.push(seat);
    })

    //seelcted olanların index numaralrını dizi içine atar.
    let selectedSeatindexs = selectedSeatArr.map(function(seat){
        return seatsArr.indexOf(seat);
    })

    console.log(selectedSeatindexs)

    let selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount *select.value;

    saveToLocalStorage(selectedSeatindexs);
   
}

function getFromLocalStorage() {
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeat')); 

    if(selectedSeat != null && selectedSeat.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeat.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }


    const selectedMovieindex = localStorage.getItem('selectedMovieindex'); 

    if(selectedMovieindex != null){
        select.selectedIndex = selectedMovieindex;
    }

}


function saveToLocalStorage(indexs){
    localStorage.setItem('selectedSeat', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieindex', select.selectedIndex)
}


