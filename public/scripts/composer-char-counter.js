$(document).ready(function () {
    const counter = $(".counter");
    $("#tweet-text").on("input", function (event) {
        const count = $(this).val().length;
        const remChar = 140 - count;
        console.log(`Characters left: ${remChar}`);
        if (remChar < 0) {
          console.log(`Char exceeded limit by ${Math.abs(remChar)}`);
          counter.addClass("counter-negative");
        } else {
          counter.removeClass("counter-negative");
        }
        //To display the remaining characters
        counter.text(remChar);
      });
    });
