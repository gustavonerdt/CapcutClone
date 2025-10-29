<?php
/**
 * Database Configuration for Hostinger MySQL
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create MySQL database in Hostinger cPanel
 * 2. Update the credentials below with your database info
 * 3. Make sure this file is OUTSIDE public_html or add .htaccess protection
 */

// Database credentials - UPDATE THESE IN PRODUCTION
define('DB_HOST', 'localhost');  // Usually 'localhost' on Hostinger
define('DB_NAME', 'your_database_name');  // Your database name from cPanel
define('DB_USER', 'your_database_user');  // Your database username
define('DB_PASS', 'your_database_password');  // Your database password
define('DB_CHARSET', 'utf8mb4');

// Admin credentials - CHANGE THESE FOR SECURITY
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', password_hash('naipersadmin2024', PASSWORD_BCRYPT));  // Hashed password

// Session configuration
define('SESSION_NAME', 'naipers_admin_session');
define('SESSION_LIFETIME', 86400);  // 24 hours

/**
 * Get PDO database connection
 * @return PDO
 */
function getDBConnection() {
    static $pdo = null;
    
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit;
        }
    }
    
    return $pdo;
}

/**
 * Generate UUID v4
 * @return string
 */
function generateUUID() {
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
