document.addEventListener('DOMContentLoaded', function() {

  document.getElementsByTagName('form')[0].onsubmit = function(evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0,150);
  }

  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();

  // Getting the text from the input
  var textInputValue = document.getElementById('terminalTextInput').value.trim();

  //Getting the text from the results div
  var textResultsValue = document.getElementById('terminalResultsCont').innerHTML;

  // Clear text input
  var clearInput = function(){
    document.getElementById('terminalTextInput').value = "";
  }

  // Scroll to the bottom of the results div
  var scrollToBottomOfResults = function(){
    var terminalResultsDiv = document.getElementById('terminalResultsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // Add text to the results div
  var addTextToResults = function(textToAdd){
    document.getElementById('terminalResultsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }

  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function(){
    // Array of all the help keywords
    var helpKeyWords = [
      "&nbsp; whoami - display information about this page and its creator",
      "&nbsp; projects - things I am working on you can look at",
      "&nbsp; tools - list the scripts available for use"
    ].join('<br>');
    addTextToResults(helpKeyWords);
  }

  var postWhoAmI = function(){
    var whoAmI = [
      "&nbsp; NAME: Tyler P.",
      "&nbsp; ALIAS: s0cketwrench",
      "&nbsp; LOCATION: United States",
      "&nbsp; OCCUPATION: Programmer, Security Researcher",
      "&nbsp; EMAIL: <a href='mailto:s0cketwrench@protonmail.com'>s0cketwrench@protonmail.com</a>",
      "&nbsp; SOCIALS: <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/s0cketwrench'>twitter</a> + <a target='_blank' rel='noopener noreferrer' href='https://github.com/s0cketwrench'>github</a>"
    ].join('<br>');
    addTextToResults(whoAmI);
  }

  var postToolsList = function(){
    var toolKeywords = [
      "&nbsp; open [domain] (ex. open s0cketwrench.github.io)",
      "&nbsp; google [keywords] (ex. google python tutorials)",
      "&nbsp; youtube [keywords] (ex. youtube rally crashes)",
      "&nbsp; wiki [keywords] (ex. wiki golden dawn)",
      "&nbsp; time - will display the current time",
      "&nbsp; date - will display the current date"
    ].join('<br>');
    addTextToResults(toolKeywords);
  }

  var postIntro = function (){
    var welcomeInfo = [
      "**** WELCOME TO SOCKET.OS ****",
      "32 GB RAM SYSTEM - 11.8 TB FREE DISK SPACE",
      "<b>READY.</b>",
      "",
      "TYPE 'help' TO GET STARTED"
    ].join('<br>');
    addTextToResults(welcomeInfo);
  }

  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function(postTimeDay){
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10){ // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10){ // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "time"){
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date"){
      addTextToResults(currentDate);
    }
  }

  // Opening links in a new window
  var openLinkInNewWindow = function(linkToOpen){
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  var textReplies = function() {
    switch(textInputValueLowerCase){

      case "tools":
        clearInput();
        postToolsList();
        break;

      case "whoami":
        clearInput();
        postWhoAmI();
        break;

      case "youtube":
        clearInput();
        addTextToResults("Type youtube + something to search for.");
        break;

      case "google":
        clearInput();
        addTextToResults("Type google + something to search for.");
        break;

        case "wiki":
        case "wikipedia":
          clearInput();
          addTextToResults("Type wiki + something to search for.");
          break;  

      case "time":
        clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      default:
      clearInput();
      addTextToResults("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>help</b> to see all commands.</i></p>");
      break;
    }
  }

// Main function to check the entered text and assign it to the correct function
  var checkWord = function() {
    textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string

    if (textInputValue != ""){ //checking if text was entered
      addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
      if (textInputValueLowerCase.substr(0,5) == "open ") { //if the first 5 characters = open + space
        openLinkInNewWindow('http://' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
        addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,7) == "google ") {
        openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
        addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
      } else if (textInputValueLowerCase.substr(0,5) == "wiki "){
        openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + textInputValueLowerCase.substr(5));
        addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
      } else{
        textReplies();
      }
    }
  };
  
  postIntro();
});