

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
  alert("Please Enter valid Data to Proced")
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