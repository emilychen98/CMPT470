// Add event listeners to all delete buttons
deleteButton = document.getElementsByClassName("deleteButton")
for (var i = 0 ; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click' , deleteRect , false ) ; 
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