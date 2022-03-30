"use strict";

// スクロールするとサイドバーが強調表示される
//options
const options = {
  root: null,
  rootMargin: "-50% 0px",
  threshold: 0
};
let sections = document.querySelectorAll('main section');
let sectionObserver = new IntersectionObserver(sectionIntersect,options);

sections.forEach(section => {
  sectionObserver.observe(section);
});

function sectionIntersect(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      activate(entry.target);
    }
  });
}

function activate(element) {
  let activatedIndex = document.querySelector('a.active');
  if(activatedIndex !== null){
    activatedIndex.classList.remove('active');
  }

  let newActivateIndex = document.querySelector(`a[href="#${element.id}"]`);
  newActivateIndex.classList.add('active');
}


//worksに行くまでサイドバーを隠す
let works = document.querySelector('#works');
let aside = document.querySelector('aside');
let worksObserver = new IntersectionObserver(worksIntersect,options);

worksObserver.observe(works);

function worksIntersect(entries){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      aside.style.left = '2vh'
    }
  });
}


// ページをロードしたらtopのh1を表示
let topTitle = document.querySelector('#top h1');
let topSubTitle = document.querySelector('.sub-title');

window.onload = () =>{
  topTitle.classList.add('appeared');
  topSubTitle.classList.add('appeared');
}


//スクロールするとappearクラスが現れる
let appears = document.querySelectorAll('.appear');
const appearOptions = {
  root: null,
  rootMargin: "-70% 0px -30% 0px",
  threshold: 0
}

let appearObserver = new IntersectionObserver(appearIntersect,appearOptions);

appears.forEach(appear => {
  appearObserver.observe(appear);
});

function appearIntersect(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('appeared');
    }
  });
};


// スライダーのボタンをクリック
let moveL = document.querySelector('.move-L');
let moveR = document.querySelector('.move-R');
let slideBoxes = document.querySelectorAll('.slide-box');
let slider = document.querySelector('.slider');
let sliderWidth = slideBoxes.length * 46;
let translateX = 0;
let nowSlideIndex = 0;
let slideTitle = document.querySelectorAll('.slide-title');
let slideComment = document.querySelectorAll('.slide-comment');

slider.style.width = `${sliderWidth}vw`;

let sliderFunc = (i) => {
  slideBoxes.forEach(slideBox => {
    slideBox.style.transform = `translate(${translateX}vw, 0)`
  });
  slideBoxes[nowSlideIndex].classList.remove('now_slide-box');
  slideBoxes[nowSlideIndex + i].classList.add('now_slide-box');
  slideBoxes[nowSlideIndex].style.transform = `translate(${translateX}vw, 0)`;
  slideBoxes[nowSlideIndex + i].style.transform = `translate(${translateX}vw, 0) scale(1.1,1.1)`;
  slideTitle[nowSlideIndex].classList.remove('show');
  slideTitle[nowSlideIndex + i].classList.add('show');
  slideComment[nowSlideIndex].classList.remove('show');
  slideComment[nowSlideIndex + i].classList.add('show');
  nowSlideIndex += i;
}

moveL.onclick = () => {
  if(translateX !== 0){
    translateX += 46;
    sliderFunc(-1);
  }
};

moveR.onclick = () => {
  if(translateX !== (slideBoxes.length - 1) * -46){
    translateX -= 46;
    sliderFunc(1);
    }
};


// clickクラスがクリックされるとopacityが0.8に
let clickAll = document.querySelectorAll('.click');

clickAll.forEach(click => {
  click.onmousedown = () => {
    click.classList.add('clicked');
  }
  click.onmouseup = () => {
    click.classList.remove('clicked');
  }
})

// カードを回転
let cardFront = document.querySelector('.front');
let cardBack = document.querySelector('.back');
let cardFaceFront = true;

cardFront.onclick = () => {
  cardFront.style.transition = 'transform 0.3s ease-in 0s';
  cardFront.classList.add('rotate');
  cardBack.style.transition = 'transform 0.3s ease-out 0.3s';
  cardBack.classList.add('rotate');
};

cardBack.onclick = () => {
  cardFront.style.transition = 'transform 0.3s ease-out 0.3s';
  cardFront.classList.remove('rotate');
  cardBack.style.transition = 'transform 0.3s ease-in 0s';
  cardBack.classList.remove('rotate');
};
