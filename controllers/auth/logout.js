module.exports = async (req, res) => {
  await req.logout();
  req.flash("success", "Başarıyla çıkış yaptınız.");
  return res.status(200).redirect("/login");
}
