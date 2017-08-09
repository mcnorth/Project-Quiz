// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

$(document).ready(function ()
{
    GetSplash();

    //GetMain();

    //back button
    $("#front-page").on("click", "#cancel", function ()
    {
        GetMain();
    });

    //mood survey button
    $("#front-page").on("click", "#btnMoodSurvey", function ()
    {
        GetJsonFile($(this).attr('id'));
    });

    //exam grade button
    $("#front-page").on("click", "#btnExamGrade", function ()
    {
        GetJsonFile($(this).attr('id'));
    });


});

//displays the splash
function GetSplash()
{
    var page = $('<div id="splashPage"></div>');
    page.append('<img src="images/kapps.png" /><br />');
    $("#main").html(page);

    var hideSplash = function () {
        $.mobile.changePage(GetMain());
    };
    setTimeout(hideSplash, 4000);
}

//displays the first page
function GetMain()
{  
    var page = $('<div id="frontPage"></div>');
    page.append('<img src="images/front-logo.png" /><br />');
    page.append('<a href="#" data-role="button" class="ui-btn ui-btn-inline ui-corner-all ui-btn-b" id="btnMoodSurvey">Mood Survey</a><br />');
    page.append('<a href="#" data-role="button" class="ui-btn ui-btn-inline ui-corner-all ui-btn-b" id="btnExamGrade">Exam Grade</a>');
    $("#main").html(page);
}

//read the json file with try catch for errors
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



