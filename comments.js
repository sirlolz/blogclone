document.addEventListener("DOMContentLoaded",()=>{

})
function postSpecify(id){
    const form = document.getElementById("comment");
    const idInput = document.querySelector("#comment #id");
    idInput.value = id
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let body = e.target.body.value;
        let post_id = id 
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({post_id, body})
        }).then(resp=> resp.json()).then(json => {
            commentDOMCreation(json);
            form.reset();
            form.style.display = "none"
        })        
    })
    form.style.display = "block"
    document.getElementById(id).appendChild(form);
}

function commentIteration(comments){
    for (comment of comments){
        commentDOMCreation(comment);
    }
}

function commentDOMCreation(comment){
    let post = document.getElementById(comment.post_id);
    let p = document.createElement("p");
    p.innerText = "comment: " + comment.body;
    post.appendChild(p);
}