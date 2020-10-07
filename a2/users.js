function addEntry() {
    if (!validate()) return;
    
    var table = document.getElementById("user-table");
    
    // Create an empty <tr> element and add to last position of the table
    var row = table.insertRow(-1);

    // Create <td> elements
    var name = row.insertCell(0);
    var email = row.insertCell(1);
    var birthday = row.insertCell(2);
    var age = row.insertCell(3);

    // Grab inputs from form and populate cells
    name.innerHTML = document.getElementById("exampleFormControlInput1").value;
    email.innerHTML = document.getElementById("exampleInputEmail1").value;
    bday = document.getElementById("exampleFormControlInput2").value;
    console.log(typeof(bday));
    birthday.innerHTML = bday;
    age.innerHTML = calcAge(bday).toString();

    document.getElementById("form").reset();
}

function calcAge(bday){
    var date = new Date();
    var birthday = new Date(bday);
    var age = date.getFullYear()- birthday.getFullYear();

    if (birthday.getMonth() > date.getMonth()) {
        --age;
    } else if (birthday.getMonth() == date.getMonth()){
        // +1 for birthday due to timezone difference
        if ( (birthday.getDate()+1) > date.getDate()){
            --age; 
        }
    }
    return age;
}

function onSortName(){
    let sortButton = document.getElementById("sort-button-img1");
    if (sortButton.getAttribute("src") == "./img/sort-ascending-2x.png"){
        sortButton.setAttribute("src","./img/sort-descending-2x.png");
    } else {
        sortButton.setAttribute("src","./img/sort-ascending-2x.png");
    }

    document.querySelector("tbody")
}

function onSortEmail(){
    let sortButton = document.getElementById("sort-button-img2");
    if (sortButton.getAttribute("src") == "./img/sort-ascending-2x.png"){
        sortButton.setAttribute("src","./img/sort-descending-2x.png");
    } else {
        sortButton.setAttribute("src","./img/sort-ascending-2x.png");
    }
}

function onSortBirthday(){
    let sortButton = document.getElementById("sort-button-img3");
    if (sortButton.getAttribute("src") == "./img/sort-ascending-2x.png"){
        sortButton.setAttribute("src","./img/sort-descending-2x.png");
    } else {
        sortButton.setAttribute("src","./img/sort-ascending-2x.png");
    }
}

function removeRow(){
    console.log("hi");
}

function validate() {
    var validate = true;
    // Validation
    if (document.getElementById("exampleFormControlInput1").value == ''){
        document.getElementById("exampleFormControlInput1").style.borderColor="red";
        validate = false;
    } else {
        document.getElementById("exampleFormControlInput1").style.border="1px solid #ced4da";
        document.getElementById("exampleFormControlInput1").style.borderRadius=".25rem";
    }

    if (document.getElementById("exampleInputEmail1").value == ''){
        document.getElementById("exampleInputEmail1").style.borderColor = "red";
        validate = false;
    } else {
        document.getElementById("exampleInputEmail1").style.border="1px solid #ced4da";
        document.getElementById("exampleInputEmail1").style.borderRadius=".25rem";
    }

    if (document.getElementById("exampleFormControlInput2").value == ''){
        document.getElementById("exampleFormControlInput2").style.borderColor="red";
        validate = false;
    } else {
        document.getElementById("exampleFormControlInput2").style.border="1px solid #ced4da";
        document.getElementById("exampleFormControlInput2").style.borderRadius=".25rem";
    }
    return validate;
}
