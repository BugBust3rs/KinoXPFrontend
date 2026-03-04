const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

// This object simulates what you would send to backend
let imageObject = {};

imageInput.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {
    const base64String = reader.result; // This is the Base64 string

    // Save into object
    imageObject = {
      name: file.name,
      type: file.type,
      size: file.size,
      base64: base64String
    };

    console.log("Saved object:", imageObject);

    // Example: Save locally (simulating backend storage)
    localStorage.setItem("savedImage", JSON.stringify(imageObject));

    // Show preview
    preview.src = base64String;
  };

  reader.readAsDataURL(file); // Converts to Base64
});