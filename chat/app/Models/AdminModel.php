<?php namespace Dva\Chat\Models;

use Dva\Chat\Models\AdminModel;

class AdminModel Extends MainModel
{
   public function getAllChannels()
   {
      $sql = sprintf("SELECT * FROM %s", $this->table);
      $stmt = $this->db->query($sql);
      return $stmt->fetchAll();
   }
}