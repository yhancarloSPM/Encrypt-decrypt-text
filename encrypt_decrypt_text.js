var inputText = document.getElementById("encrypt-text");
var outputText = document.getElementById("decrypt-text");

var buttonEncrypt = document.getElementById("button-encrypt");
var buttonDecrypt = document.getElementById("button-decrypt");
var buttonCopy = document.getElementById("button-copy");
var buttonClear = document.getElementById("button-clear");

var noFoundText = document.getElementById("noFound-text");

window.addEventListener("load", function () {
  noFoundText.style.display = "block";
  buttonCopy.style.display = "none";
});

const vowel_encrypt = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const vowel_decrypt = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

let isEncriptOption = false;

const encryptText = (inputstring) => {
  let encriptString = "";
  isEncriptOption = true;

  if (validateEmptyInputText(inputstring, isEncriptOption)) {
    return;
  }

  if (validateInputText(inputstring) != "") {
    return;
  }

  for (const element of inputstring) {
    encriptString += vowel_encrypt[element] || element;
  }
  outputText.value = encriptString;
  showNoFoundTextOption();
};

const decryptText = (inputString) => {
  let decryptString = inputString;
  isEncriptOption = false;

  if (validateEmptyInputText(inputString, isEncriptOption)) {
    return;
  }

  if (validateInputText(inputString) != "") {
    return;
  }

  for (const [key, value] of Object.entries(vowel_decrypt)) {
    decryptString = decryptString.replaceAll(key, value);
  }
  outputText.value = decryptString;
  showNoFoundTextOption();
};

const copyToClipboard = () => {
  navigator.clipboard
    .writeText(outputText.value)
    .then(() => (inputText.value = outputText.value))
    .catch((err) => console.error("Error copying to clipboard. ", err));
};

const showNoFoundTextOption = () => {
  if (inputText.value.length === 0) {
    outputText.value = "";
  }

  noFoundText.style.display = outputText.value.length === 0 ? "block" : "none";
  buttonCopy.style.display = outputText.value.length === 0 ? "none" : "block";
};

const clearText = (inputString) => {
  if (inputString.length == 0) {
    inputString = "There is no text to clear.";
    callModal(inputString);
    return;
  }

  inputText.value = "";
  outputText.value = "";

  showNoFoundTextOption();
};

const validateInputText = (inputstring) => {
  const hasUpperCase = /[A-Z]/.test(inputstring);
  const hasAccent = /[áéíóú]/.test(inputstring);

  let message = "";

  if (hasUpperCase) {
    message =
      "The text to be encrypted/decrypted cannot have uppercase letters.";
  }

  if (hasAccent) {
    message = "Text to be encrypted/decrypted cannot have accented letters.";
  }
  return callModal(message);
};

const validateEmptyInputText = (inputText) => {
  let message = "";

  if (inputText.length == 0 && isEncriptOption == true) {
    message = "You must enter a text to encrypt.";
  } else if (inputText.length == 0 && isEncriptOption == false) {
    message = "You must enter a text to decrypt.";
  }
  return callModal(message);
};

const callModal = (message) => {
  if (message != "") {
    document.getElementById("validationMessage").innerHTML = message;
    $("#validationModal").modal("show");
  }
  return message;
};

inputText.addEventListener("keyup", () => showNoFoundTextOption());
buttonEncrypt.addEventListener("click", () => encryptText(inputText.value));
buttonDecrypt.addEventListener("click", () => decryptText(inputText.value));
buttonClear.addEventListener("click", () => clearText(inputText.value));
buttonCopy.addEventListener("click", () => copyToClipboard());
