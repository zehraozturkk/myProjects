const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');

const calculate = () => {
    let selectedSeatCount = container.querySelectorAll('.seat.selected').length;
    let price = select.value;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount *price
}

container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){//e.targeta tıklanınca screen ve rowu da gösteriyordu bu şekilde filtreledik
        e.target.classList.toggle('selected')
        calculate();
    }
})

select.addEventListener('change', (e) =>{
    calculate();

})