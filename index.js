let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerel = document.getElementById("spinner");

function createAndappend(result) {
    let {
        title,
        link,
        description
    } = result;
    let container = document.createElement("div");
    container.classList.add('result-item');
    searchResultsEl.appendChild(container);

    let TittleEl = document.createElement("a");
    TittleEl.classList.add("result-title");
    TittleEl.textContent = title;
    TittleEl.href = link;
    TittleEl.target = "_blank";
    container.appendChild(TittleEl);

    let breakEL = document.createElement("br");
    container.appendChild(breakEL);

    let desEle = document.createElement("a");
    desEle.classList.add("result-url");
    desEle.href = link;
    desEle.target = "_blank";
    desEle.textContent = link;
    container.appendChild(desEle);

    let breakELE = document.createElement("br");
    container.appendChild(breakELE);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    container.appendChild(descriptionEl);

}

function displaySearchResult(searchResults) {
    spinnerel.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndappend(result);
    }

}

function searchwiki(event) {
    if (event.key === "Enter") {
        spinnerel.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchinp = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchinp;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displaySearchResult(search_results);
            });

    }
}
searchInputEl.addEventListener("keydown", searchwiki);