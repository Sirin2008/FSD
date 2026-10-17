const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

const mongoUrl = 'mongodb+srv://sirinfathima08_db_user:Sirin2008@smartservicedb.jwvsdcx.mongodb.net/';
const dbName = 'ProductsDB';

let products;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Management System</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f2f4f7;
          margin: 0;
          padding: 30px;
        }

        .container {
          max-width: 850px;
          margin: auto;
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 10px #ccc;
        }

        h1 {
          text-align: center;
          color: #263859;
        }

        h2 {
          color: #263859;
          margin-top: 25px;
        }

        input {
          padding: 10px;
          margin: 5px 5px 5px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          padding: 9px 13px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: white;
          margin: 2px;
        }

        .add-btn {
          background: #198754;
        }

        .edit-btn {
          background: #0d6efd;
        }

        .delete-btn {
          background: #dc3545;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }

        th {
          background: #263859;
          color: white;
        }

        tr:nth-child(even) {
          background: #f7f7f7;
        }

        #message {
          margin-top: 12px;
          font-weight: bold;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h1>Product Management System</h1>

        <h2>Add New Product</h2>

        <form id="productForm">
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            required
          >

          <input
            type="number"
            id="price"
            placeholder="Enter price"
            min="0.01"
            step="0.01"
            required
          >

          <button type="submit" class="add-btn">
            Add Product
          </button>
        </form>

        <p id="message"></p>

        <h2>Product List</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody id="productTable">
            <tr>
              <td colspan="4">Loading products...</td>
            </tr>
          </tbody>
        </table>
      </div>

      <script>
        const form = document.getElementById('productForm');
        const message = document.getElementById('message');
        const productTable = document.getElementById('productTable');

        async function fetchProducts() {
          try {
            const response = await fetch('/api/products');

            if (!response.ok) {
              throw new Error('Could not load products');
            }

            const data = await response.json();
            productTable.replaceChildren();

            if (data.length === 0) {
              const row = productTable.insertRow();
              const cell = row.insertCell();
              cell.colSpan = 4;
              cell.textContent = 'No products found';
              return;
            }

            data.forEach(product => {
              const row = productTable.insertRow();

              const idCell = row.insertCell();
              idCell.textContent = product._id;

              const nameCell = row.insertCell();
              nameCell.textContent = product.name;

              const priceCell = row.insertCell();
              priceCell.textContent = Number(product.price).toFixed(2);

              const actionCell = row.insertCell();

              const editButton = document.createElement('button');
              editButton.textContent = 'Edit Price';
              editButton.className = 'edit-btn';
              editButton.onclick = () => updateProduct(product._id);

              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
              deleteButton.className = 'delete-btn';
              deleteButton.onclick = () => deleteProduct(product._id);

              actionCell.append(editButton, deleteButton);
            });
          } catch (error) {
            productTable.replaceChildren();
            const row = productTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 4;
            cell.textContent = error.message;
          }
        }

        form.addEventListener('submit', async function(event) {
          event.preventDefault();

          const name = document.getElementById('name').value.trim();
          const price = document.getElementById('price').value;

          try {
            const response = await fetch('/api/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, price })
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || 'Failed to add product');
            }

            form.reset();
            message.style.color = 'green';
            message.textContent = 'Product added successfully!';

            await fetchProducts();
          } catch (error) {
            message.style.color = 'red';
            message.textContent = error.message;
          }
        });

        async function updateProduct(id) {
          const newPrice = prompt('Enter the new price:');

          if (newPrice === null) return;

          if (newPrice.trim() === '' || !Number.isFinite(Number(newPrice)) || Number(newPrice) <= 0) {
            alert('Please enter a valid price greater than zero.');
            return;
          }

          try {
            const response = await fetch('/api/products/' + id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ price: Number(newPrice) })
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || 'Failed to update product');
            }

            alert('Product price updated successfully!');
            await fetchProducts();
          } catch (error) {
            alert(error.message);
          }
        }

        async function deleteProduct(id) {
          if (!confirm('Are you sure you want to delete this product?')) {
            return;
          }

          try {
            const response = await fetch('/api/products/' + id, {
              method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
              throw new Error(result.error || 'Failed to delete product');
            }

            alert('Product deleted successfully!');
            await fetchProducts();
          } catch (error) {
            alert(error.message);
          }
        }

        fetchProducts();
      </script>
    </body>
    </html>
  `);
});

// CREATE: Add product
app.post('/api/products', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const price = Number(req.body.price);

    if (!name || !Number.isFinite(price) || price <= 0) {
      return res.status(400).json({
        error: 'Enter a valid product name and price greater than zero.'
      });
    }

    const result = await products.insertOne({ name, price });

    res.status(201).json({
      message: 'Product added successfully',
      _id: result.insertedId
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Unable to add product.' });
  }
});

// READ: Get all products
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await products.find().toArray();
    res.json(allProducts);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: 'Unable to fetch products.' });
  }
});

// UPDATE: Edit product price
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const price = Number(req.body.price);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }

    if (!Number.isFinite(price) || price <= 0) {
      return res.status(400).json({ error: 'Enter a valid price.' });
    }

    const result = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: { price } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json({ message: 'Product price updated successfully.' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Unable to update product.' });
  }
});

// DELETE: Remove product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID.' });
    }

    const result = await products.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Unable to delete product.' });
  }
});

// Connect to MongoDB first, then start the server
async function startServer() {
  try {
    const client = new MongoClient(mongoUrl);

    await client.connect();

    const db = client.db(dbName);
    products = db.collection('products');

    console.log('MongoDB Connected');

    app.listen(PORT, () => {
      console.log('Server running at http://localhost:' + PORT);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Check whether MongoDB Server is installed and running.');
    process.exit(1);
  }
}

startServer();