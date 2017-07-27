// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

$(document).ready(function () {

    
    

    $("#main").on("click", "#btnMoodSurvey", GetMSQuestions);
    $("#main").on("click", "#btnExamGrade", GetEGQuestions);

    

});


function GetMSQuestions() {
    var requestURL = "questions.json";
    var request = new XMLHttpRequest();
    var quiz = document.getElementById("quiz");
    var quizContent = document.getElementById("MSmain");
    try {
        // Opera 8.0+, Firefox, Chrome, Safari
        request = new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer Browsers
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");

        }
        catch (e) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {

                alert(e);
                return false;
            }

        }
    }

    request.onreadystatechange = function () {

        if (request.readyState == 4) {
            try {
                // Javascript function JSON.parse to parse JSON data
                var jsonObj = JSON.parse(request.responseText);

                // jsonObj variable now contains the data structure 
                DisplayPage(jsonObj);
            }
            catch (e) {
                alert(e);
            }

        }
    }

    request.open("GET", requestURL, true);
    request.send();

    function DisplayPage(jsonObject) {
        var header = $("<div data-role='collapsible' data-theme='b' data-content-theme='a' data-collapsed='false' data-collapsed-icon='' data-expanded-icon='' id='questionSection'><h3 id='head3'>Start</h3><p id='para'></p></div>");

        $(quizContent).append(header).trigger('create');


        if (jsonObject[0].id = "quiz01") {
            var moodSurvey = jsonObject[0];

            for (var i = 0; i < moodSurvey.questions.length; i++) {
                var questArray = moodSurvey.questions[i];
                //var question = $("#para");

                for (var key in questArray) {
                    if (key == "text") {
                        var myP = $("<p class='questHeading'></p>");
                        $(myP).text(questArray[key]);
                        $("#para").append(myP).trigger('create');
                    }

                    if (key == "type") {
                        var type = questArray[key];
                        switch (type) {
                            case "date": DisplayDate(questArray);
                                break;
                            case "textbox": DisplayTextbox();
                                break;
                            case "textarea": DisplayTextarea();
                                break;
                            case "choice": if (questArray.hasOwnProperty("options")) {
                                var optArray = questArray["options"];
                                DisplayChoice(optArray);
                            }
                                break;
                            case "slidingoption": if (questArray.hasOwnProperty("options")) {
                                var optArray = questArray["options"];
                                DisplaySlidingOption(optArray);
                            }
                                break;
                            case "scale": var optArray = questArray;
                                DisplayScale(optArray);
                                break;
                            case "multiplechoice": if (questArray.hasOwnProperty("options")) {
                                var optArray = questArray["options"];
                                DisplayMultipleChoice(optArray);
                            }
                                break;
                            default:
                                alert("Not working");
                                break;
                        }
                    }
                }
            }
        }

    }

}

function GetEGQuestions() {
    var requestURL = "questions.json";
    var request = new XMLHttpRequest();
    var quiz = document.getElementById("quiz");
    var quizContent = document.getElementById("EGmain");
    try {
        // Opera 8.0+, Firefox, Chrome, Safari
        request = new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer Browsers
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");

        }
        catch (e) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {

                alert(e);
                return false;
            }

        }
    }

    request.onreadystatechange = function () {

        if (request.readyState == 4) {
            try {
                // Javascript function JSON.parse to parse JSON data
                var jsonObj = JSON.parse(request.responseText);

                // jsonObj variable now contains the data structure 
                DisplayPage(jsonObj);
            }
            catch (e) {
                alert(e);
            }

        }
    }

    request.open("GET", requestURL, true);
    request.send();

    function DisplayPage(jsonObject) {
        var header = $("<div data-role='collapsible' data-theme='b' data-content-theme='a' data-collapsed='false' data-collapsed-icon='' data-expanded-icon='' id='questionSection'><h3 id='head3'>Start</h3><p id='para'></p></div>");

        $(quizContent).append(header).trigger('create');


        if (jsonObject[1].id = "quiz02") {
            var examGrade = jsonObject[1];

            for (var i = 0; i < examGrade.questions.length; i++) {
                var questArray = examGrade.questions[i];
                //var question = $("#para");

                for (var key in questArray) {
                    if (key == "text") {
                        var myP = $("<p class='questHeading'></p>");
                        $(myP).text(questArray[key]);
                        $("#para").append(myP).trigger('create');
                    }

                    if (key == "type") {
                        var type = questArray[key];
                        switch (type) {
                            case "date": DisplayDate(questArray);
                                break;
                            case "textbox": DisplayTextbox();
                                break;
                            case "textarea": DisplayTextarea();
                                break;
                            case "choice": if (questArray.hasOwnProperty("options")) {
                                var optArray = questArray["options"];
                                DisplayChoice(optArray);
                            }
                                break;
                            case "slidingoption": if (questArray.hasOwnProperty("options")) {
                                var optArray = questArray["options"];
                                DisplaySlidingOption(optArray);
                            }
                                break;
                            case "scale": var optArray = questArray;
                                DisplayScale(optArray);
                                break;
                            case "multiplechoice": if (questArray.hasOwnProperty("options")) {
                                var optArray = questArray["options"];
                                DisplayMultipleChoice(optArray);
                            }
                                break;
                            default:
                                alert("Not working");
                                break;
                        }
                    }
                }
            }
        }

    }

}

function DisplayDate(dateObj) {
    var myP = $("<p></p>");
    var today = new Date();
    $(myP).text(today.toDateString());
    $("#para").append(myP).trigger('create');
}

function DisplayTextbox() {
    var txtbox = $("<input type='text' value=''>")
    $("#para").append(txtbox).trigger('create');
}

function DisplayTextarea() {
    var txtarea = $("<textarea></textarea>");
    $("#para").append(txtarea).trigger('create');
}

function DisplayChoice(opts) {
    var selectMenu = $("<select name='select-custom-21' id='select-custom-21' data-native-menu='false'><option value='choose-one' data-placeholder='true'>Choose...</option></select>");

    for (var i = 0; i < opts.length; i++) {
        var optionDrop = $("<option></option>");
        $(optionDrop).text(opts[i]);
        $(selectMenu).append(optionDrop);
    }

    $("#para").append(selectMenu).trigger('create');
}

function DisplayMultipleChoice(opts) {
    var group = $("<fieldset data-role='controlgroup'></fieldset>");
    //$("#para").html('<fieldset data-role="controlgroup"></fieldset>');

    for (var i = 0; i < opts.length; i++) {
        var name = opts[i];
        $(group).append('<input type="checkbox" name="' + name + '" id="id' + i + '"><label for="id' + i + '">' + name + '</label>');
    }
    $("#para").append(group).trigger('create');
}

function DisplaySlidingOption(opts) {
    var slider = $('<input type="range" data-highlight="true" name="slider-12" value="2" min="1" max="' + opts.length + '">')
    $("#para").append(slider).trigger('create');

    var div = $("<div id='text-below'></div>");

    var width = 100 / (opts.length - 1);

    for (var i = 0; i < opts.length; i++) {
        var w = width;
        if (i === 0 || i === opts.length - 1)
            w = width / 2;

        $(div).append("<label id='sliderLbl' style='width: " + w + "%'>" + opts[i] + "</label>");
    }

    $("#para").append(div).trigger('create');

}

function DisplayScale(objArray) {
    var scale = $('<input type="range" class="ui-slider-track" data-show-value="true" name="slider-12" value="1" min="' + objArray["start"] + '" max="' + objArray["end"] + '" step="' + objArray["increment"] + '">').css({ "background-color": "yellow !important" });
    $("#para").append(scale).trigger('create');

}



