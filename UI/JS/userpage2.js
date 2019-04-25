const newtopic = document.querySelector(".topic");
let commentsBar = null;
const imageInput = document.querySelector(".createimgfile");
const postContenTitle = document.querySelector(".createtopictitle");
const postButton = document.querySelector(".create");
const postContent = document.querySelector(".createfield");
let pictureFile = null;
let commentInput = null;
let Isrefresh = false;

let newsFeed = [
  {
    topicID: 0,
    title: "MPU6050 big topic",
    topicUser: "John Doe cool",
    topicDate: "Feb 5 2019",
    userImg: "images/dummy3.jpg",
    topicImg: "images/responsabng4.jpg",
    topicContent: "lorem shit bla bla bla",
    comments: [
      {
        commentUser: "Paul efe oghene",
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
    userImg: "images/dummy4.jpg",
    topicImg: "images/black_macbook_air.jpg",
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
    userImg: "images/dummy2.jpeg",
    topicImg: "images/bg.jpg",
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

// const animate = classname =>{
//   letdocument.querySelector(classname)
//   .classList.add("animate");

// }

const postUpload = post => {
  const refresh = document.querySelector(".feedrefresh");
  refresh.textContent = "";
  refresh.classList.add("animate");
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

  fetch("https://api.imgur.com/3/image", data)
    .then(response => {
      response.json().then(data => {
        post.content.topicImg = data.data.link;
        //make server request
        newsFeed.push(post.content);
        refreshFeed(refresh);
      });
    })
    .catch(err => {
      bar.textContent = "Problem Updating Feed!! Please Refresh...";
      bar.classList.remove("animate");
    });
};

imageInput.addEventListener("change", event => {
  pictureFile = imageInput.files[0];
});

addPosts = (file, obj) => {
  readPath = new FileReader(); // create a file reader object
  let path = null;
  readPath.readAsDataURL(file); //read the content of the file as a url path
  readPath.addEventListener("load", event => {
    //add a load event which is triggered if a read is succesful before collecting path
    path = event.target.result;
    obj.topicImg = path;
    let newpost = createTopic(obj);
    newtopic.insertBefore(newpost, newtopic.children[0]);
  });
};

postButton.addEventListener("click", event => {
  postButton.style.zIndex = "-1";
  let date = new Date();
  date += "";
  date = date.split(" ");
  date = `${date[1]} ${date[2]} ${date[3]}`;
  let obj = {
    topicID: newsFeed.length,
    title: postContenTitle.value,
    topicUser: "John Doe",
    topicDate: date,
    userImg: "",
    topicImg: "",
    topicContent: postContent.value,
    comments: []
  };
  let post = { image: pictureFile, content: obj };
  addPosts(pictureFile, obj);
  postContent.value = "";
  postContenTitle.value = "";
  postUpload(post);
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
  let copyArr = JSON.parse(JSON.stringify(newsFeed));
  copyArr.reverse().forEach(post => {
    newtopic.appendChild(createTopic(post));
  });
  commentInput = document.querySelectorAll(".solution");
};

displayfeed(newsFeed);

newtopic.addEventListener("click", event => {
  let classType = event.target.className;
  if (classType == "approve" || classType == "disapprove") {
    let myStr = event.target.parentElement.parentElement.id;
    let arr = myStr.split("_");
    newsFeed[arr[0]].comments[arr[1]][classType] += 1;
    event.target.textContent = newsFeed[arr[0]].comments[arr[1]][classType];
  }

  if (classType == "send") {
    let commentBar = event.target.parentElement.nextSibling;
    let topicID = event.target.parentElement.id;
    let comment = event.target.previousSibling.value;
    event.target.previousSibling.value = "";
    event.target.style.zIndex = "-1";
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

const refreshBtn = document.querySelector(".feedrefresh");

const refreshFeed = element => {
  element.textContent = "";
  element.classList.add("animate");
  newtopic.innerHTML = "";
  displayfeed(newsFeed);
  element.textContent = "Refresh Feed...";
  element.classList.remove("animate");
};

refreshBtn.addEventListener("click", event => {
  refreshFeed(event.target);
});

commentInput.forEach(element => {
  element.addEventListener("keyup", event => {
    let button = event.target.nextElementSibling;
    if (isValid(event.target.value)) button.style.zIndex = "1";
    else button.style.zIndex = "-1";
  });
});
