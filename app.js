let rule_btn = document.querySelector('.rules_btn');
let rule_disply = document.querySelector('.rules_container');
let rule_close_btn = document.querySelector('.close_btn');
let choice_buttons = document.querySelectorAll('.choice_btn');
let result_button = document.querySelectorAll('.results_result');
let choice_container = document.querySelector('.game_container');
let result_container = document.querySelector('.result_container');
let outer_container = document.querySelectorAll('.outer_background');
let play_again_btn = document.querySelector('.play_again');
let pcScore = document.querySelector('.pc_score');
let userScore = document.querySelector('.user_score');
let next_button = document.querySelector('#next_btn');
let winner_container= document.querySelector('.winner_container')
let play_again_winner_btn =document.querySelector('.play_again_winner');



if (!localStorage.getItem('pc_count')) {
    localStorage.setItem('pc_count', '0');
}
if (!localStorage.getItem('user_count')) {
    localStorage.setItem('user_count', '0');
}

pcScore.innerHTML= Number(localStorage.pc_count);
userScore.innerHTML= Number(localStorage.user_count);


/*--------------------------------- displaying user score and PC score------------------------------------- */


const CHOICES= [
    {
        name:"paper",
        beats:"rock"
    },
    {
        name:"rock",
        beats:"scissors"
    },
    {
        name:"scissors",
        beats:"paper"
    },

]

/*----------------------------------- rules button fuctionality----------------------------------------------- */

rule_btn.addEventListener('click',()=>{
    rule_disply.classList.add("rule_btn_invisible");
    

});
rule_close_btn.addEventListener('click',()=>{
    rule_disply.classList.remove("rule_btn_invisible");
    

});




/*-----------------disply the uesr choice and pc choice------------------------ */


choice_buttons.forEach(button => {
    button.addEventListener('click' , ()=>
    {
        user_choice= button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name == user_choice);
        choose(choice);
        
    })
})

function choose(choice){
    const pc_choice = pc_choose();
    displayResult([choice,pc_choice]);
    winner(choice,pc_choice);
}

function pc_choose(){
    const Random = Math.floor(Math.random() * CHOICES.length )
    pc_choice = CHOICES[Random]
    return pc_choice;
}

function displayResult(result){
    result_button.forEach((result_button, i)=> {
        result_button.innerHTML = `
        <div class="outer_background  ${result[i].name}_background_color shadow">
            <div class="choice innerShadow">
                <img src="./images/${result[i].name}.png" alt="${result[i].name}">
            </div>  
        </div> `
        
    })

   choice_container.classList.add('hidden');
   result_container.classList.toggle('hidden');
}

/* ------------------------------------------ winner function -------------------------------------*/

function winner(choice,pc_choice){
    if(choice.name == pc_choice.beats){
        document.querySelector('.winner_heading').innerHTML = '<h2 class="result_text">you lost</h2><h3>against PC</h3>';
        localStorage.pc_count = Number(localStorage.pc_count)+1;
        pcScore.innerHTML= Number(localStorage.pc_count);
        result_button[1].classList.add('winner'); 
        result_button[0].classList.remove('winner');
        removeNextButton();
        
        }
    else if (choice.beats == pc_choice.name){
        document.querySelector('.winner_heading').innerHTML = '<h2 class="result_text">you win</h2><h3>against PC</h3>';
        localStorage.user_count = Number(localStorage.pc_count)+1;
        userScore.innerHTML = Number(localStorage.user_count);
        result_button[0].classList.add('winner');
        result_button[1].classList.remove('winner'); 
        addNextButton();
    }
    else
    {
        document.querySelector('.winner_heading').innerHTML='<h2>tie up</h2>'
        play_again_btn.innerText = 'REPLAY'
        result_button[0].classList.remove('winner');
        result_button[1].classList.remove('winner'); 
        removeNextButton();
    }

}

/* ----------------------------------------- Play again button ------------------------------------------------*/

play_again_btn.addEventListener('click' , ()=>{
    
    choice_container.classList.remove('hidden');
    result_container.classList.add('hidden');
    play_again_btn.innerText = 'play again';

})


play_again_winner_btn.addEventListener('click' , ()=>{
    
    document.querySelector('.container').classList.remove('hidden');
    choice_container.classList.remove('hidden');
    result_container.classList.add('hidden');
    winner_container.classList.add('hidden');

})

/*---------------------next button-------------------------------*/

next_button.addEventListener('click', ()=>{
    document.querySelector('.container').classList.add('hidden');
    result_container.classList.add('hidden');
    winner_container.classList.remove('hidden');
    removeNextButton();
})




function removeNextButton(){
    next_button.classList.add('hidden');
    rule_btn.classList.add('next_btn_design');
}
function addNextButton(){
    next_button.classList.remove('hidden');
    rule_btn.classList.remove('next_btn_design');
}