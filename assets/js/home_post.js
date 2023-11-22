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
        deletePost($("#delete-post-button"), newPost);
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
                <a id="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash"></i></a>
            </small>
            <br>
            <small>
            ${post.user.name}
            </small>
            <br>
            <small>
                            
                  <a class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
                  <i class="fa-regular fa-heart"></i>${post.likes.length}
                  </a>
                
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

let deletePost = (deleteLink) => {
  $(deleteLink).click((e) => {
    e.preventDefault();
    console.log("HEllo");
    $.ajax({
      type: "get",
      url: $(deleteLink).prop("href"),
      success: (data) => {
        $(`#post-${data.data.post._id}`).remove();
      },
      error: (error) => {
        console.log(error.responseText);
      },
    });
  });
};
createPost();
