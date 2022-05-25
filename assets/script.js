var currentDayEL = document.getElementById('currentDay')

//date in main title
//full 24 hours for testing
const now = dayjs()
currentDayEL.textContent = now.format("MMM DD YYYY")
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
//Set time for each section
function createAllTimeBlocks() {
    for (var i = 0; i < timeBlockTimes.length; i++) {
        var timeBlock = $("<div>");
        timeBlock.addClass("time-block mb-1");
        timeBlock.attr('id',`timeblock${i}`)
        $('#timeBlockContainer').append(timeBlock);
        document.querySelector(`#timeblock${i}`).textContent = `${timeBlockTimes[i]}`
        updatePastPresentFuture(i);
        
    }
}

//uses iterator variable in createAllTimeBlocks
//clears pastpresentfuture classes
//sets class based on relation to current time
function updatePastPresentFuture(i){
    document.querySelector(`#timeblock${i}`).classList.remove('present')
    document.querySelector(`#timeblock${i}`).classList.remove('future')
    document.querySelector(`#timeblock${i}`).classList.remove('past')
    if(now.$H == `${timeBlockTimes[i]}`){
        document.querySelector(`#timeblock${i}`).classList.add('present')
    }else if(now.$H <= `${timeBlockTimes[i]}`){
        document.querySelector(`#timeblock${i}`).classList.add('future')
    }else{
        document.querySelector(`#timeblock${i}`).classList.add('past')
    }
}
function init(){
    createAllTimeBlocks();

}
init();