const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
// Define a route handler for the view
exports.view = (req, res) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) throw err; // Connection failed

        console.log('Connected as ID ' + connection.threadId);

        // Execute a query to get data from the database
        connection.query('SELECT * FROM card', (err, rows) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.log(err);
                return;
            }

            console.log('The data from users table are: \n', rows);
            res.render('home', { rows });
        });
    });
};

//display help page
exports.help = (req, res) => {
    res.render('help');
};

//display play page
exports.play = (req, res) => {
    res.render('play');
    //code to populate the play page using mysql data and javascript

};








// Add new card 
exports.form = (req, res) => {
    res.render('add-user');
};
exports.create = (req, res) => {
    //res.render('add-user');
    pool.getConnection((err, connection) => {   
        if(err) throw err; // Connection failed 
        console.log('Connected as ID ' + connection.threadId);
        // Execute a query to get data from the database
        connection.query('INSERT INTO card (deck_id, question, answer) VALUES (4, ?, ?)', [req.body.add_question, req.body.add_answer], (err, rows) => {
            // Release the connection back to the pool
            connection.release();
            if(err) {
                console.log(err);
                return;
            }
            console.log('The data from users table are: \n', rows);
            res.render('add-user', {alert: 'Card added!'});
        });
    });
};
//edit user 

// Edit user
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // Connection failed
        console.log('Connected as ID ' + connection.threadId);

        // Execute a query to get data from the database
        connection.query('SELECT * FROM card WHERE card_id = ?', [req.params.card_id], (err, rows) => {
            // Release the connection back to the pool
            connection.release();
            if (!err) {
                res.render('edit-card', { rows });
               } else {
            console.log(err);
            }
            console.log('The data from users table are: \n', rows);
        });
    });
  };
// Update user
exports.update = (req, res) => {
    const { card_id, deck_id, add_question, add_answer } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // Connection failed
        console.log('Connected as ID ' + connection.threadId);

        // Execute a query to get data from the database
        connection.query('UPDATE card SET question = ?, answer = ? WHERE card_id =?', [add_question, add_answer,req.params.card_id], (err, rows) => {
            // Release the connection back to the pool
            connection.release();
            if (!err) {
               pool.getConnection((err, connection) => {
                if (err) throw err; // Connection failed
                console.log('Connected as ID ' + connection.threadId);
                //user connection
                connection.query("SELECT * FROM card WHERE card_id = ?",
                [req.params.card_id], (err, rows) => {
                    connection.release();
                    if (!err) {
                        res.render('edit-card', { rows });
                        }
                        else {
                        console.log(err);
                        }
                        console.log('The data from user table: \n', rows);
                    });
                });






               } else {
            console.log(err);
            }
            console.log('The data from users table are: \n', rows);
        });
    });
  };
// Delete User
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // Connection failed
        console.log('Connected as ID ' + connection.threadId);

        // Execute a query to get data from the database
        connection.query('DELETE FROM card WHERE card_id = ?', [req.params.id], (err, rows) => {
            // Release the connection back to the pool
            connection.release();
            if (err) {
                console.log(err);
                return;
            }
            console.log('The data from users table are: \n', rows);
            res.redirect('/');
        });
    });
};

