const passwordResetModal = document.querySelector("#passwordResetModal")
const passwordResetButtons = document.querySelectorAll("button[data-password-reset-email]")

console.log("passwordResetButtons", passwordResetButtons)

passwordResetButtons.forEach(p => {
    p.onclick = () => {
        let IdInput = passwordResetModal.querySelector("#_id")
        IdInput.value = p.dataset.passwordResetEmail
        $('#passwordResetModal').modal('show')
    }
})