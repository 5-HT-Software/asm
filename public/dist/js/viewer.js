let soloViewers = []

let soloViewerImgs = document.querySelectorAll(".soloViewer")
soloViewerImgs.forEach(p => {
    p.style.cursor = "pointer"
    let viewer = new Viewer(p, {
        modal: true,
        viewed() {
            viewer.zoomTo(1);
        },
        toolbar: false
    })
    console.log(viewer)
    soloViewers.push(viewer)
})