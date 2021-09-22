// UI
const togglebtn = document.getElementById('toggle');
const openbtn = document.getElementById('open');

const modal = document.getElementById('modal');
const closebtn = document.getElementById('close');

// EVENT listener nav

togglebtn.addEventListener('click',()=>{
    // console.log('hay');
    document.body.classList.toggle('shownav');
});

// SHOW MODAL
openbtn.addEventListener('click',()=>{
    modal.classList.add('showmodal');
});

// CLOSE MODAL
closebtn.addEventListener('click',()=>{
    modal.classList.remove('showmodal');
});

// hide modal on outside click
// window.addEventListener('click',(e)=>{
//     // console.log(e.target);
//
//     if(e.target === modal){
//         modal.classList.remove('showmodal');
//     }
// });

window.addEventListener('click',(e)=>e.target === modal ? modal.classList.remove('showmodal'):false);