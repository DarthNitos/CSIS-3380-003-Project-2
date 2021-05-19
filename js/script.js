//  Get the length of all 'li' elements (basically the amount of contacts we have)
var numberOfElements = document.getElementsByTagName("li").length;

function countElements() {
    //  Divide numberOfElements by 10 to get the number of pages 
    var pages = numberOfElements / 10;

    //  Call createPageLinks() function and pass the number of pages
    createPageLinks(Math.ceil(pages));
}

function createPageLinks(pages) {
    //  Get the div with class 'page'
    const container = document.querySelector(`.page`);

    var htmlString = `<div class="pagination"><li>`;

    //  Create as many links as pages
    for (var i = 1; i < pages + 1; i++) {
        htmlString += `<a id="` + i + `">` + i + `</a>`;
        // htmlString += `<a id="` + i + `" onclick="getContacts(` + i + `, 10)">` + i + `</a>`;
    }

    htmlString += `</li></div>`;

    //  Insert the htmlString right before the end of the div with the class 'page'
    container.insertAdjacentHTML(`beforeend`, htmlString);
}

function getContacts(pageID, entriesPerPage) {
    //  Offset is a starting point for each page 
    var offset = (pageID - 1) * entriesPerPage;
    //  Limits is the finishing point for each page
    var limit = offset + entriesPerPage;

    // If the limit is greater than the number of elements => means we wrapped around (array is empty)
    //  So make the limit be the number of entries 
    if (limit > numberOfElements) {
        limit = numberOfElements;
    }

    //  Get a DOM collection of all 'li' with class 'contact-item'
    //  and convert them to a JS array
    var contactsArray = Array.from(document.querySelectorAll("li.contact-item"));

    //  Hide each 'li' element   
    contactsArray.map(x => { x.hidden = true });

    //  Start at the beginning point (offset) and go until the end (limit)
    //  Each time make 'li' element visible, which is within the boundaries (offset to limit)
    for (var i = offset; i < limit; i++) {
        contactsArray[i].hidden = false;
    }
}

countElements();

//  Initial call to getContacts() to display 10 first contacts on the first page
getContacts(1, 10);

//  Get a DOM collection of all 'a' elemets
//  and convert them to a JS array
const pageLinks = Array.from(document.querySelectorAll("div.pagination a"));

//  Add onclick event to each 'a' element and call getContacts() function
pageLinks.map(pageLink => {
    pageLink.setAttribute("onclick", "getContacts(" + pageLink.id + ", 10)");
});
