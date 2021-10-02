<?php

include ('db-connect.php');

$db = new queryBuilder($pdo);

$kids = $db->get_all('docs');

echo json_encode($kids, JSON_UNESCAPED_UNICODE);

?>