// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

$(document).ready(function ()
{

    if ($("#btnMain").hasClass("ui-btn-active"))
    {
        GetMain();
    }

    $("#front-page").on("click", "#btnMoodSurvey", function ()
    {
        GetJsonFile($(this).attr('id'));
    });

    $("#front-page").on("click", "#btnExamGrade", function ()
    {
        GetJsonFile($(this).attr('id'));
    });

    
    $("#front-page").on("click", "#btnMain", GetMain);

});

function GetMain()
{
    
    var page = $('<div id="frontPage"></div>');
    page.append('<img src="images/front-logo.png" />');
    $("#main").html(page);
}

function GetJsonFile(butID)
{
    var quizBtn = butID;
    
    var requestURL = "questions.json";
    var request = new XMLHttpRequest();

    try
    {
        // Opera 8.0+, Firefox, Chrome, Safari
        request = new XMLHttpRequest();
    }
    catch (e)
    {
        // Internet Explorer Browsers
        try
        {
            request = new ActiveXObject("Msxml2.XMLHTTP");

        }
        catch (e)
        {
            try
            {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e)
            {

                alert(e);
                return false;
            }

        }
    }

    request.onreadystatechange = function ()
    {

        if (request.readyState == 4)
        {
            try
            {
                // Javascript function JSON.parse to parse JSON data
                var jsonObj = JSON.parse(request.responseText);

                // jsonObj variable now contains the data structure 
                DisplayPage(jsonObj, quizBtn);
            }
            catch (e)
            {
                alert(e);
            }

        }
    }

    request.open("GET", requestURL, true);
    request.send();
}


function DisplayPage(jsonObject, quizBut)
{
    if (quizBut == "btnMoodSurvey")
    {
        var page = $("<div></div>");
        var moodSurveyPage = $("#main").html(page);
        var header = $('<div data-role="header"><h1>Quiz Title</h1></div><br />');
        $(moodSurveyPage).append(header).trigger("create");

        var headerCol = $("<div data-role='collapsible' data-theme='b' data-content-theme='a' data-collapsed='false' data-collapsed-icon='' data-expanded-icon='' id='questionSection'><h3 id='head3'>Start</h3><p id='para'></p></div>");
        $(moodSurveyPage).append(headerCol).trigger("create");

        if (jsonObject[0].id = "quiz01")
        {
            var moodSurvey = jsonObject[0];
            for (var i = 0; i < moodSurvey.questions.length; i++)
            {
                var questArray = moodSurvey.questions[i];
                GetElements(questArray);   
            }
        }
    }

    if (quizBut == "btnExamGrade")
    {
        var page = $("<div></div>");
        var examGradePage = $("#main").html(page);

        var header = $('<div data-role="header"><h1>Quiz Title</h1></div><br />');
        $(examGradePage).append(header).trigger("create");

        var headerCol = $("<div data-role='collapsible' data-theme='b' data-content-theme='a' data-collapsed='false' data-collapsed-icon='' data-expanded-icon='' id='questionSection'><h3 id='head3'>Start</h3><p id='para'></p></div>");
        $(examGradePage).append(headerCol).trigger("create");

        

        if (jsonObject[1].id = "quiz02")
        { 
            var examGrade = jsonObject[1];
            var pageArray = examGrade.questionsPerPage;
            
            var count = 0;

            for (var i = 0; i < examGrade.questions.length; i++)
            {
                var questArray = examGrade.questions[i];

                if (count < pageArray[0])
                {
                    
                    GetElements(questArray);
                    count++;
                }
                else
                {
                    
                    var btnNext = $('<a href="#" data-role="button" class="ui-btn ui-btn-inline ui-btn-b" id="btnNext">Next</a>')
                    $("#para").append(btnNext).trigger('create');
                    break;
                }

                $("#front-page").on("click", "#btnNext", function ()
                {
                    var page = $("<div></div>");
                    var examGradePage = $("#main").html(page);

                    var header = $('<div data-role="header"><h1>Quiz Title</h1></div><br />');
                    $(examGradePage).append(header).trigger("create");

                    var headerCol = $("<div data-role='collapsible' data-theme='b' data-content-theme='a' data-collapsed='false' data-collapsed-icon='' data-expanded-icon='' id='questionSection'><h3 id='head3'>Start</h3><p id='para'></p></div>");
                    $(examGradePage).append(headerCol).trigger("create");

                    for (var i = 0; i < examGrade.questions.length; i++)
                    {
                        var qArray = examGrade.questions[i];
                        if (qArray["id"] > pageArray[0])
                        {
                            GetElements(qArray);
                        }
                    }

                });

           
                
            }
        }
    }
}

function GetElements(array)
{
    var questArray = array;

    for (var key in questArray)
    {
        if (key == "text")
        {
            var myP = $("<p class='questHeading'></p>");
            $(myP).text(questArray[key]);
            $("#para").append(myP).trigger('create');
        }
        if (key == "type")
        {
            var type = questArray[key];
            switch (type) {
                case "date": DisplayDate(questArray);
                    break;
                case "textbox": DisplayTextbox();
                    break;
                case "textarea": DisplayTextarea();
                    break;
                case "choice": if (questArray.hasOwnProperty("options"))
                {
                    var optArray = questArray["options"];
                    DisplayChoice(optArray);
                }
                    break;
                case "slidingoption": if (questArray.hasOwnProperty("options"))
                {
                    var optArray = questArray["options"];
                    DisplaySlidingOption(optArray);
                }
                    break;
                case "scale": var optArray = questArray;
                    DisplayScale(optArray);
                    break;
                case "multiplechoice": if (questArray.hasOwnProperty("options"))
                {
                    var optArray = questArray["options"];
                    DisplayMultipleChoice(optArray);
                }
                    break;
                default: alert("Not working");
                    break;
            }
        }
    }
}



function DisplayDate(dateObj)
{
    var myP = $("<p></p>");
    var today = new Date();
    $(myP).text(today.toDateString());
    $("#para").append(myP).trigger('create');
}

function DisplayTextbox()
{
    var txtbox = $("<input type='text' value=''>")
    $("#para").append(txtbox).trigger('create');
}

function DisplayTextarea()
{
    var txtarea = $("<textarea></textarea>");
    $("#para").append(txtarea).trigger('create');
}

function DisplayChoice(opts)
{
    var selectMenu = $("<select name='select-custom-21' id='select-custom-21' data-native-menu='false'><option value='choose-one' data-placeholder='true'>Choose...</option></select>");

    for (var i = 0; i < opts.length; i++)
    {
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

    









