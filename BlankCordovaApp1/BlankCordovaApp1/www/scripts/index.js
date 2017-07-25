// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

function getMSQuestions()
{
    var requestURL = "questions.json";
    var request = new XMLHttpRequest();
    var question = document.getElementById("para");
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
                DisplayPage(jsonObj);
            }
            catch (e)
            {
                alert(e);
            }
            
        }
    }

    request.open("GET", requestURL, true);
    request.send();

    function DisplayPage(jsonObject)
    {
        if (jsonObject[0].id = "quiz01")
        {
            var moodSurveyQuest = jsonObject[0];
            var collHeading = document.getElementById("head3").innerHTML;
            var collPara = document.getElementById("para");
            var res = collHeading.replace("Start", moodSurveyQuest["title"]);
            document.getElementById("head3").innerHTML = res;

            for (var i = 0; i < moodSurveyQuest.questions.length; i++)
            {
                var questArray = moodSurveyQuest.questions[i];

                for (var key in questArray)
                {
                    if (key == "text")
                    {
                        var myP = document.createElement("p");
                        myP.setAttribute("class", "questHeading");
                        myP.textContent = questArray[key];
                        question.appendChild(myP);
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
                            default:
                                alert("Not working");
                                break;
                        }
                    }
                }
            }
        } 
                
    }
};

function getEGQuestions()
{
    var requestURL = "questions.json";
    var request = new XMLHttpRequest();
    var question = document.getElementById("para");
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
                DisplayPage(jsonObj);
            }
            catch (e)
            {
                alert(e);
            }

        }
    }

    request.open("GET", requestURL, true);
    request.send();

    function DisplayPage(jsonObject)
    {
        if (jsonObject[1].id = "quiz02")
        {
            var examGradeQuest = jsonObject[1];
            var collHeading = document.getElementById("head3").innerHTML;
            var collPara = document.getElementById("para");
            var res = collHeading.replace("Start", examGradeQuest["title"]);
            document.getElementById("head3").innerHTML = res;


            for (var i = 0; i < examGradeQuest.questions.length; i++)
            {
                var questArray = examGradeQuest.questions[i];

                for (var key in questArray)
                {
                    if (key == "text")
                    {
                        var myP = document.createElement("p");
                        myP.setAttribute("class", "questHeading");
                        myP.textContent = questArray[key];
                        question.appendChild(myP);
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

                            default:
                                alert("Not working");
                                break;
                        }
                    }
                }
            }
        }
    }
};

function DisplayDate(dateObj)
{

    var section = document.getElementById("para");
    var dText = dateObj["text"];
    var today = new Date();
    var myP = document.createElement("p");
    myP.textContent = today.toDateString();
    section.appendChild(myP);
}

function DisplayTextbox()
{
    var section = document.getElementById("para");
    var txtbox = document.createElement("input");
    txtbox.type = "text";
    section.appendChild(txtbox);
    $("#para :text").textinput();
}

function DisplayTextarea()
{
    var section = document.getElementById("para");
    var txtArea = document.createElement("textarea");
    txtArea.rows = "4";
    txtArea.id = "textArea";
    section.appendChild(txtArea);
    $("#para :input").textinput();
}

function DisplayChoice(opts)
{
    var section = document.getElementById("para");
    var selectMenu = document.createElement("select");
    var option = document.createElement("option");
    var optionText = document.createTextNode("Choose...");
    option.setAttribute("value", "");
    option.setAttribute("disabled", "disabled");
    option.setAttribute("selected", "selected");
    option.appendChild(optionText);
    selectMenu.appendChild(option);

    for (var k = 0; k < opts.length; k++)
    {
        var optionDrop = document.createElement("option");
        var optDropText = document.createTextNode(opts[k]);
        optionDrop.setAttribute("value", k);
        optionDrop.appendChild(optDropText);
        selectMenu.appendChild(optionDrop);
    }

    section.appendChild(selectMenu);
    $('select').selectmenu();

}

function DisplayMultipleChoice(opts)
{
    for (var i = 0; i < opts.length; i++)
    {
        var section = document.getElementById("para");
        var checkBox = document.createElement("input");
        var labelCB = document.createTextNode(opts[i])
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("value", [i])
        section.appendChild(checkBox);
        section.appendChild(labelCB);

    }

}

function DisplaySlidingOption(opts)
{
    var section = document.getElementById("para");
    var slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "1");
    slider.setAttribute("max", opts.length);
    slider.setAttribute("value", "1");
    slider.setAttribute("class", "slider-style");
    section.appendChild(slider);


    var div = document.createElement("div");
    div.setAttribute("id", "text-below");
    section.appendChild(div);

    var width = 100 / (opts.length - 1);
    for (var i = 0; i < opts.length; i++)
    {
        var w = width;
        if (i === 0 || i === opts.length - 1)
            w = width / 2;

        var lbl = document.createElement("label");
        lbl.setAttribute("width", w + "%");
        lbl.setAttribute("class", "lbl");
        var txt = document.createTextNode(opts[i]);
        lbl.appendChild(txt);
        div.appendChild(lbl);
    }

}

function DisplayScale(obj)
{
    var section = document.getElementById("para");
    var slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", obj["start"]);
    slider.setAttribute("max", obj["end"]);
    slider.setAttribute("step", obj["increment"])
    slider.setAttribute("value", "1");
    slider.setAttribute("data-highlight", "true");
    slider.setAttribute("class", "slider-style");
    section.appendChild(slider);
}



