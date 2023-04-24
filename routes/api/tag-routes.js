const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const require = ('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const productTags = await Tag.findAll({
      include: [{model: Tag}]
    });
    
    res.status(200).json(productTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const productTags = await Tag.findByPk(req.params.id, {
      include: [{ model: Tag}],
    });

    if (!productTags) {
      res.status(404).json({ message: "No product found with this tag!" });
      return;
    }

    res.status(200).json(productTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const productTags = await Tag.create(req.body);
    res.status(200).json(productTags);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:tag_name', async (req, res) => {
  const tag_name = await Tag.update(req.body, {
    where: {
      tag_name: req.params.tag_name,
    },
  });
  return res.json(tag_name);
  // update a tag's name by its `id` value
});

router.delete('/:tag_id', async (req, res) => {
  const tag_id = await tag_id.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  });

  return res.json(tag_id);

});

module.exports = router;
