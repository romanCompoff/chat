<?php namespace Dva\Chat\Controllers;

use Dva\Chat\Core\DB;
use Dva\Chat\Models\InstalModel;

class InstalController
{
   public function startInstal()
   {
      $model = new InstalModel(DB::getConnect());
      $model = $model->startInstal();
      var_dump($model);
      return $model;
   }
}