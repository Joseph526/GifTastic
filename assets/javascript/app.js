$(document).ready(function() {

    // Declare global variables
    var topics = ["basball", "football", "hockey", "basketball"];
    var newTopic = "";
    var apiKey = "dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=" + apiKey + "&q=";

    // Declare functions
    var gif = {
        addItemButton: function() {
            event.preventDefault();
            newTopic = $("#addItem").val().trim();
            topics.push(newTopic);
            console.log(topics);
            $("#gifDisplay").text(newTopic);
        }
    };

    // Execute functions
    $("#submitButton").on("click", gif.addItemButton);
});