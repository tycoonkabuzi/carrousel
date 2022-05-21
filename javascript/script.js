// declaring the needed variables.
const slide=document.getElementsByClassName("header__menuItem");
const nextBtn=document.querySelector(".header__direction--right");
const prevBtn=document.querySelector(".header__direction--left");
const dotsNav=document.querySelector(".header__indicator");
const dots=document.getElementsByClassName("header__indicator-first");
const headerDirection=document.querySelector(".header__direction");
const track=document.querySelector(".header__track");

//creating a function called convertor to convert our so called arrays into real arrays
function convertor(className){
    const arrayElement=[];
    for (let element of className){
        arrayElement.push(element);
        
    }
    return  arrayElement;
}
//--------------------------------------------------------------------------

// aranging slide next to one another 
for (let element in convertor(slide)){
    convertor(slide)[element].style.left= 100*element+"%";
}
function hideBtn(btnSide,secondbtn,targetIndex){
    if (targetIndex===0){
        btnSide.classList.add("hidden");
        secondbtn.classList.remove("hidden");  
    }
    else if (targetIndex===2){
        secondbtn.classList.add("hidden"); 
        btnSide.classList.remove("hidden"); 
    }
    else{
        btnSide.classList.remove("hidden");
        secondbtn.classList.remove("hidden");  
    }
    
 
}
// create a function to help out with the mecanism of moving forward and backward on a slide.
function moveSlide(doc,present ,targetSlide){
    doc.style.transform = 'translateX(-' + targetSlide.style.left +' )'; // move the slide to the amount of distance 
    present.classList.remove('current');// remove the landMark to the current element 
    targetSlide.classList.add('current');// add the element to the next element.
  
}

function updateDots(currentDot,targetDot){
    targetDot.classList.add('header__indicator-first--active');
    currentDot.classList.remove('header__indicator-first--active');
}
// when i click to the next botton we move to the next image
nextBtn.addEventListener("click", function(e){
    
    const currentSlide=track.querySelector(".current");// create a landmark to find out the current slide on
    const nextElement=currentSlide.nextElementSibling;// create the next element
    const currentDot=dotsNav.querySelector(".header__indicator-first--active");
    const nextDot=currentDot.nextElementSibling;
    const nextTargetIndex=convertor(slide).findIndex(slide=> slide===nextElement);
    moveSlide(track, currentSlide,nextElement);
    updateDots(currentDot,nextDot);
    hideBtn(prevBtn,nextBtn,nextTargetIndex);
});
// when i  click to the previous bouton return to the previous slide.
prevBtn.addEventListener("click", function(e){
    const currentSlide=track.querySelector(".current");// create a landmark to find out the current slide on
    const prevElement=currentSlide.previousElementSibling;// create the previous element
    const currentDot=dotsNav.querySelector(".header__indicator-first--active");
    const prevDot=currentDot.previousElementSibling;
    const prevTargetIndex=convertor(slide).findIndex(slide=> slide===prevElement)
    moveSlide(track, currentSlide, prevElement);
    updateDots(currentDot,prevDot);
    hideBtn(prevBtn,nextBtn,prevTargetIndex); 
});
dotsNav.addEventListener('click', function(e){//the parameter e define all the element which could be clicked on on our document.
    const targetDot=e.target.closest('span');// we create a variable which will store our e target specifically. and we show them that we want our landMark to be the class 'header__indicator-first'
    const currentSlide=track.querySelector(".current");
    const currentDot=dotsNav.querySelector(".header__indicator-first--active");
    const targetIndex=convertor(dots).findIndex(dot=> dot===targetDot);
    const targetSlide=slide[targetIndex];
    moveSlide(track,currentSlide,targetSlide);
    updateDots(currentDot,targetDot);
    hideBtn(prevBtn,nextBtn,targetIndex);
});

