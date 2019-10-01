document.addEventListener("DOMContentLoaded",()=>{

})
function postSpecify(id){
    const form = document.getElementById("comment");
    const idInput = document.querySelector("#comment #id");
    idInput.value = id
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let body = e.target.body.value;
        fetch("http://localhost:3000/comments", {
                method: "POST",
                headers:{
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({id, body})
        }).then()

    })
    form.style.display = "block"
    document.getElementById(id).appendChild(form);
}

function commentIteration(jsonComments){
    for (comment of jsonComments){
        commentDOMCreation(comment);
    }
}

function commentDOMCreation(comment){
    
}