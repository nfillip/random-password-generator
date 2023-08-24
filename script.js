// The button in HTML has an id="generate", so this variable is now tied to that button
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button action once clicked. When that button is clicked, the writePassword function is called.
generateBtn.addEventListener("click", writePassword);


//FUNCTION::: This function is collecting the prompt values and then calling to the generatePassword function with these prompt values as its arguments.
function writePassword() {
  var x = 1;
  
  var passwordLength1 = prompt(
    "Please enter the desired length of password between 8 and 128 characters",
    "a number 8 through 128"
  );
  var lowerCaseAllowed1 = prompt(
    "Include lowercase characters? (yes/no)",
    "yes/no"
  );
  var test = confirm("this is a test for true or false")
  console.log(test)
  var upperCaseAllowed1 = prompt(
    "Include uppercase characters? (yes/no)",
    "yes/no"
  );
  var digitsAllowed1 = prompt(
    "Include number characters?: 0-9 (yes/no)",
    "yes/no"
  );
  var symbolsAllowed1 = prompt(
    "Include symbols characters?: {}[]()/<>- (yes/no)",
    "yes/no"
  );

  if (!confirm("YOU CHOSE: [password-length: " + passwordLength1 + "] [lowerCase: " + lowerCaseAllowed1 + "] [uppercase: "+ upperCaseAllowed1 + "] [digits: " + digitsAllowed1 + "] [symbols: " + symbolsAllowed1 + "] ....is this what you want for you password criteria?")) {

    return; 
  }


  //Calling on the Generate Password function to output variable password for us.
  //We then will send this to HTML to display at the #password id.
  var password = generatePassword(
    passwordLength1,
    lowerCaseAllowed1,
    upperCaseAllowed1,
    digitsAllowed1,
    symbolsAllowed1
  );
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

//FUNCTION::: THIS FUNCTION WILL RETURN A RANDOM NUMBER FROM SPECIFIED PARAMS 
function generatePassword(
  passwordLength,
  lowerCaseAllowed,
  upperCaseAllowed,
  digitsAllowed,
  symbolsAllowed
) {
  var alphabetLower = "abcdefghijklmnopqrstuvwxyz";
  var alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var digits = "0123456789";
  var symbols = "{}[]()/<>-";

  //edge statement to ensure we are not out of range of password length
  //edge conditions to ensure we are typing yes or no
    // console.log(typeof(passwordLength));
  if (passwordLength % 1 !== 0) {
    return 'ERROR: YOU MUST TYPE A WHOLE NUMBER INTO PASSWORD LENGTH';
  } else if (passwordLength < 8 || passwordLength > 128) {
    return "PASSWORD LENGTH OUT OF SPECIFIED RANGE!";
  } else if (
    lowerCaseAllowed.toLowerCase() !== "yes" &&
    lowerCaseAllowed.toLowerCase() !== "no"
  ) {
    return 'ERROR: YOU NEED TO TYPE "yes" or "no" FOR YOUR LOWERCASE ANSWERS';
  } else if (
    upperCaseAllowed.toLowerCase() !== "yes" &&
    upperCaseAllowed.toLowerCase() !== "no"
  ) {
    return 'ERROR: YOU NEED TO TYPE "yes" or "no" FOR YOUR UPPERCASE ANSWERS';
  } else if (
    digitsAllowed.toLowerCase() !== "yes" &&
    digitsAllowed.toLowerCase() !== "no"
  ) {
    return 'ERROR: YOU NEED TO TYPE "yes" or "no" FOR YOUR DIGITS ANSWERS';
  } else if (
    symbolsAllowed.toLowerCase() !== "yes" &&
    symbolsAllowed.toLowerCase() !== "no"
  ) {
    return 'ERROR: YOU NEED TO TYPE "yes" or "no" FOR YOUR SYMBOLS ANSWERS';
  } else if (lowerCaseAllowed.concat(upperCaseAllowed.concat(digitsAllowed.concat(symbolsAllowed))).toLowerCase() === "nononono") {
    return 'ERROR: YOU MUST SAY YES TO SOMETHING';
  }

  //removing the type of character  if the user responds no to a questions
  if (lowerCaseAllowed.toLowerCase() === "no") {
    alphabetLower = "";
  }

  if (upperCaseAllowed.toLowerCase() === "no") {
    alphabetUpper = "";
  }
  if (digitsAllowed.toLowerCase() === "no") {
    digits = "";
  }
  if (symbolsAllowed.toLowerCase() === "no") {
    symbols = "";
  }

  //combining all the strings of character type that the user wanted
  var fullCharList = alphabetLower.concat(
    alphabetUpper.concat(digits.concat(symbols))
  );

  //initializing the password we will build and then iterating the number of time over a random index in the full character list
  //math.random() outputs 0-0.99999
  //math.floor() rounds to bottom value
  var randomPassword = "";
  for (var i = 0; i < passwordLength; i++) {
    var randomIndex = Math.floor(Math.random() * fullCharList.length);
    randomPassword = randomPassword.concat(fullCharList[randomIndex]);
  }
  return randomPassword;
}

//ASSERT EQUAL FUNCTION
function assertEquals(actual, expected, testName) {
  if (actual.length === expected.length) {
    return "passed";
  } else {
    return (
      testName + " FAILED: [expected:] " + expected + "but [actual]: " + actual
    );
  }
}

//test variables (I can only figure out how to test the length since its a random number generator)
var actualTest = generatePassword(10, "yes", "yes", "no", "no");
var expectedTest = "0123456789";

//calling the assert function
console.log(assertEquals(actualTest, expectedTest, "TestingPasswordLength"));
