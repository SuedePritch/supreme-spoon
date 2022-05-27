var currentDayEL = document.getElementById('currentDay')
var timeBlockContainerEl = document.getElementById('timeBlockContainer')
var modalEventHeadingEl = document.getElementById('new-event-heading')
var modalTitleEl = document.getElementById('newEventTitle')
var modalDescriptionEl = document.getElementById('newEventDescription')
var timeBlockEl;
let eventBlockId;
var saveEventButtonEl = document.getElementById('save-event')
var modalEl = document.getElementById('myModal')
var closeModalButtonEl = document.getElementById('close-event-container')
//date in main title
//full 24 hours for testing
const now = dayjs()
currentDayEL.textContent = now.format("dddd MMM DD YYYY")
timeBlockTimes =[
    dayjs().hour(0).format("H"),
    dayjs().hour(1).format("H"),
    dayjs().hour(2).format("H"),
    dayjs().hour(3).format("H"),
    dayjs().hour(4).format("H"),
    dayjs().hour(5).format("H"),
    dayjs().hour(6).format("H"),
    dayjs().hour(7).format("H"),
    dayjs().hour(8).format("H"),

    dayjs().hour(9).format("H"),
    dayjs().hour(10).format("H"),
    dayjs().hour(11).format("H"),
    dayjs().hour(12).format("H"),
    dayjs().hour(13).format("H"), 
    dayjs().hour(14).format("H"),
    dayjs().hour(15).format("H"),
    dayjs().hour(16).format("H"),
    
    dayjs().hour(17).format("H"),
    dayjs().hour(18).format("H"),
    dayjs().hour(19).format("H"),
    dayjs().hour(20).format("H"),
    dayjs().hour(21).format("H"),
    dayjs().hour(22).format("H"),
    dayjs().hour(23).format("H")
]
//Create all time blocks
//each timeBlock contains two sections
//hourblock shows time
//eventBlock is the text description
//Set time for each section
function createAllTimeBlocks() {
    for (var i = 0; i < timeBlockTimes.length; i++) {
        var timeBlock = $("<ul>");
        var hourBlock = $("<li>");
        var eventBlock = $("<li>");
        var eventBlockTitle = $("<h2>");
        var eventBlockDescription = $("<p>");

        timeBlock.addClass("time-block");
        timeBlock.attr('id',`timeblock${i}`)
        // timeBlock.attr('data-time',`${i}`)

        hourBlock.addClass("hour-block")
        hourBlock.attr('id', `hour-block${i}`)
        
        eventBlock.addClass('event-block')
        eventBlock.attr('id', `event-block${i}`)

        eventBlockTitle.addClass('event-block-title')
        eventBlockTitle.attr('id', `event-block-title${i}`)

        eventBlockDescription.addClass('event-block-description')
        eventBlockDescription.attr('id', `event-block-description${i}`)


        

        $('#timeBlockContainer').append(timeBlock);
        timeBlock.append(hourBlock, eventBlock)
        eventBlock.append(eventBlockTitle, eventBlockDescription); 
        

        document.querySelector(`#hour-block${i}`).textContent = `${timeBlockTimes[i]}:00`
        updatePastPresentFuture(i);
    }
    
}

//uses iterator variable in createAllTimeBlocks
//clears pastpresentfuture classes
//sets class based on relation to current time
//runs on page load
function updatePastPresentFuture(i){
    document.querySelector(`#timeblock${i}`).classList.remove('present','future','past')
    if(now.$H == `${timeBlockTimes[i]}`){
        document.querySelector(`#timeblock${i}`).classList.add('present')
    }else if(now.$H <= `${timeBlockTimes[i]}`){
        document.querySelector(`#timeblock${i}`).classList.add('future')
    }else{
        document.querySelector(`#timeblock${i}`).classList.add('past')
    }
}

//this function is very tough to test manually TODO: automate testing

