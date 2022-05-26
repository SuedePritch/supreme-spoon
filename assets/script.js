var currentDayEL = document.getElementById('currentDay')
var timeBlockContainerEl = document.getElementById('timeBlockContainer')
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
    // dayjs().hour(0).format("H"),
    // dayjs().hour(1).format("H"),
    // dayjs().hour(2).format("H"),
    // dayjs().hour(3).format("H"),
    // dayjs().hour(4).format("H"),
    // dayjs().hour(5).format("H"),
    // dayjs().hour(6).format("H"),
    // dayjs().hour(7).format("H"),
    // dayjs().hour(8).format("H"),

    dayjs().hour(9).format("H"),
    dayjs().hour(10).format("H"),
    dayjs().hour(11).format("H"),
    dayjs().hour(12).format("H"),
    dayjs().hour(13).format("H"), 
    dayjs().hour(14).format("H"),
    dayjs().hour(15).format("H"),
    dayjs().hour(16).format("H"),
    
    // dayjs().hour(17).format("H"),
    // dayjs().hour(18).format("H"),
    // dayjs().hour(19).format("H"),
    // dayjs().hour(20).format("H"),
    // dayjs().hour(21).format("H"),
    // dayjs().hour(22).format("H"),
    // dayjs().hour(23).format("H")
]
//Create all time blocks
//each timeBlock contains two sections
//hourblock shows time
//eventBlock is the text description
//Set time for each section
function createAllTimeBlocks() {
    for (var i = 0; i < timeBlockTimes.length; i++) {
        var timeBlock = $("<div>");
        var hourBlock = $("<div>");
        var eventBlock = $("<div>");
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
        eventBlockTitle.text('')
        eventBlockDescription.addClass('event-block-description')
        eventBlockDescription.attr('id', `event-block-description${i}`)
        eventBlockDescription.text('')

        

        $('#timeBlockContainer').append(timeBlock);
        timeBlock.append(hourBlock, eventBlock)
        timeBlock.append(eventBlockTitle, eventBlockDescription); 
        
        

        document.querySelector(`#hour-block${i}`).textContent = `${timeBlockTimes[i]}`
        document.querySelector(`#event-block${i}`).textContent = ''
        updatePastPresentFuture(i);
        
    }
    return timeBlockEl = document.querySelectorAll('.time-block')
}

//uses iterator variable in createAllTimeBlocks
//clears pastpresentfuture classes
//sets class based on relation to current time
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

//create new event by clicking a time slot
timeBlockContainerEl.addEventListener('click', function(event){
    var element = $(event.target)
    var timeBlockId= element[0]
    var eventBlockClass = timeBlockId.querySelector('.event-block')
    eventBlockId = eventBlockClass.id
    console.log(eventBlockId);
    modalEl.setAttribute('style', 'display:block')
})

function createNewEvent(newEventTitleText, newEventDescriptionText){
    localStorage.setItem(`${eventBlockId}`, JSON.stringify({title:`${newEventTitleText}`, description:`${newEventDescriptionText}`}))
    var currentEventBlock = document.querySelector(`#${eventBlockId}`)
    currentEventBlock.textContent = `${newEventTitleText}`
}

function getEventsFromLocalAndUpdate(){
    for(i=0; i < 24; i++){
        let eventFromLocal = JSON.parse(localStorage.getItem(`event-block${i}`))
        console.log(eventFromLocal);
        // let eventFromLocalTitleText = eventFromLocal.title
        // let eventFromLocalDescriptionText = eventFromLocal.description

        // var tempEventTitleEl = document.getElementById(`event-block${i}`)
        // tempEventTitleEl.children('#event-block-title').textContent = eventFromLocalTitleText
        // document.getElementById(`event-block${i}`).textContent = eventFromLocalDescriptionText
        

        
    }
}


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
}

init();
