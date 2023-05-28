function validateForm() {
  var first_name = document.forms["contact-form"]["name"].value;
  var surname = document.forms["contact-form"]["surname"].value;
  var email = document.forms["contact-form"]["email"].value;
  if (first_name == "") {
      alert("Please enter your first name");
      return false;
  } else if (surname == "") {
      alert("Please enter your surname");
      return false;
  } else if (email == "") {
      alert("Please enter your email address");
      return false;
  }

  alert("Thank you " + first_name + ". We will reply tou your message soon");
}
