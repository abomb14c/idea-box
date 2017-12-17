var $inputTitle = $("#input-title");

$("#button-save").on("click", buttonSave);

setStorage();

function setStorage() {
  if (localStorage.length === 0) {
    localStorage.setItem("ideas", ("[]"));
  };
  console.log(localStorage);
};

function buttonSave(e) {
  e.preventDefault();
  var newIdea = $inputTitle.val();
  console.log(newIdea);
  var existingIdeas = JSON.parse(localStorage.getItem("ideas"));
  console.log(existingIdeas);
  existingIdeas.push(newIdea);
  console.log(existingIdeas);
  localStorage.setItem('ideas', JSON.stringify(existingIdeas));
  console.log(localStorage);
};