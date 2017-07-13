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
        //var quest = jsonObject["questions"];
        //var text = JSON.stringify(quest);

        //create the element
        var myH1 = document.createElement("h1");

        //modify the text to the value of the json object "id"
        myH1.textContent = jsonObject["id"];

        //insert the content inside the div
        question.appendChild(myH1);

        //for (var i = 0; i < text.length; i++)
        //{

        //    var myH2 = document.createElement("h2");
        //    myH2.textContent = text[i].id;

        //    question.appendChild(myH2);

        //}
    }

}