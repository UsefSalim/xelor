/* ! @Route  : GET => /
     Desc    : render home Page
     @Access : Pubic
*/
exports.homePage = (req, res) => {
  res.status(200).render('index');
};
