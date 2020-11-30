
//AIRTABLE

var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'key2E5aY4XZU5Rnnt' }).base('app3ApcQ20X84yEZX');

function getBook(record) {
    base('Books').find(record.id, function(err, record) {
        if (err) { console.error(err); return; }
        console.log('Retrieved', record.id);
        console.log('Synopsis', record.get('Synopsis'));
        var modal = $('#myModal')
        modal.find('.modal-title').html(record.get('Name') + '<i> by ' + record.get('Author') + '</i>')
        modal.find('.modal-img').html("<img src=" + record.get('Cover')[0].url + ">")
        modal.find('.modal-desc').text(record.get('Synopsis'))
        localStorage.setItem("bookName",record.get('Name'));
        $('#myModal').modal()
    });
};

var loadBooks = function() {
    $('#books').empty();

    base('Books').select({
        // Selecting from Main View:
        view: "Main View"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            console.log('Retrieved', record.get('Name'));
            console.log('Cover', record.get('Cover')[0].url);
            console.log('oooooo', record.getId());

        

            $bookInfo = $('<div>');
            var x = $('<a>').html("<img src=" + record.get('Cover')[0].url + ">").click(function() {
                getBook(record);
            });
            $bookInfo.append(x)
            //$bookInfo.append($('<div>').html("<img src=" + record.get('Cover')[0].url + ">"));
            $bookInfo.append($('<h3>').text(record.get('Name')));
            $bookInfo.append($('<div>').text(record.get('Author')));
            //$bookInfo.append($('<button>WHAT</button>').html("<href= ./book.html#" + record.getId() + ">"));
            
            $bookInfo.attr('id', record.getId());

            $('#books').append($bookInfo);

            

            
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

loadBooks();