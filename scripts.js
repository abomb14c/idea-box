var $inputTitle = $("#input-title");
var $inputBody = $("#input-body");

$("#button-save").on("click", buttonSave);

onLoad()

function onLoad() {
  setStorage();
  populateDOM();  
};


function setStorage() {
  if (localStorage.getItem("ideas") === null) {
    localStorage.setItem("ideas", ("[]"));
  };
  console.log(localStorage);
};

function populateDOM() {
  console.log("populate");
  getIdeas().forEach(function (idea) {
    makeIdeaCard(idea.id, idea.title, idea.body, idea.quality);
    console.log(idea);
  });
};

function buttonSave(e) {
  e.preventDefault();
  var newIdea = new Idea(idGenerator(), getTitleInput(), getBodyInput(), 'Swill');
  console.log(newIdea);
  var existingIdeas = getIdeas();
  console.log(existingIdeas);
  existingIdeas.push(newIdea);
  console.log(existingIdeas);
  localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  console.log(localStorage);
  makeIdeaCard(newIdea.id, newIdea.title, newIdea.body, 'Swill');
};

function Idea(id, title, body, quality) {
  this.id = parseInt(id);
  this.title = title;
  this.body = body;
  this.quality = quality;
};

function getIdeas() {
  return JSON.parse(localStorage.getItem("ideas"));
};

function idGenerator() {
  return Date.now().toString();
};

function getTitleInput() {
  var ideaTitle = $inputTitle.val();
  return ideaTitle;
};

function getBodyInput() {
  var inputBody = $inputBody.val();
  return inputBody;
};

function makeIdeaCard(id, title, body, quality) {
  $('#bottom-section').prepend(`
    <article id="` + id + `" class="idea">
      <h1 id="idea-title" contenteditable="true">` + title + `</h1>
      <button id="delete-idea"></button>
      <p id="idea-text" contenteditable="true">` + body + `</p>
      <button id="upvote-idea"></button>
      <button id="downvote-idea"></button>
      <p id= "quality ` + quality + `"><span>Quality:</span> <span class = "quality-in-DOM">` + quality + `</span> </p>
    </article>`);
};