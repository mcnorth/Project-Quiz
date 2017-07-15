// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


function GetQuestions()
{
    var question = document.getElementById("questions");

    //create javascript object
    var requestURL = "questions.json";

    //create HttpRequest object
    var request = new XMLHttpRequest();

    //open the request object
    request.open("GET", requestURL);

    //let the server know we want a json object
    request.responseType = "json";

    //send the request
    request.send();

    request.onload = function ()
    {
        //store the response from the server ina variable
        var quizQuestions = request.response;

        //call a function to fill the page
        DisplayPage(quizQuestions);
    }

    function DisplayPage(jsonObject)
    {
        

        //create the elements
        var myHeading = document.createElement("p");
        myHeading.id = "myHeading";

        //modify the text to the value of the json object "id"
        myHeading.textContent = jsonObject["title"];


        //insert the content inside the div
        question.appendChild(myHeading);

        for (var i = 0; i < jsonObject.questions.length; i++)
        {
            var questArray = jsonObject.questions[i];

            for (var key in questArray)
            {
                if (key == "text")
                {
                    var myP = document.createElement("p");
                    myP.textContent = questArray[key];
                    question.appendChild(myP);
                }

                if (key == "type")
                {
                    var type = questArray[key];
                    switch (type)
                    {
                        case "date": DisplayDate();
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

    function DisplayDate()
    {
        var today = new Date();
        var myP = document.createElement("p");
        myP.textContent = today;
        question.appendChild(myP);

    }

    function DisplayTextbox()
    {
        
        var txtbox = document.createElement("input");
        txtbox.type = "text";
        question.appendChild(txtbox);
    }

    function DisplayTextarea()
    {
        var txtArea = document.createElement("textarea");
        txtArea.rows = "4";
        txtArea.id = "textArea";
        question.appendChild(txtArea);
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

}

