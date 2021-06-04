const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({include: {model: Product}});
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!catData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const category = await Category.create(req.body)
    res.status(200).json(category);
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.json(newCat);
  } catch (err) { res.json(err) }
});

router.delete('/:id', async (req, res) => {
  try{
  const deletedCat = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
      res.json(deletedCat);
  } catch (err) {res.json(err)} 
});

module.exports = router;
