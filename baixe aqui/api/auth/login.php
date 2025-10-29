<?php
/**
 * API Endpoint: Admin Login
 * POST /api/auth-login.php
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

$data = getJSONInput();

// Validate required fields
if (empty($data['username']) || empty($data['password'])) {
    sendJSON(['error' => 'Missing username or password'], 400);
}

// Check credentials
if ($data['username'] === ADMIN_USERNAME && password_verify($data['password'], ADMIN_PASSWORD)) {
    initSession();
    $_SESSION['admin_authenticated'] = true;
    $_SESSION['admin_username'] = ADMIN_USERNAME;
    
    sendJSON(['success' => true, 'message' => 'Login successful']);
} else {
    sendJSON(['error' => 'Invalid credentials'], 401);
}
