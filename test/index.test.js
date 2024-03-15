import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should return homepage with 200 status code', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });
});

describe('GET /search', () => {
  it('should return product data with Nutri-Score for a given product name', async () => {
    const productName = 'Nutella'; // Exemple Product
    const response = await request(app).get(`/search?product_name=${productName}`); // Use of await here
    assert.strictEqual(response.status, 200);
  });
});

describe('GET /search with invalid parameters', () => {
  it('should return an error for an invalid product name', async () => {
    const response = await request(app).get('/search?product_name=invalidProduct');
    assert.strictEqual(response.status, 404); 
  });
});
