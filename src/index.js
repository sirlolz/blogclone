document.addEventListener("DOMContentLoaded", ()=>{
    postShow();
    createPostForm();
    let form = document.getElementById("postEdit");
    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        console.log(e.target.title.value)
        submitPostEdit(e, e.target.id.value, form)
    })
});