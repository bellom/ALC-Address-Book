window.onload = function () {
    const addBtn = document.getElementById("addBtn");
    const editBtn = document.getElementById("editBtn");
    const delBtn = document.getElementById("delBtn");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");

    let contacts = document.querySelector(".contacts");
    const contactDisplay = document.querySelector(".contactDisplay");
    let selectedid = null;
    let iseditmode = false;

    contacts = [
        {
            name:"Jeremiah",        
            email:"jerryme@gmail.com",
            tel:"08189710479"
        },
        {
            name:"Bellom",
            email:"bellomsean@mail.com",
            tel:"08167825737"
        }
    ];

    function jsonStructure(name, email, tel) {
        this.name = name;
        this.email = email;
        this.tel = tel;
    }

    addBtn.addEventListener("click", function () {
        let newObj = new jsonStructure(name.value, email.value, tel.value);
        if (iseditmode && selectedid){
          // Remove old data
          contacts.splice(selectedid, 1);
          iseditmode = false;
        }
        contacts.push(newObj);
        localStorage['contactBook'] = JSON.stringify(contacts);
        clearForm();
        addBtn.value = "Add";

    })
    
    

    function clearForm() {
        let myForm = document.querySelectorAll(".formFields");
        for (let i in myForm) {
            myForm[i].value = '';
        }
    }

    function showContacts() {
        if (localStorage['contactBook'] === undefined) {
            localStorage['contactBook'] = "[]";
        } else {
            contacts = JSON.parse(localStorage['contactBook']);
            for (let n in contacts) {
                var str = '<button class="accordion">' + contacts[n].name + '</button>' + '<div class="panel"><p><strong>Email Address : </strong>' + contacts[n].email + '</p><p><strong>Phone Number : </strong>' + contacts[n].tel + ' </p><div class="del go-right"><a href="#" class="button delBtn" data-id="' + n + '">Delete</a></div><div class="go-right"><a href="#" class="button editBtn" data-id="' + n + '">Edit</a></div></div>';
                contactDisplay.innerHTML += str;
            }
        }
    }
    showContacts();
    
    function CloseInput() {
     document.getElementById('spoiler').style.display = 'none';
    }

    contactDisplay.addEventListener("click", function (e) {
      if(e.target.classList.contains("delBtn")){
          var chosen = e.target.getAttribute("data-id");
          contacts.splice(chosen, 1);
          localStorage['contactBook'] = JSON.stringify(contacts);
          // showContacts();
          alert("Reload the webpage to see changes.");
      }
      if(e.target.classList.contains("editBtn")){
          iseditmode = true;
          addBtn.value = "Save";
        // Get all fields in new form
        selectedid = e.target.getAttribute("data-id");
        // Assign values to edit form
        name.value = contacts[selectedid].name;
        email.value = contacts[selectedid].email;
        tel.value = contacts[selectedid].tel;
      }
    });

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle "active" class */
            this.classList.toggle("active");

            /* Toggle hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}
