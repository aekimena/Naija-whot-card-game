const sliderContainer = document.querySelector('.player-cards-slide-container');
const sliderInner = document.querySelector('.player-cards');
const itemWidth = sliderInner.scrollWidth / sliderInner.children.length;
const computerCards = document.querySelector('.computer-cards');

function checkoverflow(element){
    return element.scrollWidth > element.clientWidth;
};

if (checkoverflow(computerCards)){
    document.querySelector('.hide').style.display = 'block';
}
