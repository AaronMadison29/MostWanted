/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      mainMenu(searchByName(people), people);
      break;
    case 'no':
      
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
<<<<<<< HEAD
      // TODO: get person's info
=======
      displayPerson(person);
<<<<<<< HEAD
      //Seems too easy?
=======
      //Seem too easy
>>>>>>> aff0d472dd4536435efef18a314f9bb073e2d4e1
>>>>>>> 840d83218bc6dff1f5448b1231014a09007cb157
      break;
    case "family":
      displayFamily(person);
      break;
    case "descendants":
      // TODO: get person's descendants
      //Need to use recursion for this function
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
  });

  // TODO: What to do with filteredPeople?
  return filteredPeople;

}

function promptForCriterionChoice(people)
{
  var searchType = promptFor("Do you want to search based on one or many criterion? Enter 'one' or 'many'", oneMany).toLowerCase();
  switch(searchType){
    case 'one':
      
      break;
    case 'many':
      
      break;
    default:
      app(people); // restart app
    break;
  }
}

function promptForOneCriterion()
{
  return promptFor("Which criterion would you like to search by? You can enter: 'First Name', 'Last Name', 'Date of Birth', 'Height', 'Weight', 'Eye Color', or 'Occupation'", singleCriterion).toLowerCase();
}

function peopleMatchingCriterion(people, criterion)
{
  alert(people.map(function(person){
    
  }).join("\n"));
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
<<<<<<< HEAD
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyecolor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
=======
  // TODO: finish getting the rest of the information to display
>>>>>>> 840d83218bc6dff1f5448b1231014a09007cb157
  alert(personInfo);
}

function displayFamily(person){
  spouse = getSpouse(person);
  parents = getParents(person);
  //Check to make sure this is going to work
  var personsFamily = "Spouse: " + spouse + "\n";
  personsFamily += "Parents: " + parents + "\n";

  return personsFamily;
}

function getSpouse(person){
  let spouse = people.filter(function(el) {
    if(el.id === person.spouse) {
      return el;
      //I think that's right now
    }
  })
}

function getParents(person){
  let parents = people.filter(function(el) {
    //map that returns all in array
    //var parentMultiple;
      if (person.parents.some(x => x === el.id)) {
        return el.firstName + " " + el.lastName + ", ";
        //Not sure if I want that comma there
    }
    //return parentMultiple;
  })
  return parents;
  //Is this in the right spot? Want to make sure it's going to return only after going through all
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function oneMany(input){
  return input.toLowerCase() == "one" || input.toLowerCase() == "many";
}
function singleCriterion(input){
  switch(input)
  {
    case "First Name":
      return "firstName";
    case "Last Name":
      
  }
}