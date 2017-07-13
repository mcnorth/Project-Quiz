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
        var myH1 = document.createElement("h1");
        var myH3 = document.createElement("h3")

        //modify the text to the value of the json object "id"
        myH1.textContent = jsonObject["id"];
        myH3.textContent = jsonObject["title"];


        //insert the content inside the div
        question.appendChild(myH1);
        question.appendChild(myH3);

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
                        case "choice": var options = [i + 1];
                                        DisplayChoice(options);
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
        question.appendChild(txtArea);
    }

    function DisplayChoice(opts)
    {
        for (var k = 0; k < opts.length; k++)
        {
            var radioBtn = document.createElement("input");
            radioBtn.setAttribute("type", "radio");
            var lbl = document.createElement("label");
            var txt = document.createTextNode(k);
            lbl.appendChild(txt);
            question.appendChild(radioBtn);
            question.appendChild(lbl);
        }

    }

}

