

let fetchData=async()=>{

let url="http://localhost:3000/car"
let res= await fetch(url,{method:"GET"})
let data=await res.json();
console.log(data);

let tabledata=document.querySelector("#display")
data.map((e)=>{

tabledata.innerHTML+=`

   <tr>
   
            <td>${e.name}</td>
            <td>${e.age}</td>
            <td>${e.number}</td>
            <td>${e.problem}</td>
            <td>${e.date}</td>
            <td>${e.price}</td>
            <td onclick="deleete('${e.id}')" id="del">Delete</td>
            <td onclick="updatee('${e.id}')" id="del">Edit</td>

 </tr>
`})
}

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
  
   
      <form id="js">
       <h5>Data <span id="updated">Updation </span> </h5>
       <br>
    <label for="upname">Enter Name:</label>
    <input type="text" id="upname" placeholder="Please Enter Your Name" value="${data.name}" required>

    <label for="upage">Enter Age:</label>
    <input type="text" id="upage" placeholder="Please Enter Your Age" value="${data.age}" required>

    <label for="upnumber">Enter Mobile Number:</label>
    <input type="text" id="upnumber" placeholder="Please Enter Your Mobile" value="${data.number}" required>

    <label for="updisease">Disease:</label>
    <select id="updisease" required>
        <option value="cold">Cold</option>
        <option value="cough">Cough</option>
        <option value="heart">Heart</option>
        <option value="cancer">Cancer</option>
        <option value="pain">Pain</option>
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

 


  let finalupdate=(id)=>{
    let inpname=document.querySelector("#upname").value;
    let inpage=document.querySelector("#upage").value;
    let inpnumber=document.querySelector("#upnumber").value;
    let inpdisease=document.querySelector("#updisease").value;
    let inpdate=document.querySelector("#upDate").value;
    let inpprice=document.querySelector("#upprice").value;

    let url = `http://localhost:3000/car/${id}`; 

    fetch(url,{
      method:"PUT",
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
    return false;

  }