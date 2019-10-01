
document.addEventListener("DOMContentLoaded", ()=>{
    const getView = document.getElementById("get");
    getView.addEventListener("click", ()=>{getPost()});

    const viewPostForm = document.getElementById("createPost")
    viewPostForm.addEventListener("click",()=>{
        const postCreateForm = document.getElementById("postCreate")
        postCreateForm.style.display = "block"
    })
});

function getPost(){
    let postToggle = document.getElementById("get");
    if (postToggle.innerText == "view posts"){
        fetch("http://localhost:3000/posts").then(r => r.json()).then(json => {postIterattion(json)});
        postToggle.innerText = "hide posts";
    }else{
        postToggle.innerText = "view posts";
        document.getElementById("showPosts").innerText = ""
    }
}

function postIterattion(json){
    for (post of json ){
        createPostCard(post);
    }
}

function createPostCard(post) {
    let container  = document.createElement("div");
    container.id = post.id;
    container.style.width = "20%";
    let heading = document.createElement("h2");
    heading.innerText = post.title;
    
    let content = document.createElement("p");
    content.innerText = post.body;
    container.appendChild(heading);
    container.appendChild(content);
    document.getElementById("showPosts").appendChild(container);
}