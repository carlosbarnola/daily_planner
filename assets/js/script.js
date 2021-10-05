var mainEl = document.getElementsByClassName("container");
var currentDay = moment().format("dddd, MMMM Do");
var now = moment().format("H"); 
var textAreaContents = [];

$("#currentDay").text(currentDay);

var auditHours = function() {
    var rows = document.getElementsByClassName("col-10")
    
    for (let row of rows) {
        if (parseInt(now) == parseInt(row.id)) {
            row.classList.remove("bg-success", "bg-secondary")
            row.className += " bg-danger";
        } 
        else if (parseInt(now) < parseInt(row.id)) {
            row.classList.remove("bg-danger", "bg-secondary")
            row.className += " bg-success";
        }
        else {
            row.classList.remove("bg-success", "bg-danger")
            row.className += " bg-secondary"
        }
    } 
};



var createDateTime = function(id) {
    var dateTime = document.createElement("div")
        dateTime.className = "col-1 d-flex justify-content-end align-items-center";

    var dateTimeText = document.createElement("p")
        dateTimeText.className = "text-end m-0";
        dateTimeText.innerHTML = moment(id, 'HH').format('h A');
    

    dateTime.appendChild(dateTimeText);
    return dateTime;
};

var createTextInput = function(now, id) {
    var textInput = document.createElement("div")
        textInput.className = "col-10 p-0 d-flex align-items-center bg-gradient bg-opacity-25"
        textInput.id = id;

    var textInputText = document.createElement("p")
        textInputText.className = "m-0 p-2 w-100 h-100";




    textInput.appendChild(textInputText);
    return textInput;
};

var createSaveDiv = function() {
    var saveDiv = document.createElement("div")
        saveDiv.className = "col-1 d-flex p-0";

    var saveBtn = document.createElement("button")
        saveBtn.className = "btn btn-info bg-gradient w-100 h-100";

    var spanEl = document.createElement("span")
        spanEl.className ='oi oi-lock-locked'

    saveBtn.appendChild(spanEl);    
    saveDiv.appendChild(saveBtn);

    return saveDiv;
};

var createOneHour = function(id, now) {
    var oneHour = document.createElement("div");
        oneHour.className = "row border border-start-0 rounded-end"

    
    oneHour.appendChild(createDateTime(id));
    oneHour.appendChild(createTextInput(now, id));
    oneHour.appendChild(createSaveDiv());

    return oneHour;
};



for (var i = 9; i < 18; i++) {
    mainEl[0].appendChild(createOneHour(i, now));
};


$(".col-10").on("click", "p", function() {
    var text = $(this)
    .text()
    .trim();

    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

$(".col-10").on("blur", "textarea", function() {
    var text = $(this)
    .val()
    .trim();

    var taskP =$("<p>")
    .addClass("m-0 p-3 w-100 h-100")
    .text(text);

    var obj = {
        id: (this.parentElement.id),
        text: taskP[0].innerText
    }

    textAreaContents.push(obj)
    $(this).replaceWith(taskP);
});

$(".btn").on("click", function() {
    var inputTex = textAreaContents


    localStorage.setItem("tasks", JSON.stringify(inputTex));

});


var loadTasks = function() {
    var data = JSON.parse(localStorage.getItem("tasks"));

    if (!data) {
        createOneHour()
    }
    else{
        for (var i = 0; i <data.length; i++) {
            var dataId = data[i].id

            console.log(data[i].text)

            var retrieveP = $("#" + dataId)[0]
            var childrenP = $(retrieveP).children()[0]
            
            $(childrenP).text(data[i].text)

    

            
        }
    }
};

loadTasks()
auditHours();

setInterval(function () {
   
      auditHours();

}, 60000);
