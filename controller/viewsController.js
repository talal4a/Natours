// exports.getOverView = (req, res) => {
//   res.status(200).render("base", {
//     tour: "The Forest hiker",
//     user: "Talal",
//   });
// };
exports.getOverView = (req, res) => {
  res.status(200).render("overview", {
    title: "All tours",
  });
};
exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "The Forest Hiker Tour",
  });
};
