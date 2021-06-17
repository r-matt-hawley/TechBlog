const showPost = async () => {
    const response = await fetch(`/api/posts/${parseInt(this.post-id)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        //Add HTML element with Post (and comments)
        // this.appendChild({{showPost}});
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);
