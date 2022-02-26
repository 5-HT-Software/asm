let createPasswordButton = document.querySelector("#createPasswordButton")

createPasswordButton.onclick = (e) => {
    const passportInput = document.querySelector("#passwordInput")
    const passwordConfirmInput = document.querySelector("#passwordConfirmInput")
    console.log(passportInput.value, passwordConfirmInput.value)
    if (passportInput.value == "" || passportInput.value == "") {
        toastr.warning('Please enter password', 'Warning!')
    } else {
        if (passportInput.value == passwordConfirmInput.value) {
            let data = {
                _id: e.target.dataset.userId,
                token: e.target.dataset.token,
                password: passportInput.value
            }
            console.log("data", data)
            const xhr = new XMLHttpRequest()
            xhr.open("POST", "/recover-password", true)
            xhr.responseType = "json"
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onload = () => {
                if (!xhr.response.error) {
                    window.location.href = `/login`
                }
                else {
                    console.log(xhr.response.error)
                    toastr.error('There is a failed please try later again.', 'Error!')
                }
            }
            xhr.send(JSON.stringify(data))
        }
        else {
            toastr.warning('Passwords not same', 'Warning!')
        }
    }
}