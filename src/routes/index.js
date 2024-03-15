import { Router } from 'express';


const router = Router();

// Handle GET request on root path
router.get('/', (req, res) => {
  req.log.info('/ request recieved');

  res.send('Hello World!');
});

// Function to get Nutriscore of a product
async function getNutriscore(productName) {
  const url = `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${productName}&fields=product_name,nutriscore_grade&json=true`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    // Map the product data to a simpler format
    return data.products.map(product => ({
      name: product.product_name,
      nutriScore: product.nutriscore_grade,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error; // Re-throw the error to be handled in the router
  }
}

// Handle GET request on /search path
router.get('/search', async (req, res) => {
  const productName = req.query.product_name;
  try {
    const products = await getNutriscore(productName); // This function now returns an array
    if (products.length === 0) { // Directly check the length of the returned array
      return res.status(404).send('Produit non trouvé');
    }
    res.json(products); // Directly the array of products
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
});



export default router;
