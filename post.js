
document.addEventListener("DOMContentLoaded", ()=>{
    const getView = document.getElementById("get");
    getView.addEventListener("click", ()=>{getPost()});
    const postCreateForm = document.getElementById("postCreate")

    const viewPostForm = document.getElementById("createPost")
    viewPostForm.addEventListener("click",()=>{
        if(postCreateForm.style.display === "block"){
            postCreateForm.style.display = "none"
        }else{postCreateForm.style.display = "block"}
    })
    postCreateForm.addEventListener("submit",(event)=>{
        event.preventDefault()
        let title = event.target.title.value
        let body = event.target.body.value
        postCreateForm.reset();
        postCreateForm.style.display = "none"
        postPost(title, body)
    })
});

function postPost(title, body){
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
        commentIteration(post.comments);
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

    let commentButton = document.createElement("button")
    commentButton.innerText = "comment"
    commentButton.addEventListener("click",()=>{
        postSpecify(post.id)
    })

    container.appendChild(commentButton);

    let deleteButton = document.createElement("button")
    deleteButton.id = post.id
    deleteButton.innerText = "delete"

    deleteButton.addEventListener("click", ()=>{
        deletePost(post.id)
    })
    container.appendChild(deleteButton)
    let editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.id = post.id;
    editButton.addEventListener("click",()=>{
        createEditForm(post.title, post.body, post.id);
    })
    container.appendChild(editButton);
    document.getElementById("showPosts").appendChild(container);
}

function createEditForm(title, body, id){
    let form = document.getElementById("postEdit");
    form.title.value = title;
    form.body.value = body;
    form.style.display = "block";
    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        submitPostEdit(e, id, form);
        
    })
}

function submitPostEdit(e, id, form){
    let title = e.target.title.value;
    let body = e.target.body.value;
    fetch("http://localhost:3000/posts" + "/" + id, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({title,body})
    }).then(r => {
        if (r.status === 200){
            let card = document.getElementById(`${id}`);
            card.children[0].innerText = title;
            card.children[1].innerText = body;
            form.style.display = "none"
        }
    })

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