//this is ran in setInterval on init()
//pulls the number portion of the present time block id
//compares current hour to number in id
//removes present class and adds past
//finds next time block and removes future class and adds present
// function updatePastPresentFutureWhenHourChanges(){
//     var findPresent = document.querySelector('.present')
//     var findFutures = document.querySelectorAll('.future')
//     if(findPresent && findFutures){//Within the workday update
//         var findPresentId = findPresent.id
//         var findPresentTimeBlock = findPresentId.slice(9,11)
//         if(now.$H.toString() !== findPresentTimeBlock){//when present is not in correct timeslot   
//             findPresent.classList.remove('present')
//             findPresent.classList.add('past')
//             findFutures[0].classList.remove('future')
//             findFutures[0].classList.add('present')
//             console.log('updated');
//             }
//     }else if(findPresent && !findFutures){//end of workday update
//         if(now.$H.toString() !== findPresentTimeBlock){//when present is not in correct timeslot
//             findPresent.classList.remove('present')
//             findPresent.classList.add('past')
//             console.log('updated end of day');
//         }
//     }else if(!findPresent && findFutures){//before workday update
//         var findFutureId = findFutures[0].id
//         var findFutureTimeBlock = findFutureId.slice(9,11)
//         if(now.$H.toString() == findFutureTimeBlock){//updates if present is in workday
//             findFutures[0].classList.remove('future')
//             findFutures[0].classList.add('present')
//             console.log('updated begin of day');
//         }
    
//     }else{
//         return
//     }
// }


//displays events from localstorage into specific timeslots
//skips timeslots with no data
function getEventsFromLocalAndUpdate(){
    for(i=0; i < 24; i++){
        let eventFromLocal = JSON.parse(localStorage.getItem(`event-block${i}`))
        if(eventFromLocal){
            let eventFromLocalTitleText = eventFromLocal.title
            let eventFromLocalDescriptionText = eventFromLocal.description
            document.getElementById(`event-block-title${i}`).textContent = eventFromLocalTitleText
            document.getElementById(`event-block-description${i}`).textContent = eventFromLocalDescriptionText
        }
        
        
        
    }
}

//takes in title and description input from modal at saveEventButton
//adds to local storage
//updates display
function createNewEvent(newEventTitleText, newEventDescriptionText){
    localStorage.setItem(`${eventBlockId}`, JSON.stringify({title:`${newEventTitleText}`, description:`${newEventDescriptionText}`}))
    getEventsFromLocalAndUpdate();
}

//open modal by clicking a time slot
//stores which time slot was clicked in eventBlockId
timeBlockContainerEl.addEventListener('click', function(event){
    clearTextFromModal();
    var element = $(event.target)
    var timeBlockId= element[0]
    var eventBlockClass = timeBlockId.querySelector('.event-block')
    eventBlockId = eventBlockClass.id
    loadCurrentEventTextIntoModal();
    modalEl.setAttribute('style', 'display:block')
})
//loads data into modal 'edit'
//helper grabs index number from eventBlock
//takes number from "event-block12" so it can be used as index
function loadCurrentEventTextIntoModal(){
    var loadTextIntoModalHelper = eventBlockId.slice(11,13)
    var modalEventTitleTextEl = document.getElementById(`event-block-title${loadTextIntoModalHelper}`)
    var modalTitleText = modalEventTitleTextEl.innerHTML
    var modalEventDescriptionTextEl = document.getElementById(`event-block-description${loadTextIntoModalHelper}`)
    var modalDescriptionText = modalEventDescriptionTextEl.innerHTML
    
    if(modalTitleText || modalDescriptionText){
        modalEventHeadingEl.textContent = 'Edit Event'
        modalTitleEl.value = modalTitleText
        modalDescriptionEl.removeAttribute('placeholder')
        modalDescriptionEl.textContent = modalDescriptionText;
    }else{
        clearTextFromModal();

    }
}

function clearTextFromModal(){
    modalEventHeadingEl.textContent = 'Add New Event'
    modalDescriptionEl.setAttribute('placeholder', "Description")
    modalTitleEl.setAttribute('placeholder', 'Title')
    modalTitleEl.value = null
    modalDescriptionEl.textContent = ''

}

//on add event button retrieves text content and passes it to createNewEvent()
saveEventButtonEl.addEventListener('click', function(){
    var newEventTitleText = $('#newEventTitle').val()
    var newEventDescriptionText = $('#newEventDescription').val()
    createNewEvent(newEventTitleText, newEventDescriptionText)
    modalEl.setAttribute('style', "display:none")
})

//Close modal with x
closeModalButtonEl.addEventListener('click',  function(){
    modalEl.setAttribute('style', "display:none")
})
//Close modal with "off" click
window.addEventListener('click', function(event){
    if(event.target == modalEl){
        modalEl.setAttribute('style', "display:none")
    }
})

function init(){
    createAllTimeBlocks();
    getEventsFromLocalAndUpdate();
    // setInterval(updatePastPresentFutureWhenHourChanges, 1000)
}

init();
