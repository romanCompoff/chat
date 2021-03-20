<?php use Dva\Chat\Controllers\InstalController;
// use Dva\Chat\Core\DB;
require __DIR__ . '/../vendor/autoload.php';

$instal = new InstalController;
$r = $instal->startinstal();
var_dump($r);