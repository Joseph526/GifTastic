$(document).ready(function() {

    // Declare global variables
    var topics = ["baseball", "football", "hockey", "basketball", "soccer", "tennis", "golf", "rugby", "badminton", "archery", "rowing", "Canadian football"];
    var newTopic = "";
    var apiKey = "dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=" + apiKey + "&q=";

    // Declare functions
    var gif = {
        
        // Add item to buttons array
        addItemButton: function() {
            event.preventDefault();
            newTopic = $("#addItem").val().trim();
            topics.push(newTopic);
            console.log(topics);
            $("#addItem").val("");
            $("#gifDisplay").text(newTopic);
        },

        // Generate buttons from topics array elements
        displayButtons: function() {
            for (i = 0; i < topics.length; i++) {
                var gifButton = $("<button>").text(topics[i]);
                gifButton.addClass("btn btn-info");
                gifButton.attr("data-topic", topics[i]);
                $("#buttonDisplay").append(gifButton);
            }
        }



        // Display gifs on screen

    };

    // Execute functions

    // Display initial button set on page load
    gif.displayButtons();

    // Submit button to add new topic
    $("#submitButton").on("click", gif.addItemButton);
});