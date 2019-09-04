let pageToken;
let isLoadingMore = false;
let searchTimeout;

document.querySelector("#keyword").addEventListener("input", function(event){
    event.preventDefault();
    document.querySelector("#result-list").innerText = "";
    console.log(document.querySelector("#keyword").value);
    const keyword = document.querySelector("#keyword").value;

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function(){
        fetch(
            "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+keyword+"&type=video&key=AIzaSyCKBs-zBjF_l-jaW1NaqjwouYimFF9F4us",
            {
                method: "GET"
            }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            pageToken = data.nextPageToken;
            const items = data.items;
    
            for(let i = 0; i < items.length; i++){
                const item = items[i];
                console.log(item);
                const itemDOM = document.createElement("div");
                itemDOM.innerHTML = `
                    <img src="${item.snippet.thumbnails.high.url}"/>
                    <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">${item.snippet.title}</a>
                    <p>${item.snippet.description}</p>
                `;
                // <div>
                //     <img src=""/>
                // <a href="" target="_blank"></a>
                // <p></p>
                // </div>
                document.querySelector("#result-list").appendChild(itemDOM);
            }
    
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    }, 1000);
    
    
});

window.onscroll = function(){
    this.console.log("Scrolling!!!");
    console.log(document.body.offsetHeight);
    console.log(window.innerHeight + window.scrollY);
    if(!isLoadingMore && pageToken && document.body.offsetHeight - (window.innerHeight + window.scrollY) <= 100){
        const keyword = document.querySelector("#keyword").value;
        isLoadingMore = true;
    
    fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+keyword+"&type=video&key=AIzaSyCKBs-zBjF_l-jaW1NaqjwouYimFF9F4us&pageToken="+pageToken,
        {
            method: "GET"
        }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        pageToken = data.nextPageToken;
        const items = data.items;

        for(let i = 0; i < items.length; i++){
            const item = items[i];
            console.log(item);
            const itemDOM = document.createElement("div");
            itemDOM.innerHTML = `
                <img src="${item.snippet.thumbnails.high.url}"/>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">${item.snippet.title}</a>
                <p>${item.snippet.description}</p>
            `;
            // <div>
            //     <img src=""/>
            // <a href="" target="_blank"></a>
            // <p></p>
            // </div>
            document.querySelector("#result-list").appendChild(itemDOM);
        }

        isLoadingMore = false;
        console.log(data);
    }).catch((err) => {
        console.log(err);
    });

    }
};