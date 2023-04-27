const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const productCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(productCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

//find a specific category
router.get("/:id", async (req, res) => {
  try {
    const productCategories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!productCategories) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(productCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const productCategories = await Category.create(req.body);
    res.status(200).json(productCategories);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put("/:product_id", async (req, res) => {
  console.log(req.body);
  Category.update(req.body, {
    where: {
      id: req.params.product_id,
    },
  });

  return res.json(req.body);
});

// update a category by its `id` value

router.delete("/:product_id", async (req, res) => {
  const product_id = await Product.destroy({
    where: {
      id: req.params.product_id,
    },
  });

  return res.json(product_id);
  // delete a category by its `id` value
});

module.exports = router;
