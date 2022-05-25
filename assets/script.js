var currentDayEL = document.getElementById('currentDay')

const now = dayjs()
currentDayEL.textContent = now.format("MMM DD YYYY")
var nineAM = dayjs().hour(9).minute(0).format("H:mm")
console.log(now.format("H:mm"));
console.log(nineAM);

function createAllTimeBlocks() {
for (var i = 0; i < 8; i++) {
    var timeBlock = $("<div>");
    timeBlock.addClass("time-block mb-1");
    timeBlock.text(nineAM)
    $('#timeBlockContainer').append(timeBlock);
}
}
function init(){
    createAllTimeBlocks();

}
init();