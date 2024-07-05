import { Router } from "express";

const router = Router();

// router.use((req, res, next) => {
//   console.log("middleware");
//   req.timestamp = new Date();
//   next();
// });

router.use((req, res, next) => {
  console.log("middleware");
  req.timestamp = new Date();
  next();
});

router.use((err, req, res, next) => {
  console.error(err.stack); // ???

  // res.json({ }) //??
  res.status(500).send("Something broke!");
});

// Root endpoint
router.get("/", (req, res) => {
  //   const {nombre,edad} = req.query
  //   res.send("Hello World!");
  console.log(req.timestamp);
  res.status(202).json({ message: "Todo ok!" });
});

router.get("/:userId", (req, res) => {
  console.log(req.params.userId);
  res.send(`User ${userId}`);
});

router.get(
  "/course/:id",
  (req, res, next) => {
    // valida algo
    next();
  },
  (req, res) => {
    // pasa a este callback cuando hace el next
    console.log(req.params.id);
    res.send(`Course ${req.params.id}`);
  }
);

export default router;
