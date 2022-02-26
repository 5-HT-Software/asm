const settingsPage = async (req, res) => {
    res.render("pages/admin/settings", {layout: "admin"})
}

module.exports = {settingsPage}
