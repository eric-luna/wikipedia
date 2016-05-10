$(document).ready(function() {
  // allows user to search with the enter key
  $('.searchTerm').keypress(function(e) {
    if (e.keyCode == 13)
      $('.searchButton').click();
  });
  // main function executed when search button clicked
  $('.searchButton').on('click', function() {
    // main url for the api request based on search input
    var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('.searchTerm').val() + '&callback=?';
    // api request
    $.ajax({
      url: url,
      dataType: 'jsonp',
      type: 'POST',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
      // function will run when api request is successful
      success: function(data) {
        console.log(data);
        // empties results from last search
        $('.results').empty();
        // for every result received it is addded to the results section 
        $.each(data.query.search, function(i, item) {
          var link = encodeURIComponent(item.title);
          console.log(link);
          $('.results').append('<div class="wiki-page">' + '<a href="https://en.wikipedia.org/wiki/' + link + '"><h1>' + item.title + '</h1>' + '<p>' + item.snippet + '</p>' + '</a></div>');
        })
      }

    })
  });
  //sends user to a random wiki article
  $(".random-button").on('click', function() {
    window.location = "http://en.wikipedia.org/wiki/Special:Random";
  })
});