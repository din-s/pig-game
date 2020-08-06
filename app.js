/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let targetScore, scores, activePlayer, roundScore, isPlaying , prevDice;
function init() {
    isPlaying = true
    targetScore=100
    scores = [0, 0]
    activePlayer = 0
    roundScore = 0
    prevDice = 0
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.btn-roll').style.display = 'block'
    document.querySelector('.btn-hold').style.display = 'block'
}

init()


const nextPlayer = () => {
    if (isPlaying) {
        scores[activePlayer] += roundScore
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]
        if (scores[activePlayer] >= targetScore) {
            
            document.getElementById(`name-${activePlayer}`).textContent = "WINNNER!!"
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
            document.querySelector('.dice').style.display = 'none'
            isPlaying = false
            document.querySelector('.btn-roll').style.display = 'none'
            document.querySelector('.btn-hold').style.display = 'none'
        } else {


            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]

            document.getElementById(`current-${activePlayer}`).textContent = roundScore = 0;

            document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active')
            activePlayer = activePlayer === 0 ? 1 : 0

            document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active')

            const picture = document.querySelector('.dice')
            picture.style.display = 'none'

        }
    }

}


document.querySelector('.btn-roll').addEventListener('click', () => {
    if (isPlaying) {
        dice = Math.floor(Math.random() * 6) + 1
        const picture = document.querySelector('.dice')
        picture.style.display = 'block'
        picture.src = `dice-${dice}.png`

        if (dice !== 1) {
            if (dice === 6 && dice === prevDice ){
                scores[activePlayer] =0
                roundScore=0
                nextPlayer()
            }else{
                document.getElementById(`current-${activePlayer}`).textContent = roundScore += dice
            }
        } else {
            nextPlayer()
        }
        prevDice = dice
    }
    console.log('clicked', dice)
})

document.querySelector('.btn-hold').addEventListener('click', nextPlayer)

document.querySelector('.btn-new').addEventListener('click', init)

document.getElementById('setTarget').addEventListener('click',(e)=>{
    e.preventDefault()
    const userInput = document.getElementById('target')
    console.log('input ', userInput)
    targetScore=userInput.value
    document.getElementById('message').textContent=`Player Who reaches ${targetScore} first Wins the game !`
    userInput.value =''
})
document.getElementById('message').textContent=`Player Who reaches ${targetScore} first Wins the game !`
