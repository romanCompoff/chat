<?php namespace Dva\Chat\Models;

class mainModel
{
    protected $db;
    protected $table = "Chat";

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function connectToChannel()
    {
        $t = time() - 60 * 3;
        $sql = sprintf("SELECT * FROM %s WHERE is_free = true OR up_time < '$t'", $this->table);
        $stmt = $this->db->query($sql);
        return $stmt->fetch();
    }

    public function upTime($id)
    {
        $t = time();
        $query = "UPDATE `Chat` SET `up_time` = :time, is_free = false WHERE `id` = :id";
        $params = [
            ':id' => $id,
            ':time' => $t,
        ];
        $stmt = $this->db->prepare($query);
        return $stmt->execute($params);
    }
}

