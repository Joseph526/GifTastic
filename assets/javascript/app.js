$(document).ready(function() {

    // Declare global variables
    var topics = ["baseball", "football", "hockey", "basketball", "soccer", "tennis", "golf", "rugby", "badminton", "archery", "rowing", "Canadian football"];
    var newTopic = "";
    var apiKey = "dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=" + apiKey + "&q=";

    // Declare functions
    var gif = {
        
        // Add item to buttons section
        addItemButton: function() {
            event.preventDefault();
            newTopic = $("#addItem").val().trim();
            topics.push(newTopic);
            $("#addItem").val("");
            gif.displayButtons();
        },

        // Generate buttons from topics array elements
        displayButtons: function() {
            
            // Clear the previous set of buttons
            $("#buttonDisplay").empty();

            // Display new set of buttons
            for (i = 0; i < topics.length; i++) {
                var gifButton = $("<button>").text(topics[i]);
                gifButton.addClass("btn btn-info btnGif");
                gifButton.attr("data-topic", topics[i]);
                $("#buttonDisplay").append(gifButton);
            }
        },

        // Display gifs on screen
        displayGifs: function() {
            var gifTopicToGet = $(this).attr("data-topic");
            $.ajax({
                url: queryURL + gifTopicToGet,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                var giphyArray = response.data;
                for (i = 0; i < giphyArray.length; i++) {
                    var thumbnail = $("<div>").addClass("thumbnail inlineDiv");
                    var thumbnailImg = $("<img>").addClass("imgGif");
                    thumbnailImg.attr("data-still", giphyArray[i].images.fixed_height_still.url);
                    thumbnailImg.attr("data-animate", giphyArray[i].images.fixed_height.url);
                    thumbnailImg.attr("data-state", "still");
                    thumbnailImg.attr("src", thumbnailImg.attr("data-still"));
                    var thumbnailCap = $("<div>").addClass("caption");
                    thumbnailCap.html("<p>Rating: " + giphyArray[i].rating + "</p>");
                    thumbnail.html(thumbnailImg);
                    thumbnail.append(thumbnailCap);
                    $("#gifDisplay").prepend(thumbnail);
                }
            });
        },

        // Change static gif to animated and vice versa
        changeGif: function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }
    };

    // Execute functions
    // Display initial button set on page load
    gif.displayButtons();

    // Submit button to add new topic
    $("#submitButton").on("click", gif.addItemButton);

    // Gif button to display gifs
    $(document).on("click", ".btnGif", gif.displayGifs);

    // Gif click to swap static and animated
    $(document).on("click", ".imgGif", gif.changeGif);
});