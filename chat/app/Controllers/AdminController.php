<?php namespace Dva\Chat\Controllers;

use Dva\Chat\Core\DB;
use Dva\Chat\Models\AdminModel;

class AdminController Extends MainController
{
   public function getAllChannels()
   {
      $model = new AdminModel(DB::getConnect());
      $channel = $model->getAllChannels();
      return $channel;
   }
}