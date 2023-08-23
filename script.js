// Assignment Code
var generateBtn = document.querySelector("#generate");


// Add event listener to generate button action once clicked. 
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
//Thsi function is collecting the prompt values and then calling to the generatePassword function with these prompt values as its arguments. 
function writePassword() {
  let passwordLength1 = prompt("Please enter the desired length of password between 8 and 128 characters" , "8-128");
  let lowerCaseAllowed1 = prompt("Include lowercase characters? (yes/no)" , "yes/no");
  let upperCaseAllowed1 = prompt("Include uppercase characters? (yes/no)", "yes/no");
  let digitsAllowed1 = prompt("Include number characters?: 0-9 (yes/no)", "yes/no");
  let symbolsAllowed1 = prompt("Include symbols characters?: {}[]()/<>- (yes/no)", "yes/no");
   
  //Calling on the Generate Password function to output variable password for us.
  //We then will send this to HTML to display at the #password id. 
  var password = generatePassword(passwordLength1, lowerCaseAllowed1,upperCaseAllowed1,digitsAllowed1,symbolsAllowed1);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

  
}




//This function will return a random number from the specified parameters above
function generatePassword(passwordLength, lowerCaseAllowed,upperCaseAllowed,digitsAllowed,symbolsAllowed) {
  var alphabetLower = "abcdefghijklmnopqrstuvwxyz"
  var alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var digits = "0123456789"
  var symbols = "{}[]()/<>-";
  
  //edge statement to ensure we are not out of range of password length
  if (passwordLength<8 || passwordLength>128) {
    return "PASSWORD LENGTH OUT OF SPECIFIED RANGE!";
  }
  //edge conditions to ensure we are typing yes or no
  if ((lowerCaseAllowed.toLowerCase() ||upperCaseAllowed.toLowerCase() ||digitsAllowed.toLowerCase() ||symbolsAllowed.toLowerCase) !== ("yes" || "no")) {
      return "ERROR: YOU NEED TO TYPE \"yes\" or \"no\" FOR YOUR ANSWERS"
  }
  
  //removing the type of character  if the user responds no to a questions
  if (lowerCaseAllowed.toLowerCase() === "no"){
    alphabetLower = "";
  }

  if (upperCaseAllowed.toLowerCase() === "no") {
    alphabetUpper = "";
  }
  if (digitsAllowed.toLowerCase() === "no") {
    digits = "";
  }
  if (symbolsAllowed.toLowerCase() === "no")  {
    symbols = "";
  }
  
  //combining all the strings of character type that the user wanted
  var fullCharList = alphabetLower.concat(alphabetUpper.concat(digits.concat(symbols)));

  //initializing the password we will build and then iterating the number of time over a random index in the full character list
  //math.random() outputs 0-0.99999
  //math.floor() rounds to bottom value
  var randomPassword = "";
    for (var i = 0 ; i<passwordLength; i++) {
      var randomIndex = Math.floor(Math.random() * (fullCharList.length)); 
      randomPassword = randomPassword.concat(fullCharList[randomIndex]);
  }
  return randomPassword;

}


//ASSERT EQUAL FUNCTION
function assertEquals(actual, expected, testName) {
  if (actual.length === expected.length) {
    return "passed"
  } else {
      return testName + " FAILED: [expected:] " + expected + "but [actual]: " + actual;
    }
  }

  //test variables (I can only figure out how to test the length since its a random number generator)
  var actualTest = generatePassword(10, "yes", "yes", "no", "no");
  var expectedTest = "0123456789"

  //calling the assert function
  console.log(assertEquals(actualTest, expectedTest, "TestingPasswordLength"));