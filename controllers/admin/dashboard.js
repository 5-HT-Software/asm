const dashboardPage = async (req, res) => {
    res.render("pages/admin/index", {layout: "admin"})
}

module.exports = {dashboardPage}