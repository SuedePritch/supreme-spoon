var currentDayEL = document.getElementById('currentDay')

const now = dayjs()
currentDayEL.textContent = now.format("MMM DD YYYY")
timeBlockTimes =[
    dayjs().hour(9).minute(0).format("H:mm"),
    dayjs().hour(10).minute(0).format("H:mm"),
    dayjs().hour(11).minute(0).format("H:mm"),
    dayjs().hour(12).minute(0).format("H:mm"),
    dayjs().hour(13).minute(0).format("H:mm"),
    dayjs().hour(14).minute(0).format("H:mm"),
    dayjs().hour(15).minute(0).format("H:mm"),
    dayjs().hour(16).minute(0).format("H:mm")
]
ta
function createAllTimeBlocks() {
for (var i = 0; i < 8; i++) {
    var timeBlock = $("<div>");
    timeBlock.addClass("time-block mb-1");
    timeBlock.attr('id',`timeblock${i}`)
    $('#timeBlockContainer').append(timeBlock);
    document.querySelector(`#timeblock${i}`).textContent = `${timeBlockTimes[i]}`
}
}
function init(){
    createAllTimeBlocks();

}
init();