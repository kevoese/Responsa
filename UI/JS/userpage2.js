const newtopic = document.querySelector(".topic");
let commentsBar = null;

const imageInput = document.querySelector(".createimgfile");
const postContenTitle = document.querySelector(".createtopictitle");
const postButton = document.querySelector(".create");
const postContent = document.querySelector(".createfield");
let pictureFile = null;

let newsFeed = [
  {
    topicID: 0,
    title: "MPU6050",
    topicUser: "John Doe",
    topicDate: "Feb 5 2019",
    userImg:
      "http://2.bp.blogspot.com/-M4AaFPHtjgY/Up6heG0iFZI/AAAAAAAABs8/4mtrsepOqCM/s1600/Nice+Wallpapers+(13).jpg",
    topicImg:
      "https://cdn.pixabay.com/photo/2018/01/05/02/42/background-3062023_960_720.jpg",
    topicContent: "lorem shit bla bla bla",
    comments: [
      {
        commentUser: "Paul efe",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 0
      },

      {
        commentUser: "Paul efe",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 1
      },

      {
        commentUser: "Paul efe",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 2
      }
    ],
    commentNo: 3
  },

  {
    topicID: 1,
    title: "ROUTE TO AGBARA",
    topicUser: "Justin igugu",
    topicDate: "Feb 15 2009",
    userImg:
      "http://4.bp.blogspot.com/-w3I5XQ1vWbg/Up6hKWsBRrI/AAAAAAAABss/I7_nbS_7wQ0/s1600/Nice+Wallpapers+(12).jpg",
    topicImg:
      "http://3.bp.blogspot.com/-2XY289Z6P7A/Up6g55D5xbI/AAAAAAAABsk/p87ndYSjTzE/s1600/Nice+Wallpapers+(10).jpg",
    topicContent: "lorem shit bla bla bla",
    comments: [
      {
        commentUser: "victor efe",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 0
      },

      {
        commentUser: "tega amos",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 1
      },

      {
        commentUser: "voilet justin",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 2
      }
    ],
    commentNo: 3
  },

  {
    topicID: 2,
    title: "HBRIDGE DESIGN",
    topicUser: "Amoslv",
    topicDate: "Feb 5 2019",
    userImg:
      "http://4.bp.blogspot.com/-Yhi4Yx5G5NM/Up6hobt7o5I/AAAAAAAABtE/-puGXav1c30/s1600/Nice+Wallpapers+(1).jpg",
    topicImg:
      "https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606_960_720.jpg",
    topicContent: "lorem shit bla bla bla",
    comments: [
      {
        commentUser: "karo",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 0
      },

      {
        commentUser: "kevo",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 1
      },

      {
        commentUser: "Jude",
        approve: 3,
        disapprove: 5,
        commentContent: "some comment shits here",
        commentID: 2
      }
    ],
    commentNo: 3
  }
];

const postUpload = post => {
  let formContent = new FormData();
  formContent.append("image", post.image);
  formContent.append("name", post.image.name);
  let data = {
    method: "POST",
    headers: new Headers({
      Authorization: "Client-ID 163ceaad1d6ed26"
    }),
    body: formContent
  };

  fetch("https://api.imgur.com/3/image", data).then(response => {
    response.json().then(data => {
      console.log(data.data.link);
      post.content.topicImg = data.data.link;
      //make server request
      newsFeed.push(post.content);
      let newpost = createTopic(newsFeed[newsFeed.length - 1]);
      newtopic.insertBefore(newpost, newtopic.children[0]);
    });
  });
};

imageInput.addEventListener("change", event => {
  pictureFile = imageInput.files[0];
});

postButton.addEventListener("click", event => {
  let date = new Date();
  date += "";
  date = date.split(" ");
  date = `${date[1]} ${date[2]} ${date[3]}`;
  let obj = {
    topicID: 0,
    title: postContenTitle.value,
    topicUser: "John Doe",
    topicDate: date,
    userImg: "",
    topicImg: "",
    topicContent: postContent.value,
    comments: []
  };
  let post = { image: pictureFile, content: obj };
  postUpload(post);
  postContent.value = "";
  postContenTitle.value = "";
});

createElement = (element, classname) => {
  div = document.createElement(element);
  div.className = classname;
  return div;
};

