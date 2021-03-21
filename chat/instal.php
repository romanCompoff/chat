<?php use Dva\Chat\Controllers\InstalController;

require __DIR__ . '/../vendor/autoload.php';

$dataChannels = [
    ["798784", "5bb5b14a93403d2d92c3", "69bae25d1045cb88259b", "eu"],
    ["798785", "c42207beddb9463102a9", "d2f9003884e324f9c629", "eu"],
    ["798786", "bd484c47117bb9af2ef9", "fd9e7a9bfdce48009c55", "eu"],
    ["800813", "d763421f0f92ef953622", "1cb65f3922786849939b", "eu"],
    ["800814", "a157805c4416dfcbedf2", "a1fdec099d41447e6b8a", "eu"],
    ["800815", "79ef14203a6e92a929c8", "5e765fbad427f661844b", "eu"]
];

$instal = new InstalController;
$r = $instal->startinstal();
$addChannels = $instal->addChannels($dataChannels);
var_dump($r);
