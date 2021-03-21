<?php namespace Dva\Chat\Controllers;

use Dva\Chat\Core\DB;
use Dva\Chat\Models\MainModel;

class mainController
{
    public function connectToChannel()
    {
        $model = new MainModel(DB::getConnect());
        $channel = $model->connectToChannel();
        return $channel;
    }

    public function upTime($id)
    {
        $model = new MainModel(DB::getConnect());
        $model->upTime($id);
    }
}