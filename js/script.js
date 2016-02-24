$(document).ready(function() {

  $('.searchTerm').keypress(function(e) {
    if (e.keyCode == 13)
      $('.searchButton').click();
  });

  $('.searchButton').on('click', function() {
    var url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('.searchTerm').val() + '&callback=?';
    console.log(url);
    $.ajax({
      url: url,
      dataType: 'jsonp',
      type: 'POST',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
      success: function(data) {
        console.log(data);
        $('.results').empty();
        $.each(data.query.search, function(i, item) {
          var link = encodeURIComponent(item.title);
          console.log(link);
          $('.results').append('<div class="wiki-page">' + '<a href="https://en.wikipedia.org/wiki/' + link + '"><h1>' + item.title + '</h1>' + '<p>' + item.snippet + '</p>' + '</a></div>');
        })
      }

    })
  });

  $(".random-button").on('click', function() {
    window.location = "http://en.wikipedia.org/wiki/Special:Random";
  })
});