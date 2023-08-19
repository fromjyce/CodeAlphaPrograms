var currentPage = 1;
var surveyData = {};

function saveDataAndMoveNext(pageNumber) {
  var questions = document.querySelectorAll(
    "#page" + pageNumber + " .question input"
  );
  var allFieldsFilled = true;
  var emailFormatValid = true;

  questions.forEach(function (question, index) {
    if (question.value.trim() === "") {
      allFieldsFilled = false;
    }

    if (
      question.getAttribute("type") === "email" &&
      !validateEmail(question.value)
    ) {
      emailFormatValid = false;
    }
  });

  if (!allFieldsFilled) {
    alert("Please fill in all fields before proceeding.");
  } else if (!emailFormatValid) {
    alert("Please enter a valid email address.");
  } else {
    surveyData["page" + pageNumber] = {};
    questions.forEach(function (question, index) {
      surveyData["page" + pageNumber]["question" + (index + 1)] =
        question.value;
    });
    localStorage.setItem("surveyData", JSON.stringify(surveyData));
    currentPage++;
    showPage(currentPage);
  }
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function moveToPreviousPage() {
  currentPage--;
  showPage();
}

function showPage() {
  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }

  if (currentPage < pages.length && currentPage >= 1) {
    document.getElementById("page" + currentPage).style.display = "block";
    var inputElement = document.getElementById("question" + currentPage);
    if (surveyData["page" + currentPage]) {
      inputElement.value = surveyData["page" + currentPage];
    } else {
      inputElement.value = "";
    }
  }
  if (currentPage === 3)
    [(document.getElementById("page3").style.display = "block")];
}

function submitSurvey() {
  var email = surveyData.page1.question2;
  var surveyDataString = JSON.stringify(surveyData);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "send_email.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert("Survey responses sent to your email!");
    }
  };
  var formData = "email=" + email + "&surveyData=" + surveyDataString;
  xhr.send(formData);
}


function submitandsave(pgnum) {
    saveDataAndMoveNext(pgnum);
    submitSurvey();
}
