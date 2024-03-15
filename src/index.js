import http from 'node:http';
import app from './app.js';
import 'dotenv/config';

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

server.listen(port);

server.on('listening', () => {
  const addr = server.address();
  console.log(`Listening on port ${addr.port}`);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': {
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    }
    case 'EADDRINUSE': {
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    }
    default:
      throw error;
  }
});


// Function to make the request and display the results
function getNutriscore(productName) {
  const url = `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${productName}&fields=product_name,nutriscore_grade&json=true`;

  fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        data.products.forEach(product => {
            console.log(`Nom du produit: ${product.product_name}, Nutri-Score: ${product.nutriscore_grade}`);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des produits:', error);
    });
}






// Calling the function to retrieve the recipes
getNutriscore("Poulet");


export {getNutriscore};