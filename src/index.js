document.addEventListener("DOMContentLoaded", ()=>{
    postShow();
    createPostForm();
    
    let postEditForm = document.getElementById("postEdit");
    postEditForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        submitPostEdit(e, e.target.id.value, postEditForm);
    })
    
    let commentForm = document.getElementById("comment");
    commentForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        let body = e.target.body.value;
        let post_id = e.target.id.value;
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({post_id, body})
        }).then(resp=> resp.json()).then(json => {
            commentDOMCreation(json);
            commentForm.reset();
            commentForm.style.display = "none"
        })   
    });
});