//display the quiz page according to json
function DisplayPage(jsonObject, quizBut)
{
    if (quizBut == "btnMoodSurvey")
    {
        //add header
        var page = $("<div></div>");
        var moodSurveyPage = $("#main").html(page);
        var tb = $('<div data-role="header"><a href="#" id="cancel" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Cancel</a><h1>Mood Survey</h1></div><br>');
        $(moodSurveyPage).append(tb).trigger("create");

        //add quiz questions
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
        var tb = $('<div data-role="header"><a href="#" id="cancel" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Cancel</a><h1>Exam Grade</h1></div><br>');
        $(examGradePage).append(tb).trigger("create");

        var headerCol = $("<div data-role='collapsible' data-theme='b' data-content-theme='a' data-collapsed='false' data-collapsed-icon='' data-expanded-icon='' id='questionSection'><h3 id='head3'>Start</h3><p id='para'></p></div>");
        $(examGradePage).append(headerCol).trigger("create");

        

        if (jsonObject[1].id = "quiz02")
        { 
            var examGrade = jsonObject[1];
            var pageArray = examGrade.questionsPerPage;

            //display questions per page as per json array
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
                    
                    var btnNext = $('<a href="#" data-role="button" class="ui-btn ui-btn-inline ui-corner-all ui-btn-b" id="btnNext">Next</a>')
                    $("#para").append(btnNext).trigger('create');
                    break;
                }

                $("#front-page").on("click", "#btnNext", function ()
                {
                    var page = $("<div></div>");
                    var examGradePage = $("#main").html(page);
                    var tb = $('<div data-role="header"><a href="#" id="cancel" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Cancel</a><h1>Exam Grade</h1></div><br>');
                    $(examGradePage).append(tb).trigger("create");

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

//get teh element types and display headings
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
                case "slidingoption": if (questArray.hasOwnProperty("options") || questArray.hasOwnProperty("optionVisuals") )
                {
                    var optArray = questArray["options"];
                    var visuals = questArray["optionVisuals"]
                    DisplaySlidingOption(optArray, visuals);
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

//display elements for each json object
function DisplayDate(dateObj)
{
    var myP = $("<p></p>");
    var today = new Date();
    $(myP).text(today.toDateString());
    $("#para").append(myP).trigger('create');
    $("#para").append("<hr><br>").trigger('create');
}

function DisplayTextbox()
{
    var txtbox = $("<input type='text' value=''>")
    $("#para").append(txtbox).trigger('create');
    $("#para").append("<br>").trigger('create');
}

function DisplayTextarea()
{
    var txtarea = $("<textarea></textarea>");
    $("#para").append(txtarea).trigger('create');
    $("#para").append("<br>").trigger('create');
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
    $("#para").append("<br>").trigger('create');
}

    function DisplayMultipleChoice(opts) {
        var group = $("<fieldset data-role='controlgroup'></fieldset>");

        for (var i = 0; i < opts.length; i++) {
            var name = opts[i];
            $(group).append('<input type="checkbox" name="' + name + '" id="id' + i + '"><label for="id' + i + '">' + name + '</label>');
        }
        $("#para").append(group).trigger('create');
        $("#para").append("<br>").trigger('create');
    }

    function DisplaySlidingOption(opts, visual)
    {

        //var sliderDiv = $('<div id="mySlider"></div>');
        //$("#para").append(sliderDiv).trigger('create');

        //var div = document.getElementById("mySlider");

        var slider = $('<input type="range" id="mySlider" data-show-value="true" name="slider-12" value="2" min="1" max="' + opts.length + '">');
        $("#para").append(slider).trigger('create');

        

            
        if (visual.length > 0 && visual.length == opts.length)
        {
            var div = $("<div id='vis-below'></div>");
            var width = 100 / (visual.length - 1);
            for (var i = 0; i < visual.length; i++) {
                var w = width;
                if (i === 0 || i === visual.length - 1)
                    w = width / 2;

                $(div).append("<label id='sliderLbl' style='width: " + w + "%'>" + visual[i] + "</label>");
            }

            $("#para").append(div).trigger('create');

            
        }

        var div = $("<div id='text-below'></div>");
        var width = 100 / (opts.length - 1);
        for (var i = 0; i < opts.length; i++) {
            var w = width;
            if (i === 0 || i === opts.length - 1)
                w = width / 2;

            $(div).append("<label id='sliderLbl' style='width: " + w + "%'>" + opts[i] + "</label>");
        }

        $("#para").append(div).trigger('create');
        $("#para").append("<br>").trigger('create');

        

    }

    function DisplayScale(objArray)
    {
        var inputC = $('<input type="range" name="slider" id="scaleSlider" data-show-value="true"  value="0" min="' + objArray["start"] + '" max="' + objArray["end"] + '" step="' + objArray["increment"] + '">');
        $("#para").append(inputC).trigger('create');

        if (objArray.hasOwnProperty("gradientStart") && objArray.hasOwnProperty("gradientEnd"))
        { 
            /************************************************************
            the concept behind this snippet was posted by AJFarkas on https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
            modified to suit my project
            *****************************************************************************************************************************/
            var firstColour = objArray["gradientStart"];
            var lastColour = objArray["gradientEnd"];

            var firstR = parseInt(firstColour.slice(1, 3), 16);
            var firstG = parseInt(firstColour.slice(3, 5), 16);
            var firstB = parseInt(firstColour.slice(5, 7), 16);

            var lastR = parseInt(lastColour.slice(1, 3), 16);
            var lastG = parseInt(lastColour.slice(3, 5), 16);
            var lastB = parseInt(lastColour.slice(5, 7), 16);

            /************************************************************
            CONCEPT ENDS HERE
            ***************************************************************/


            $("#scaleSlider").change(function ()
            {

                /************************************************************
            the concept behind this snippet was posted by ntdb on https://stackoverflow.com/questions/21150713/animate-color-with-jquery-mobile-slider
            modified to suit my project
            *****************************************************************************************************************************/

                //get the value of the scale and make it a percentage of the max value
                scaleVal = $(this).val() / objArray["end"];

                //calculate the values of the scale at what the value is
                valueR = firstR + (lastR - firstR) * scaleVal;
                valueG = firstG + (lastG - firstG) * scaleVal;
                valueB = firstB + (lastB - firstB) * scaleVal;

                //scale background colour
                $(this).next().css("background-color", "rgb(" + valueR + "," + valueG + "," + valueB + ")");

                /************************************************************
            CONCEPT ENDS HERE
            ***************************************************************/

            });
        }
 
    }

   









