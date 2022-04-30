// Method to send data to local storage each time user fills the form and press the add btn
fetchIssues();

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);   // saveIssue method mein parenthesis q ni h?

function saveIssue(e){   // e for event being passed as a parameter
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedToc= document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();    //this js library which returns global unique identifier(GUID)
    var issueStatus = 'Open';

    // combining above 5 prooperties to make an single object
    var issue = {
        id : issueId,
        description : issueDesc,
        severity : issueSeverity,
        assignedTo : issueAssignedToc,
        status : issueStatus
    }

    // now we need to push this issue object to our local storage #save!!
    if(localStorage.getItem('issues') == null){    //if localStorage is empty
        var issues = [];  //initialising an empty array
        issues.push(issue);  //adding our issue object to the issues array

        // sending it back to local storage
        localStorage.setItem('issues', JSON.stringify(issues));
    }else{
        var issues = JSON.parse(localStorage.getItem('issues'));  //retriving the already stored issues in localstorage

        issues.push(issue);  //case where there are already some entries in the local storage we are retrieving the issueList and extending it by adding one more new issue
        // Now sending it back to the local storage
        localStorage.setItem('issues', JSON.stringify(issues));     //here we are having key = 'issues' whose value is being set JSON.stringify(issues)
    }

    // reset once form is submitted once
    document.getElementById('issueInputForm').reset();

    // calling the fetchIssue fxn again
    fetchIssues();  //bcoz when everytime a new item is added adn included in the issueslist  in the output

    // e.preventDefault();  // to prevent the form from submitting
}

function setStatusClosed(id){
    // step1: fetch the data from local storage
    var issues = JSON.parse(localStorage.getItem('issues'));   //parse method returns array containing value mapped to the key passed

    // Step2: find the issue with req id to be modified
    for(var i=0; i< issues.length; i++){
        if(issues[i].id == id){
            issues[i].status = 'Closed';  //updating the status to close
        }
    }

    // Step3 : save the changes back to local storage
    localStorage.setItem('issues', JSON.stringify(issues));

    // Calling fetchIssues again so as to show the updated output
    fetchIssues();
}


// delete the issue whose id is being passed as parameter
function deleteIssue(id){
    // Step1. retrieve evrything from local storage
    var issues = JSON.parse(localStorage.getItem('issues'));

    // Step2. find the desired issue to be deleted
    for(var i=0; i<issues.length; i++){
        if(issues[i].id == id){
            // delete that object/entry
            issues.splice(i, 1);   //using the splice method of Array to remove one(1) element from index number(i) in the issue array
        }
    }

    // Step3. save the changes in the local storage
    localStorage.setItem('issues', JSON.stringify(issues));

    // Step4. calling the fetch issues fxn to display the saved changes in the screen
    fetchIssues();
}



// to fetch already saved Isssues from the local storage
function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    // var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for(var i =0; i< issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">' +
                                '<h6>Issue ID: ' + id + '</h6>' +
                                '<p><span class="label label-info">' + status + '</span></p>' +
                                '<h3>' + desc + '</h3>' +
                                '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
                                '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
                                '<a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> ' +
                                '<a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                '</div>';
    }
}



// Learning Outcome
/*
1. key is passed in inverted commas like 'issues'
2. different methods of JSON like parse(), stringify()
3. different methods of localStorage like setItem(), getItem()... they need key and the value mapped with this key is being returned
4. How can we make object in JS

*/