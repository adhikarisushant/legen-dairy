CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (50) UNIQUE NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    role VARCHAR (50) NOT NULL DEFAULT 'isAdmin',  
    password VARCHAR (255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (50) UNIQUE NOT NULL,
    contact VARCHAR (50) NOT NULL,
    address VARCHAR (100) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS vendors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,    
    name VARCHAR (255) NOT NULL,
    cow_price NUMERIC (5, 2),
    buff_price NUMERIC (5, 2),
    contact VARCHAR (50) NOT NULL,
    address VARCHAR (100) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (100) UNIQUE NOT NULL,
    price NUMERIC (6, 2) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    updated_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TYPE product_enum AS ENUM ('buff', 'cow');

CREATE TABLE IF NOT EXISTS vendor_transactions (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        vendor_id INTEGER REFERENCES vendors(id),
        quantity NUMERIC (5, 2) NOT NULL,
        product_type product_enum,
        price NUMERIC (5, 2) NOT NULL,
        amount NUMERIC (6, 2) NOT NULL,
        payment_status BOOLEAN NOT NULL DEFAULT FALSE,
        lactometer SMALLINT,
        status BOOLEAN NOT NULL DEFAULT TRUE,
        created_by INTEGER REFERENCES users(id),
        updated_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customer_transactions (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        customer_id INTEGER REFERENCES customers(id),
        product_id INTEGER REFERENCES products(id),
        quantity NUMERIC (5, 2) NOT NULL,
        price NUMERIC (5, 2) NOT NULL,
        amount NUMERIC (6, 2) NOT NULL,
        payment_status BOOLEAN NOT NULL DEFAULT FALSE,
        status BOOLEAN NOT NULL DEFAULT TRUE,
        created_by INTEGER REFERENCES users(id),
        updated_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INSERT QUERIES
INSERT INTO users (
 name, email, role, password, status
) VALUES (
  'sushant', 'sushant@email.com', 'isSuperAdmin', '12345678', TRUE
);