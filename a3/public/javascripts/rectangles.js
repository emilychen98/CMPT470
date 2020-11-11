// Add event listeners to all buttons
deleteButton = document.getElementsByClassName("deleteButton")
for (var i = 0 ; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click' , deleteRect , false ) ; 
}

deleteAllButton = document.getElementsByClassName("deleteAllButton")
deleteAllButton[0].addEventListener('click' , deleteAllRect , false ) ; 

updateButton = document.getElementsByClassName("updateButton")
for (var i = 0 ; i < deleteButton.length; i++) {
    updateButton[i].addEventListener('click' , updateRect , false ) ; 
}


function deleteRect(){
    // html ids start with letter 'b' but in sql, the ID is just the number. Remove the letter 'b'
    var sqlID = (this.id).substring(1); 
    console.log("sqlID: " + sqlID);
    
    axios({
        method: "POST",
        data: {
            id: sqlID
        },
        url: 'http://localhost:3000/deleteRectangle',
    }).then((res)=> {
        window.location.reload();
    })
    
}

function deleteAllRect(){
    console.log("INN");
    axios({
        method: "POST",
        data: {
        },
        url: 'http://localhost:3000/deleteAllRectangles',
    }).then((res)=> {
        window.location.reload();
    })
}

function updateRect(){
    // html ids start with letter 'b' but in sql, the ID is just the number. Remove the letter 'b'
    var id = (this.id).substring(1); 
    var width = this.parentNode.parentNode.cells[1].textContent;
    var height = this.parentNode.parentNode.cells[2].textContent;
    var color = this.parentNode.parentNode.cells[3].textContent;
    var bordercolor = this.parentNode.parentNode.cells[4].textContent;
    var opacity = this.parentNode.parentNode.cells[5].textContent;
    var pattern = this.parentNode.parentNode.cells[6].textContent;

    axios({
        method: "POST",
        data: {
            id: id,
            width: width,
            height: height,
            color: color,
            bordercolor: bordercolor,
            opacity: opacity,
            pattern: pattern,
        },
        url: 'http://localhost:3000/updateRectangle',
    }).then((res)=> {
        window.location.reload();
    })
}