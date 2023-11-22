// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

<link rel="stylesheet" href="/css/home_post_comment.css"></link>;

class PostComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;
    // call for all the existing comments
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(self).serialize(),
        success: function (data) {
          console.log("you are in comment create NOTY!!");

          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-button", newComment));

          new ToggleLike($(" .toggle-like-button", newComment));

          // console.log('you are in comment create NOTY!!');

          new Noty({
            theme: "relax",
            text: "Comment published!!!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    // let Time = new PostCommentTime(post.createdAt);
    // let commentTime = Time.getTimeAgo(post.createdAt);
    // console.log(commentTime);
    // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li

    return $(`<li class="each-comment" id="comment-${comment._id}">
                    <p class="each-comment-text">
                        
                            <small class="small-delete">
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                        
                
                        <div class="comment-user">
                            
                                <img src="${comment.user.avatar}" alt="${comment.user.name}" width="100">
                            
                            <p class="comment-user-name"> ${comment.user.name} </p>
                            <p class="comment-timing">${comment.createdAt}</p>
                            
                            <small>
                                
                                    <a class="toggle-like-button" data-likes="${comment.likes.length}" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                        <i class="fa-regular fa-heart"></i>${comment.likes.length} 
                                    </a>
                            
                            </small>
                        </div>
                
                        <p class="comment-content">${comment.content}</p>

                    </p> 
                </li>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: "relax",
            text: "Comment Deleted !!!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}
