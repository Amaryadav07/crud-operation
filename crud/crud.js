// Fetch data and populate the table
let fetchData = async () => {
  let url = "http://localhost:3000/car";
  let res = await fetch(url, { method: "GET" });
  let data = await res.json();
  console.log(data); 

  let tabledata = document.querySelector("#display");
  tabledata.innerHTML = ""; // Clear the table before adding new rows

  // Loop through data and add rows to the table
  data.forEach((e) => {
      tabledata.innerHTML += `
          <tr data-id="${e.id}">
              <td>${e.name}</td>
              <td>${e.age}</td>
              <td>${e.number}</td>
              <td>${e.problem}</td>
              <td>${e.date}</td>
              <td>${e.price}</td>
              <td onclick="deleete('${e.id}')" id="del">Delete</td>
              <td onclick="updatee('${e.id}')" id="del1">Edit</td>
          </tr>
      `;
  });
};

// Search functionality
let searchData = () => {
  let searchQuery = document.querySelector("#searchInput").value.toLowerCase();

  // Get all the rows of the table
  let tableRows = document.querySelectorAll("#display tr");

  // Loop through each row and filter based on name, id, or mobile
  tableRows.forEach(row => {
      let name = row.cells[0].textContent.toLowerCase();
      let id = row.getAttribute('data-id').toLowerCase();
      let mobile = row.cells[2].textContent.toLowerCase();

      // Check if the row matches the search query (name, id, or mobile)
      if (name.includes(searchQuery) || id.includes(searchQuery) || mobile.includes(searchQuery)) {
          row.style.display = ''; // Show the row
      } else {
          row.style.display = 'none'; // Hide the row
      }
  });
};

// Call fetchData when the page loads
window.onload = fetchData;


let deleete = (id) => {
  let url = `http://localhost:3000/car/${id}`;
  
 
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      
      fetch(url, {
        method: "DELETE",
      }).then(response => {
        if (response.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
           
            location.reload(); 
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the data.",
            icon: "error"
          });
        }
      });
    }
  });
};




  let insertt=()=>{

let inpname=document.querySelector("#inpname").value;
let inpage=document.querySelector("#inpage").value;
let inpnumber=document.querySelector("#inpnumber").value;
let inpdisease=document.querySelector("#inpdisease").value;
let inpdate=document.querySelector("#inpdate").value;
let inpprice=document.querySelector("#inpprice").value;

 if (inpname=="" ||inpage=="" ||inpnumber=="" || inpdisease=="" || inpdate=="" ||inpprice=="" ) {
  alert("Please Enter valid Data to Procced")
  return false;
 }
let url='http://localhost:3000/car'


fetch(url,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({

      name:inpname ,
      age:inpage ,
      number:inpnumber ,
      problem:inpdisease ,
      date:inpdate ,
      price: inpprice

  })
 
})

location.href="index.html"
return false;


  }


  let updatee=async(id)=>{

let url= `http://localhost:3000/car/${id}`;
let res=await fetch(url)
let data=await res.json()
 console.log(data);


 
let formdata=`
  
   
     <form id="js" data-aos="fade-down" data-aos-duration="3000" data-aos-delay="1000">
    <h5>Update <span id="updated">Here...</span> </h5>
    <br>
   
    <span class="close-btn" onclick="closeForm()">&times;</span>
    
    <label for="upname">Enter Name:</label>
    <input type="text" id="upname" placeholder="Please Enter Your Name" value="${data.name}" required>

    <label for="upage">Enter Age:</label>
    <input type="text" id="upage" placeholder="Please Enter Your Age" value="${data.age}" required>

    <label for="upnumber">Enter Mobile Number:</label>
    <input type="text" id="upnumber" placeholder="Please Enter Your Mobile" value="${data.number}" required>

    <label for="updisease">Disease:</label>
     <select id="updisease" required>
        <option value="cold" ${data.problem === "cold" ? "selected" : ""}>Cold</option>
        <option value="cough" ${data.problem === "cough" ? "selected" : ""}>Cough</option>
        <option value="heart" ${data.problem === "heart" ? "selected" : ""}>Heart</option>
        <option value="cancer" ${data.problem === "cancer" ? "selected" : ""}>Cancer</option>
        <option value="pain" ${data.problem === "pain" ? "selected" : ""}>Pain</option>
    </select>

    <label for="upDate">Enter Date:</label>
    <input type="date" id="upDate" value="${data.date}" required>

    <label for="upprice">Enter Price:</label>
    <input type="text" id="upprice" value="${data.price}" placeholder="Rs-750" required>

    <input type="submit" value="Update" onclick="return finalupdate('${data.id}')">
</form>




`

document.querySelector("#updateform").innerHTML=formdata



  }

 // Function to close the form
function closeForm() {
  const form = document.getElementById("js");
  form.classList.add("hidden");  // Hide the form by adding a class
}


  let finalupdate = (id) => {
    // Fetching values from the form
    let inpname = document.querySelector("#upname").value;
    let inpage = document.querySelector("#upage").value;
    let inpnumber = document.querySelector("#upnumber").value;
    let inpdisease = document.querySelector("#updisease").value;
    let inpdate = document.querySelector("#upDate").value;
    let inpprice = document.querySelector("#upprice").value;

    // Show confirmation popup before updating data
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        // If the user confirms, send the PUT request to update the data
        if (result.isConfirmed) {
            // URL for the PUT request
            let url = `http://localhost:3000/car/${id}`;

            // Sending PUT request to update data
            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: inpname,
                    age: inpage,
                    number: inpnumber,
                    problem: inpdisease,
                    date: inpdate,
                    price: inpprice
                })
            })
            .then(response => {
                if (response.ok) {
                    // Success message if data is updated
                    Swal.fire("Saved!", "Your changes have been saved.", "success");
                    location.reload(); // Reload the page to reflect changes
                } else {
                    // Error handling if update failed
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue saving the data.",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                // Handle fetch errors (like network issues)
                Swal.fire({
                    title: "Network Error!",
                    text: "Failed to update the data. Please try again.",
                    icon: "error"
                });
            });
        } else if (result.isDenied) {
            // If the user chooses not to save changes
            Swal.fire("Changes are not saved", "", "info");
        }
    });

    return false; // Prevent default form submission
};

