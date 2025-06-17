const post_url = "http://crud.tlol.me/wonbeom/post";
let pagePointer = 0
const init = async ()=>{
    const res = await fetch(post_url);
    const json = await res.json();
    const createPost = (post) => {
        const postLi = document.createElement("li");
        postLi.classList.add("post-container");
        document.querySelector("#board").appendChild(postLi);

        const postTitle = document.createElement("span");
        postTitle.innerText = post.title;
        postTitle.classList.add("bold-text");
        postLi.appendChild(postTitle);

        const contentDiv = document.createElement("div");
        contentDiv.innerText = post.content;
        postLi.appendChild(contentDiv);
        contentDiv.style.display = 'none';
        postLi.addEventListener('click',()=>{
            if (contentDiv.style.display == 'block') {
                contentDiv.style.display = 'none';
            }else{
                contentDiv.style.display = 'block';
            }
        }); 
    }
    json.slice(0,5).forEach(createPost);
    pagePointer+=5
    document.querySelector("#post-more").addEventListener("click",()=>{
        const prevPointer = pagePointer;
        pagePointer = pagePointer+5
        json.slice(prevPointer,pagePointer).forEach(createPost)
    })
}

const write = async (data)=>{
    const res = await fetch(post_url,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
    })
}

const submit = ()=>{
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    const data = {
        title:title,
        content:content
    }
    console.log(data)
    write(data);
}

document.querySelector("#post-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    submit();
})

document.querySelector("#toggle-write").addEventListener("click",()=>{
    if(document.querySelector("#post-form").style.display == 'block'){
        document.querySelector("#post-form").style.display = 'none'
    }else{
        document.querySelector("#post-form").style.display = 'block'
    }
});

init()