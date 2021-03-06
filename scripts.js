var $inputTitle = $("#input-title");
var $inputBody = $("#input-body");

$("#button-save").on("click", buttonSave);
$("#bottom-section").on("click", "#delete-idea", deleteButton);
$("#bottom-section").on("click", "#upvote-idea", upVote);
$("#bottom-section").on("click", "#downvote-idea", downVote);
$("#bottom-section").on("keyup", ".key-up", updateStorage);
$("#bottom-section").on("keyup", ".key-up", enterKey);
$("#search-field").on("keyup", search);

loadIdeas()

function loadIdeas() {
  if (localStorage.getItem("ideas") === null) {
    localStorage.setItem("ideas", "[]");
  } else {
    parsedIdeas().forEach(function (idea) {
      renderIdea(idea.id, idea.title, idea.body, idea.quality, idea.count);
    });
  };
}

function parsedIdeas() {
  return JSON.parse(localStorage.getItem("ideas"));
};

function renderIdea(id, title, body, quality) {
  $('#idea-card-area').prepend(`
    <article class="idea" id="${id}">
    <textarea class="idea-title key-up" id="idea-title" contenteditable="true">${title}</textarea>
    <button class="idea-button delete-idea" id="delete-idea"></button>
    <textarea class="idea-text key-up" id="idea-text" contenteditable="true">${body}</textarea>
      <button class="idea-button upvote-idea" id="upvote-idea"></button>
      <button class="idea-button downvote-idea" id="downvote-idea"></button>
      <h5 class= "quality">
        <span>quality:</span>
        <span id="span-quality">${quality}</span>
      </h5>
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
  renderIdea(newIdea.id, newIdea.title, newIdea.body, newIdea.quality);
};

function Idea(id, title, body, quality, count) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.count = count || 0;
};

function deleteButton() {
  deleteHTML();
  deleteLocalStorage();
}

function deleteHTML() {
  $(event.target).closest("article").remove();
}

function deleteLocalStorage() {
  var existingIdeas = parsedIdeas();
  var ideaID = ($(event.target).closest('article').attr("id"));
  existingIdeas.forEach(function (idea, index) {
    if (idea.id == ideaID) {
      existingIdeas.splice(index, 1);
    }
  })
  localStorage.setItem('ideas', JSON.stringify(existingIdeas));
}

var arrayQuality = ["Swill", "Plausible", "Genius"];

function upVote() {
  var article = $(this).closest("article");
  var existingIdeas = parsedIdeas();
  var ideaID = parseInt($(event.target).closest('article').attr("id"));
  existingIdeas.forEach(function (idea, index) {
    if (idea.id == ideaID) {
      if (idea.count < 2) {
        idea.count++
        idea.quality = arrayQuality[idea.count];
        article.find("#span-quality").text(arrayQuality[idea.count])
      }
    }
    localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  })
}

function downVote() {
  var article = $(this).closest("article");
  var existingIdeas = parsedIdeas();
  var ideaID = parseInt($(event.target).closest('article').attr("id"));

  existingIdeas.forEach(function (idea, index) {
    if (idea.id == ideaID) {
      if (idea.count > 0) {
        idea.count--
          existingIdeas[index].quality = arrayQuality[idea.count];
        article.find("#span-quality").text(arrayQuality[idea.count])
      }
    }
    localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  })
}

function updateStorage() {
  var article = $(event.target).closest("article");
  var ideaID = article.attr('id')
  var ideaTitle = article.find("#idea-title").val();
  var ideaBody = article.find("#idea-text").val();
  var existingIdeas = parsedIdeas();

  existingIdeas.forEach(function (idea, index) {

    if (idea.id == ideaID) {
      idea.title = ideaTitle;
      idea.body = ideaBody;
    }
    localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  })
}

function enterKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}

function search() {
  var searchValue = $("#search-field").val().toLowerCase();
  $(".idea-title").each(function () {
    var ideaTitles = $(this).text().toLowerCase();
    if (ideaTitles.indexOf(searchValue) != -1) {
      $(this).parent().show();
    } else {
      $(this).parent().hide();
    }
  });
}