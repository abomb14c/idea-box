var $inputTitle = $("#input-title");
var $inputBody = $("#input-body");

$("#button-save").on("click", buttonSave);

loadIdeas()

console.log(parsedIdeas());

function loadIdeas() {
  if (localStorage.getItem("ideas") === null) {
    localStorage.setItem("ideas", ("[]"));
  } else {
    parsedIdeas().forEach(function (idea) {
      renderIdea(idea.id, idea.title, idea.body, idea.quality);
    });
  };
}

function parsedIdeas() {
  return JSON.parse(localStorage.getItem("ideas"));
};

function renderIdea(id, title, body, quality) {
  $('#bottom-section').prepend(`
    <article class="idea">
      <h1 class="idea-title" contenteditable="true">${title}</h1>
      <img class="idea-button delete-idea" id="delete-idea" src="assets/delete.svg">
      <p class="idea-text" id="idea-text" contenteditable="true">${body}</p>
      <img class="idea-button" id="upvote-idea" src="assets/upvote.svg">
      <img class="idea-button" id="downvote-idea" src="assets/downvote.svg">
      <h5 class= "quality ${quality}"><span>Quality:</span><span class="quality-in-DOM">${quality}</span> </h5>
      <hr>
    </article>`);
}

function buttonSave(e) {
  e.preventDefault();
  var randID = Math.floor(Math.random() * 999999999);
  var newIdea = new Idea(randID, $inputTitle.val(), $inputBody.val(), 'Swill');
  var existingIdeas = parsedIdeas();
  existingIdeas.push(newIdea);
  localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  renderIdea(newIdea.id, newIdea.title, newIdea.body, 'Swill');
};

function Idea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
};