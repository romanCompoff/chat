<?php namespace Dva\Chat\Controllers;

use Dva\Chat\Core\DB;
use Dva\Chat\Models\InstalModel;

class InstalController
{
   public function startInstal()
   {
      $model = new InstalModel(DB::getConnect());
      $model = $model->startInstal();
      return $model;
   }

   public function addChannels(array $channel)
   {
      $model = new InstalModel(DB::getConnect());
      foreach ($channel as $value) {
         $model->addChannels($value);
      }
   }
}