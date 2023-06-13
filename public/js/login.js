function submitForm(event) {
  // Prevent the default action from happening.
  event.preventDefault();

  // Get the form data.
  var formData = new FormData(document.getElementById("myForm"));

  // Submit the form data to the server.
  $.ajax({
    url: "/users",
    type: "POST",
    data: formData,
    success: function(response) {
      // Do something with the response.
    },
    error: function(error) {
      // Handle the error.
    }
  });
}

// Bind the submit event to the submit button.
document.getElementById("submitButton").addEventListener("click", submitForm);