let editors = document.querySelectorAll(".editor")
let quillOnline = ""


var toolbarOptions = [
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    ['bold', 'italic', 'underline', 'strike'],

    [
        'clean',
        {'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"]},
        {'background': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"]}
    ],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
    ['link']
];

editors.forEach(p => {
    p.classList.add("hover-pointer")

    p.onclick = (e) => {
        let changed = false
        if (quillOnline == "") {
            p.classList.remove("hover-pointer")
            let div = document.createElement("div")
            div.innerHTML = p.innerHTML
            p.innerHTML = ""
            p.appendChild(div)
            quillOnline = new Quill(div, {
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
            })

            quillOnline.on('text-change', function (delta, oldDelta, source) {
                changed = true
            })

            let btn = document.createElement("button")
            btn.innerHTML = "Kaydet"
            btn.classList.add("btn", "btn-sm", "btn-outline-primary", "float-end", "mt-1")
            btn.onclick = () => {
                saveChanges(p, changed)
            }
            div.appendChild(btn)
        }
        else if (quillOnline == null) {
            quillOnline = ""
        }
    }

})

let saveChanges = (el, changed) => {
    let data = quillOnline.root.innerHTML
    el.innerHTML = data
    el.classList.add("hover-pointer")
    quillOnline = null

    if (changed) {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", el.dataset.post, true)
        xhr.responseType = "json"
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = () => {
            if (!xhr.response.error) {
                toastr.success('Alan başarıyla güncellendi.', 'Başarılı!')
            }
            else {
                window.location.reload()
            }
        }
        xhr.send(JSON.stringify({data}))
    }
}