createSingleComment = (comment, topicID) => {
  let CommentDiv = createElement("div", "");
  CommentDiv.id = topicID + "_" + comment.commentID;
  let solnuser = createElement("div", "solnuser");
  let solnusername = createElement("span", "solnusername");
  solnusername.textContent = comment.commentUser;
  let approve = createElement("span", "approve");
  approve.textContent = comment.approve + "";
  let disapprove = createElement("span", "disapprove");
  disapprove.textContent = comment.disapprove + "";
  solnuser.appendChild(solnusername);
  solnuser.appendChild(approve);
  solnuser.appendChild(disapprove);
  let commentText = createElement("p", "");
  commentText.textContent = comment.commentContent;
  CommentDiv.appendChild(solnuser);
  CommentDiv.appendChild(commentText);

  return CommentDiv;
};

createComments = post => {
  let solns = createElement("div", "solns");
  let refresh = createElement("div", "refresh");
  solns.appendChild(refresh);
  let arr = post.comments.reverse();
  arr.forEach(comment => {
    solns.appendChild(createSingleComment(comment, post.topicID));
  });
  return solns;
};

createTopic = post => {
  let topicContent = createElement("div", "topiccontent");
  topicContent.id = post.title + "_" + post.topicID;
  let topicwrapper = createElement("div", "topicwrapper");
  let userdetail = createElement("div", "userdetail");
  let userimg = createElement("img", "userimg");
  userimg.src = post.userImg;
  let userName = createElement("a", "userName");
  userName.textContent = post.topicUser;
  let replywrap = createElement("div", "replywrap");
  let date = createElement("span", "date");
  date.textContent = post.topicDate;
  let reply = createElement("span", "reply");
  reply.textContent = post.comments.length;
  let title = createElement("h2", "head");
  title.textContent = post.title;
  let topicimg = createElement("img", "topicimg");
  topicimg.src = post.topicImg;
  let topictexts = createElement("p", "topictexts");
  topictexts.textContent = post.topicContent;

  let solnwrapper = createElement("div", "solnwrapper");
  let solnbar = createElement("div", "solnbar");
  solnbar.id = post.topicID;
  let solution = createElement("textarea", "solution");
  solution.placeholder = "Give a Reply...";
  let send = createElement("div", "send");

  replywrap.appendChild(date);
  replywrap.appendChild(reply);

  userdetail.appendChild(userimg);
  userdetail.appendChild(userName);
  userdetail.appendChild(replywrap);

  topicwrapper.appendChild(userdetail);
  topicwrapper.appendChild(title);
  topicwrapper.appendChild(topicimg);
  topicwrapper.appendChild(topictexts);

  solnbar.appendChild(solution);
  solnbar.appendChild(send);

  solnwrapper.appendChild(solnbar);
  solnwrapper.appendChild(createComments(post));

  topicContent.appendChild(topicwrapper);
  topicContent.appendChild(solnwrapper);

  return topicContent;
  //   newtopic.appendChild(topicContent);
};

displayfeed = newsFeed => {
  newsFeed.reverse().forEach(post => {
    newtopic.appendChild(createTopic(post));
  });
  commentsBar = document.querySelectorAll(".solnwrapper");
};

displayfeed(newsFeed);

commentsBar.forEach(div => {
  div.addEventListener("click", event => {
    let classType = event.target.className;
    if (classType == "approve" || classType == "disapprove") {
      let myStr = event.target.parentElement.parentElement.id;
      let arr = myStr.split("_");
      newsFeed[arr[0]].comments[arr[1]][classType] += 1;
      console.log(newsFeed[arr[0]].comments[arr[1]].commentUser);
      event.target.textContent = newsFeed[arr[0]].comments[arr[1]][classType];
    }

    if (classType == "send") {
      let commentBar = event.target.parentElement.nextSibling;
      let topicID = event.target.parentElement.id;
      let comment = event.target.previousSibling.value;
      event.target.previousSibling.value = "";
      let newComment = {
        commentUser: "John",
        approve: 0,
        disapprove: 0,
        commentContent: comment,
        commentID: newsFeed[topicID].comments.length
      };
      newsFeed[topicID].comments.push(newComment);
      let commentDiv = createSingleComment(newComment, topicID);
      commentBar.insertBefore(commentDiv, commentBar.children[1]);
      let commentNum = event.target.parentElement.parentElement.parentElement.querySelector(
        ".reply"
      );
      commentNum.textContent = newsFeed[topicID].comments.length;
    }
  });
});
