
document.addEventListener("DOMContentLoaded", ()=>{
    const getView = document.getElementById("get");
    getView.addEventListener("click", ()=>{getPost()});
    const postCreateForm = document.getElementById("postCreate")

    const viewPostForm = document.getElementById("createPost")
    viewPostForm.addEventListener("click",()=>{
        postCreateForm.style.display = "block"
    })
    postCreateForm.addEventListener("submit",(event)=>{
        event.preventDefault()
        let title = event.target.title.value
        let body = event.target.body.value
        postCreateForm.style.display = "none"
        addPost(title, body)
    })
});

function addPost(title, body){
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({title, body})
    }).then(r => r.json()).then(data =>createPostCard(data))
}

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

    let heading = document.createElement("h2");
    heading.innerText = post.title;
    container.appendChild(heading);
    
    let content = document.createElement("p");
    content.innerText = post.body;
    container.appendChild(content);

    let deleteButton = document.createElement("button")
    deleteButton.id = post.id
    deleteButton.innerText = "delete"

    deleteButton.addEventListener("click", ()=>{
        deletePost(post.id)
    })
    container.appendChild(deleteButton)
    let editButton = document.createElement("button")
    document.getElementById("showPosts").appendChild(container);
}

function deletePost(id) {
    fetch("http://localhost:3000/posts" + "/"+id, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({id})
    }).then(resp => {
        if (resp.status === 204){
            document.getElementById(`${id}`).remove()
        }
    })
}