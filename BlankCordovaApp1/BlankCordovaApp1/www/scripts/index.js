// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

$(document).ready(function ()
{
    GetSplash();

    

    //back button
    $("#front-page").on("click", "#cancel", function ()
    {
        GetMain();
    });

    //play quiz button
    $("#front-page").on("click", "#btnPlay", function () {
        GetMain();
    });

    //back button on main to go back to signup page
    $("#front-page").on("click", "#backToSignUp", function () {
        GetSignUp();
    });

    //sign up button
    $("#front-page").on("click", "#btnSignUp", function () {
        AccountSignUp();
    });

    //back to main from quiz page
    $("#front-page").on("click", "#backToMain", function () {
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
    page.append('<img id="splashImg" src="images/kapps.png" /><br />');
    $("#main").html(page);

    var hideSplash = function () {
        $.mobile.changePage(GetSignUp());
    };
    setTimeout(hideSplash, 4000);
}

//displays the signup/play page
function GetSignUp()
{
    

    var page = $('<div id="signupPage"></div>');
    $("#main").html(page);
    var div = $('<div id="signupPage-content"></div>');
    div.append('<img src="images/new-logo-front.png" /><br /><br />');
    div.append('<a href="#" data-role="button" class="ui-btn ui-corner-all ui-btn-b" id="btnSignUp">Sign Up</a>');
    div.append('<a href="#" data-role="button" data-transition="slide" class="ui-btn ui-corner-all ui-btn-b" id="btnPlay">Play</a>');
    $("#signupPage").html(div);    
}

//displays the sign up page for an account
function AccountSignUp() {
    var page = $('<div id="accountSignUpPage"></div>');
    var signUpPage = $("#main").html(page);
    var signupHead = $('<div data-role="header" data-theme="a"><a href="#" id="backToSignUp" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Back</a><h1>Sign Up</h1></div>');
    $(signUpPage).append(signupHead).trigger("create");

    var div = $('<div id="accountSignUpPage-content"></div>');
    var logo = $('<img src="images/new-logo-front.png" /><br /><br />');
    $(div).append(logo).trigger("create");
    $("#accountSignUpPage").append(div).trigger("create");
    

    var panel = $('<div id="panelGrey"></div>');
    $("#accountSignUpPage-content").append(panel).trigger("create");

    var txtUserName = $("<input type='text' id='userName' value=''placeholder='username'>");
    $("#panelGrey").append(txtUserName).trigger("create");

    var txtPassWord = $("<input type='text' id='passWord' value=''placeholder='password'><br/>");
    $("#panelGrey").append(txtPassWord).trigger("create");

    var hr = $("<hr><br/>");
    $("#panelGrey").append(hr).trigger("create");

    var txtRetype = $("<input type='text' id='retype' value=''placeholder='Retype Password'>");
    $("#panelGrey").append(txtRetype).trigger("create");

    var submit = $('<a href="#" data-role="button" class="ui-btn ui-corner-all ui-btn-b" id="btnSubmit">Submit</a>');
    $("#panelGrey").append(submit).trigger("create");

}

//displays the main page
function GetMain()
{
    var page = $('<div id="frontPage"></div>'); 
    var playPage = $("#main").html(page);
    var headPlay = $('<div data-role="header" data-theme="a"><a href="#" id="backToSignUp" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Back</a><h1>Choose a quiz</h1></div>');
    $(playPage).append(headPlay).trigger("create");

    var div = $('<div id="frontPage-content"></div>');  
    div.append('<img src="images/new-logo-front.png" /><br /><br />');
    div.append('<a href="#" data-role="button" class="ui-btn ui-corner-all ui-btn-b" id="btnMoodSurvey">Mood Survey</a>');
    div.append('<a href="#" data-role="button" class="ui-btn ui-corner-all ui-btn-b" id="btnExamGrade">Exam Grade</a>');
    $("#frontPage").html(div);

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
        var page = $('<div id="quizPage"><div data-role="header" data-theme="a"><a href="#" id="backToMain" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Back</a><h1>Mood Survey</h1></div></div>');
        var quizPage = $("#main").html(page);
        

        var div = $('<div id="quizPage-content"></div>');
        var panel = $('<div id="panelGrey"></div>');
        $(div).append(panel).trigger("create");
        $("#quizPage").append(div).trigger("create");
        


        if (jsonObject[0].id = "quiz01")
        {
            var moodSurvey = jsonObject[0];
            let counter = 1;
            var idCount = 0;
            for (var i = 0; i < moodSurvey.questions.length; i++)
            {
                var questArray = moodSurvey.questions[i];
                if (idCount == 0)
                {
                    GetElements(questArray);
                    idCount++;
                    var btnNextQ = $('<a href="#" data-role="button" class="ui-btn ui-btn-inline ui-corner-all ui-btn-b" id="btnNextQ">Next</a>')
                    $("#panelGrey").append(btnNextQ).trigger('create');
                    
                }
                else
                {
                    break;
                }
                
                

                $("#front-page").on("click", "#btnNextQ", function ()
                {
                    var page = $('<div id="quizPage"><div data-role="header" data-theme="a"><a href="#" id="backToMain" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Back</a><h1>Mood Survey</h1></div></div>');
                    var quizPage = $("#main").html(page);


                    var div = $('<div id="quizPage-content"></div>');
                    var panel = $('<div id="panelGrey"></div>');
                    $(div).append(panel).trigger("create");
                    $("#quizPage").append(div).trigger("create");
                    

                    for (var i = 0; i < moodSurvey.questions.length; i++)
                    {
                        var qtArray = moodSurvey.questions[i];

                        if (qtArray["id"] == idCount + 1 && idCount + 1 == moodSurvey.questions.length)
                        {
                            GetElements(qtArray);
                            idCount++;
                            var btnTotal = $('<a href="#" data-role="button" class="ui-btn ui-btn-inline ui-corner-all ui-btn-b" id="btnTotal">Score</a>')
                            $("#panelGrey").append(btnTotal).trigger('create');
                            break;
                        }
                        else if (qtArray["id"] == idCount + 1)
                        {
                            GetElements(qtArray);
                            idCount++;
                            var btnNextQ = $('<a href="#" data-role="button" class="ui-btn ui-btn-inline ui-corner-all ui-btn-b" id="btnNextQ">Next</a>')
                            $("#panelGrey").append(btnNextQ).trigger('create');
                            break;
                        }
                        else
                        {
                            continue;
                        }
                        
                    }

                });
                   
            }
        }
    }

    if (quizBut == "btnExamGrade")
    {
        var page = $('<div id="quizPage"><div data-role="header" data-theme="a"><a href="#" id="backToMain" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Back</a><h1>Exam Grade</h1></div></div>');
        var quizPage = $("#main").html(page);

        var div = $('<div id="quizPageExam-content"></div>');
        $("#quizPage").append(div).trigger("create");
        var panel = $('<div id="panelGrey"></div>');
        $(div).append(panel).trigger("create");

        
        

        

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
                    $("#panelGrey").append(btnNext).trigger('create');
                    break;
                }

                $("#front-page").on("click", "#btnNext", function ()
                {
                    var page = $('<div id="quizPage"><div data-role="header" data-theme="a"><a href="#" id="backToMain" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Back</a><h1>Exam Grade</h1></div></div>');
                    var quizPage = $("#main").html(page);

                    var div = $('<div id="quizPageExam-content"></div>');
                    $("#quizPage").append(div).trigger("create");
                    var panel = $('<div id="panelGrey"></div>');
                    $(div).append(panel).trigger("create");

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
            $("#panelGrey").append(myP).trigger('create');
        }
        if (key == "type")
        {
            var type = questArray[key];
            switch (type) {
                case "date": DisplayDate(questArray);
                    break;
                case "textbox": var textboxID = questArray["id"];
                    DisplayTextbox(textboxID);
                    break;
                case "textarea": var textareaID = questArray["id"];
                    DisplayTextarea(textareaID);
                    break;
                case "choice": if (questArray.hasOwnProperty("options"))
                {
                    var selectID = questArray["id"];
                    var optArray = questArray["options"];
                    DisplayChoice(optArray, selectID);
                }
                    break;
                case "slidingoption": if (questArray.hasOwnProperty("options") || questArray.hasOwnProperty("optionVisuals") )
                {
                    var optionID = questArray["id"];
                    var optArray = questArray["options"];
                    var visuals = questArray["optionVisuals"]
                    DisplaySlidingOption(optArray, visuals, optionID);
                }
                    break;
                case "scale": var scaleID = questArray["id"];
                    var optArray = questArray;
                    DisplayScale(optArray, scaleID);
                    break;
                case "multiplechoice": if (questArray.hasOwnProperty("options"))
                {
                    var mcID = questArray["id"];
                    var optArray = questArray["options"];
                    DisplayMultipleChoice(optArray, mcID);
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
    $("#panelGrey").append(myP).trigger('create');
    $("#panelGrey").append("<hr><br>").trigger('create');
}

function DisplayTextbox(textboxID)
{
    var txtbox = $("<input type='text' id='textbox"+textboxID+"' value=''>");
    $("#panelGrey").append(txtbox).trigger('create');
    $("#panelGrey").append("<br>").trigger('create');
}

function DisplayTextarea(textareaID)
{
    var txtarea = $("<textarea id='textarea"+textareaID+"'></textarea>");
    $("#panelGrey").append(txtarea).trigger('create');
    $("#panelGrey").append("<br>").trigger('create');
}

function DisplayChoice(opts, selectID)
{
    var selectMenu = document.createElement("select");
    selectMenu.setAttribute('id', 'select'+selectID)

    var panel = document.getElementById("panelGrey");

    for (var i = 0; i < opts.length; i++)
    {
        var optionDrop = document.createElement("option");
        var txtNode = document.createTextNode(opts[i]);
        optionDrop.appendChild(txtNode);
        selectMenu.appendChild(optionDrop);
    }

    panel.appendChild(selectMenu);
    

    //var selectMenu = $("<select name='select-custom-21' id='select-custom-21' data-native-menu='false'><option value='choose-one' data-placeholder='true'>Choose...</option></select>");
    //$("#panelGrey").append(selectMenu).trigger('create');

    //for (var i = 0; i < opts.length; i++)
    //{
    //    var optionDrop = $("<option></option>");
    //    $(optionDrop).text(opts[i]);
    //    $(selectMenu).append(optionDrop);
    //}

    //$("#panelGrey").append(selectMenu).trigger('create');
    //$("#panelGrey").append("<br>").trigger('create');
}

function DisplayMultipleChoice(opts)
{
        var group = $("<fieldset data-role='controlgroup'></fieldset>");

        for (var i = 0; i < opts.length; i++)
        {
            var name = opts[i];
            $(group).append('<input type="checkbox" name="' + name + '" id="id' + i + '"><label for="id' + i + '">' + name + '</label>');
        }
        $("#panelGrey").append(group).trigger('create');
        $("#panelGrey").append("<br>").trigger('create');
}

function DisplaySlidingOption(opts, visual, optionID)
    {

        //var sliderDiv = $('<div id="mySlider"></div>');
        //$("#para").append(sliderDiv).trigger('create');

        //var div = document.getElementById("mySlider");

        var slider = $('<input type="range" id="sliderOptions'+optionID+'"data-show-value="true" name="slider-12" value="2" min="1" max="' + opts.length + '">');
        $("#panelGrey").append(slider).trigger('create');

        

            
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

            $("#panelGrey").append(div).trigger('create');

            
        }

        var div = $("<div id='text-below'></div>");
        var width = 100 / (opts.length - 1);
        for (var i = 0; i < opts.length; i++) {
            var w = width;
            if (i === 0 || i === opts.length - 1)
                w = width / 2;

            $(div).append("<label id='sliderLbl' style='width: " + w + "%'>" + opts[i] + "</label>");
        }

        $("#panelGrey").append(div).trigger('create');
        $("#panelGrey").append("<br>").trigger('create');

        

    }

function DisplayScale(objArray, scaleID)
{
    var inputC = $('<input type="range" class="scale'+scaleID+'"name="slider" id="scaleSlider" data-show-value="true"  value="0" min="' + objArray["start"] + '" max="' + objArray["end"] + '" step="' + objArray["increment"] + '">');
        $("#panelGrey").append(inputC).trigger('create');

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

   









