<?php
/**
 * API Endpoint: Check Admin Authentication
 * GET /api/auth-check.php
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

$authenticated = isAdminAuthenticated();
sendJSON(['authenticated' => $authenticated]);
