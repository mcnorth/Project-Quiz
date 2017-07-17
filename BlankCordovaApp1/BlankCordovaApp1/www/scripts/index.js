// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


function GetQuestions()
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
                
                alert("Your browser broke!");
                return false;
            }

        }
    }

    request.onreadystatechange = function () {

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
        var collHeading = document.getElementById("head3").innerHTML;
        var collPara = document.getElementById("para");
        var res = collHeading.replace("Start", jsonObject["title"]);
        document.getElementById("head3").innerHTML = res;
        

        for (var i = 0; i < jsonObject.questions.length; i++)
        {
            var questArray = jsonObject.questions[i];

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
                    switch (type)
                    {
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

                        default:
                            alert("Not working");
                            break;

                    }
                }
            }
        }


    }

    function DisplayDate(dateObj)
    {
        
        var dText = dateObj["text"];
        
        
        var today = new Date();
        var myP = document.createElement("p");
        myP.textContent = today.toDateString();
        question.appendChild(myP);

    }

    function DisplayTextbox()
    {
        
        var txtbox = document.createElement("input");
        txtbox.type = "text";
        question.appendChild(txtbox);
        $("#para :text").textinput();
    }

    function DisplayTextarea()
    {
        var txtArea = document.createElement("textarea");
        txtArea.rows = "4";
        txtArea.id = "textArea";
        question.appendChild(txtArea);
        $("#para :input").textinput();
    }

    function DisplayChoice(opts)
    {
        for (var k = 0; k < opts.length; k++)
        {
            var radioBtn = document.createElement("input");
            radioBtn.setAttribute("type", "radio");
            var lbl = document.createElement("label");
            var txt = document.createTextNode(opts[k]);
            lbl.appendChild(txt);
            question.appendChild(radioBtn);
            question.appendChild(lbl);
            $("input[type='radio']").checkboxradio().checkboxradio("refresh");
        }

    }

    function DisplaySlidingOption(opts)
    {
        var slider = document.createElement("input");

        slider.setAttribute("type", "range");
        slider.setAttribute("min", "1");
        slider.setAttribute("max", opts.length);
        slider.setAttribute("value", "1");
        slider.setAttribute("class", "slider-style");
        question.appendChild(slider);
        

        var div = document.createElement("div");
        div.setAttribute("id", "text-below");
        question.appendChild(div);

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

        var slider = document.createElement("input");
        slider.setAttribute("type", "range");
        slider.setAttribute("min", obj["start"]);
        slider.setAttribute("max", obj["end"]);
        slider.setAttribute("step", obj["increment"])
        slider.setAttribute("value", "1");
        slider.setAttribute("class", "slider-style");
        question.appendChild(slider);
    }

};

