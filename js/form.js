
  function FileOnChange(p) {
    var file = p[0]; // Get the first file from the input

    let imgRead = new FileReader(); // Create a FileReader to read the file data

    imgRead.onload = function (e) {
      // Set onload event to handle read completion
      var AllData = e.target.result; // Get the result
      var ImgData = AllData.split("base64,")[1]; // Extract base64 data from the Data URL
      document.getElementById("ImgData").value = ImgData; // Set the extracted base64 data to a hidden input
    };
    console.log("done");

    imgRead.readAsDataURL(file); // Read the file as Data URL
  }

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      var formData = new FormData();
      formData.append("name", document.getElementById("contactName").value);
      formData.append("class", document.getElementById("contactClass").value);
      formData.append(
        "personalNumber",
        document.getElementById("personalNumber").value
      );
      formData.append("parentName", document.getElementById("parentName").value);
      formData.append(
        "parentNumber",
        document.getElementById("parentNumber").value
      );
      formData.append("dob", document.getElementById("dob").value);

      var profileImage = document.getElementById("profileImage").files[0];
      if (profileImage) {
        var reader = new FileReader();
        reader.onloadend = function () {
          var base64Image = reader.result.split("base64,")[1]; // Get the base64 data
          formData.append("ImgData", base64Image); // Append image as base64 string

          sendFormData(formData); // Send the form data including the image
        };
        reader.readAsDataURL(profileImage); // Read the file as a data URL
      } else {
        sendFormData(formData); // Send form data without an image if not provided
      }
    });

  function sendFormData(formData) {
    fetch(
      "https://script.google.com/macros/s/AKfycbyAGKgbZkcz-LNcLedzZXWvN7xY_xh742g1L-qvXtFpfT5hJztyxw6ymG2YUBI6Jgs9/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.text())
      .then((data) => {
        // Custom SweetAlert after form submission success
        Swal.fire({
          icon: "success",
          title: "Form Submitted!",
          text: "Your form has been submitted successfully.",
          background: "#f0f8ff", // Light blue background color
          confirmButtonColor: "#4CAF50", // Green button
          confirmButtonText: "Submetted",
          padding: "", // Extra padding

          showClass: {
            popup: "animate__animated animate__fadeInDown" // Fade in animation
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp" // Fade out animation
          }
        });
      })
      .catch((error) => {
        // Custom SweetAlert for error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was an issue submitting your form. Please try again.",
          background: "#ffcccb", // Light red background color
          confirmButtonColor: "#FF5733", // Red button
          confirmButtonText: "Retry",
          padding: "",
          showClass: {
            popup: "animate__animated animate__shakeX" // Shake animation on error
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown"
          }
        });
      });
  }


