// method to submit the form data for new post using ajax

const createPost = () => {
  let newPostForm = $("#new-post-form");
  newPostForm.submit((e) => {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/posts/create",
      data: newPostForm.serialize(),
      success: (data) => {
        // console.log(data);
        let newPost = newPostDom(data.data.post);
        $("#feed-posts-lists>ul").prepend($(newPost));
      },
      error: (error) => {
        console.log(error.responseText);
      },
    });
  });
};

// method to create post in DOM

const newPostDom = (post) => {
  return $(`<li id="post-${post._id}">
    <p>
    ${post.content}
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash"></i></a>
            </small>
            <br>
            <small>
            ${post.user.name}
            </small>

    </p>
    <div class="posts-comments">
       
            <form action="/comments/create" method="post">
                <input type="text" name="content" placeholder="type here to add comment">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add comment">
            </form>
        
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                        
                    </ul>
                </div>
    </div>
</li>`);
};

// method to delete post in DOM

const deletePost = () => {};
createPost();
