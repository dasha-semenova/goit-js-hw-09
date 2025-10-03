const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

let formData = {
  email: "",
  message: "",
}

// Данные из localStorage
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    if (formData.email) form.elements.email.value = formData.email;
    if (formData.message) form.elements.message.value = formData.message;
  } catch (err) {
    console.error("Error parsing saved data", err);
  }
}

// Слушатель input
form.addEventListener("input", (evt) => {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Слушатель submit
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log("Submitted data:", formData);

  // Очистка
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});
