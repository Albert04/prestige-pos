const Order = {
    tableName: 'pos."Orders"',
  
    async getAll() {
      try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${this.tableName}`);
        client.release();
        return result.rows;
      } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Error fetching orders');
      }
    },
  
    async getById(id) {
      try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${this.tableName} WHERE order_id = $1`, [id]);
        client.release();
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw new Error('Error fetching order by ID');
      }
    },
  
    async create(order) {
      try {
        await this.validateOrder(order); // Assuming validation logic (see below)
        const client = await pool.connect();
        await client.begin(); // Start transaction (assuming order items need to be saved too)
  
       // Insert order data
      const result = await client.query(
        `INSERT INTO ${this.tableName} (customer_id, order_date, total_amount, table_number, order_type) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [order.customer_id, order.order_date, order.total_amount, order.table_number, order.order_type]
      );

  
        // Additional operations within the transaction (e.g., saving order items)
        if (order.order_type === 'kitchen' || order.order_type === 'bar') {
            // Send order to appropriate destination (implementation depends on your system)
          }

          
        await client.commit();
        client.release();
        return result.rows[0];
      } catch (error) {
        console.error('Error creating order:', error);
        await client.rollback(); // Rollback if an error occurs
        client.release();
        throw error;
      }
    },
  
    // ... other methods like update, delete, and potentially methods for managing order items
  
    // (Optional) Validation logic for order data
    async validateOrder(order) {
      // Implement validation rules using Joi or a similar library
    }
  };
  
  module.exports = Order;
  