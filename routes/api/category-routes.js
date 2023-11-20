const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
   try {
    const categoriesData = await Category.findAll({
      include: [{model: Product}]
    });
    if (!categoriesData) {
      res.status(404).json({message: "Cannot find categories in database"});
      return;
    }
    res.status(200).json(categoriesData);
   } catch (error) {
    res.status(500).json(error)
   }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!categoriesData) {
      res.status(404).json({message: "Cannot find category by id in database"});
      return;
    }
    res.status(200).json(categoriesData);
   } catch (error) {
    res.status(500).json(error)
   }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const newCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
