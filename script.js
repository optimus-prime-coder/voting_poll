let img = document.getElementById('img')
let innerContainer = document.querySelector('.innerContainer').classList
let inputQuestionDiv = document.querySelector('.inputQuest').classList
let btn = document.querySelector('.btn')
let ResultDiv = document.querySelector('.Result').classList
let containerDiv = document.querySelector('.container')
let sentQuestion = document.querySelector('.sentMessage')
let questionDiv = document.querySelector('.question')
let choice1Input = document.querySelector('.choice1')
let choice2Input = document.querySelector('.choice2')
let choice3Input = document.querySelector('.choice3')
let choice4Input = document.querySelector('.choice4')
let firstChoice = document.querySelector('.firstChoice')
let SecondChoice = document.querySelector('.secondChoice')
let ThirdChoice = document.querySelector('.thirdChoice')
let fourthChoice = document.querySelector('.FourthChoice')
let addBtn = document.getElementById('more')
let removeThirdPercent = document.querySelector('.Thirdoption')
let removeFourthPercent = document.querySelector('.Fourthoption')
let selectDay = document.querySelector('.selectDay') 
let selectMinutes = document.querySelector('.selectMinutes')
let selectHours = document.querySelector('.selectHours')
let clickID = 1
let timesClicked  = 0
const month = [1,2,3,4,5,6,7,8,9,10,11,12];
const options = document.querySelectorAll('input[type="radio"]')
const analytics = document.querySelectorAll('.analytic')

const disableOptions = () => {
	options.forEach(option => {
		option.disabled = true
	})
}


const convertTime12to24 = time12h => {
    const [time, modifier] = time12h.split(" ");
   
    let [hours, minutes] = time.split(":");
   
    if (hours === "12") {
      hours = "00";
    }
   
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
   
    return `${hours}:${minutes}`;
  };

img.onclick = () => {
    innerContainer.remove('firstDiv')
    innerContainer.add('hidden')
    inputQuestionDiv.remove('hidden')
    inputQuestionDiv.add('inputQuestDiv')
}

const setTimer = () => {
    const CurrMonth = new Date();
    let monthName = month[CurrMonth.getMonth()];
    let getDay = Number(new Date().getDate()) + Number(selectDay.value)
    let getYear = new Date().getFullYear()
    let end = new Date(`${monthName}/${getDay}/${getYear} ${convertTime12to24(`${selectHours.value}:${selectMinutes.value}`)}`);

    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
    let timer;

    function showRemaining() {
        let now = new Date();
        let distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'EXPIRED!';
            disableOptions()
            return;
        }
        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countdown').innerHTML = `${days}days `
        document.getElementById('countdown').innerHTML += `${hours}hrs `
        document.getElementById('countdown').innerHTML += `${minutes}mins `
        // document.getElementById('countdown').innerHTML += `${seconds}secs`
    }

    timer = setInterval(showRemaining, 1000);
}

const domManipulation = () => {
    sentQuestion.innerHTML = questionDiv.value
    
    firstChoice.innerHTML = choice1Input.value
    SecondChoice.innerHTML = choice2Input.value

    if(choice3Input.value == ''){
        ThirdChoice.classList.add('hidden')
        removeThirdPercent.classList.add('hidden')

    }

    else{
    ThirdChoice.innerHTML = choice3Input.value

    }

    if(choice4Input.value == ''){
        fourthChoice.classList.add('hidden')
        removeFourthPercent.classList.add('hidden')

    }

    else{
    fourthChoice.innerHTML = choice4Input.value

    }

    if(questionDiv.value == ''){
       questionDiv.classList.add('Errorbtn')
       setTimeout(() => {
        questionDiv.classList.remove('Errorbtn')
       }, 3000);
        return ;
    }

    
    else if(choice1Input.value == ''){
        choice1Input.classList.add('Errorbtn')
        setTimeout(() => {
            choice1Input.classList.remove('Errorbtn')
        }, 3000);
        return ;
    }

    else if(choice2Input.value == ''){
        choice2Input.classList.add('Errorbtn')
        setTimeout(() => {
            choice2Input.classList.remove('Errorbtn')
        }, 3000);
        return ;
    }

   

    inputQuestionDiv.remove('inputQuest')
    inputQuestionDiv.add('hidden')
    containerDiv.remove('container')
    ResultDiv.remove('hidden')
    ResultDiv.add('Result')
}

votingData = {
	'option-1' : 0,
	'option-2' : 0,
	'option-3' : 0,
	'option-4' : 0
}

const getTotalVotes = () => {
	let totalVotes = 0
	for(i=1; i<=4; i++){
		totalVotes += votingData[`option-${i}`]
	}
	return totalVotes
}

const displayResult = () => {
	var total = 0
	var widths = []
	options.forEach(option => {
		var ID = option.id
		option.parentNode.parentNode.querySelector('.percent').textContent = Math.floor(votingData[ID]/getTotalVotes()*100)+'%'
		option.parentNode.parentNode.querySelector('.bar').style.width = Math.floor(votingData[ID]/getTotalVotes()*100)+'%'
		total += Math.floor(votingData[ID]/getTotalVotes()*1)
		widths.push(Math.floor(votingData[ID]/getTotalVotes()*1))
	})
	options.forEach(option => {
		if(total < 1){
			var min = Math.min(widths[0],widths[1],widths[2],widths[3])
			min+=(1-total)
		}
		option.parentNode.parentNode.querySelector('.analytic').style.display = 'block'
	})
	
}

options.forEach(option => {
	option.addEventListener('click', e => {
		e.preventDefault()
		var option_id = e.target.id
		votingData[option_id] +=1

		var analytic = e.target.parentNode.parentNode.querySelector('.analytic')
		var bar = analytic.querySelector('.bar')
		bar.style.backgroundColor = 'rgb(48, 140, 233)'
		var percent = analytic.querySelector('.percent')
		//  e.target.parentNode.parentNode.querySelector('.tick').style.display = 'inline'
		displayResult()
		disableOptions()
	})
})


addBtn.onclick = () => {
    timesClicked = timesClicked + clickID
    if(timesClicked == 1 ){
        choice3Input.classList.remove('hidden')
    }
     if (timesClicked == 2){
        choice4Input.classList.remove('hidden')
        addBtn.classList.add('hidden')
    }

    if(timesClicked > 2){
        return
    }
    
}


btn.onclick = () => {
    setTimer()
    domManipulation()
}






// Things left to do
// *Timer
// *localStorage
// *responsive