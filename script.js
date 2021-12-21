moment().format();

async function GetUsers() {    
    const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    if (response.ok === true) {        
        const users = await response.json();
        let rows = document.querySelector("tbody"); 
        users.forEach(user => {            
            rows.append(row(user));
        });
    }
}

function row(user) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

// reservation id
    const idTd = document.createElement("td");
    idTd.append(user.id);    
    tr.append(idTd);

// user id
    const userIdTd = document.createElement("td");
    userIdTd.append(user.user_id);
    tr.append(userIdTd);

// start time in HH: MM format
    const startTimeTd = document.createElement("td");
    let newDate = moment.unix(user.date).format("HH/mm");        
    startTimeTd.append(newDate);
    tr.append(startTimeTd);

//duration in minutes
    const durationTd = document.createElement("td");
    let durationTime = parseFloat((user.end_time - user.start_time) / 60)    
    durationTd.append(durationTime);
    tr.append(durationTd);

 // name of the amenity object
    const amenityIdTd = document.createElement("td");    
    amenityIdTd.append(user.amenity_id);
    tr.append(amenityIdTd);
    
    const linksTd = document.createElement("td");

    tr.appendChild(linksTd);

    return tr;
}

GetUsers();

