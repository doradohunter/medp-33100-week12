document.addEventListener('DOMContentLoaded', ()=>{
    //add new employee
    const newEmployeeForm = document.querySelector('#new-employee')
    newEmployeeForm.addEventListener('submit', (e)=>{
        // e.preventDefault()
        
        const formData = new FormData(newEmployeeForm);

        const formDataObject = {
            name: formData.get('nameInput'),
            email: formData.get('emailInput'),
            depID: '674fd80015e85069e0fc65c3',
            titleID: '674fe912d32efb61cbeae35c'
        }

        fetch('/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })

    //edit employee
    const employees = document.querySelectorAll(".employee");
    employees.forEach(employee => {
        const editButton = employee.querySelector(".editButton");
        editButton.addEventListener('click', ()=>{
            const name = employee.querySelector(".name");
            const nameEdit = document.createElement('input');
            nameEdit.value = name.innerText;
            name.innerHTML="";
            name.appendChild(nameEdit);

            const email = employee.querySelector(".email");
            const emailEdit = document.createElement('input');
            emailEdit.value = email.innerText;
            email.innerHTML="";
            email.appendChild(emailEdit);

            const saveButton = document.createElement('button')
            saveButton.classList.add("saveButton");
            saveButton.innerText = "Save Changes"
            saveButton.addEventListener('click', ()=>{
                const updatedName = nameEdit.value;
                const updatedEmail = emailEdit.value;

                const updatedInfo = {
                    name: updatedName,
                    email: updatedEmail,
                    department: employee.querySelector('.department').getAttribute('depID'),
                    title: employee.querySelector('.title').getAttribute('titleID'),
                }

                updateEmployee(updatedInfo);
            })
            employee.appendChild(saveButton)
        });
    });

    async function updateEmployee(info) {
        fetch('')
    } 
})
