<?php
/**
 * API Endpoint: Admin Logout
 * POST /api/auth-logout.php
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

initSession();
session_unset();
session_destroy();

sendJSON(['success' => true, 'message' => 'Logout successful']);
