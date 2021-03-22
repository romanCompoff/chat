<?php namespace Dva\Chat\Models;

class InstalModel
{
    protected $db;
    public function __construct($db)
    {
        $this->db = $db;
    }
    public function startInstal()
    {
        $sql = "CREATE TABLE IF NOT EXISTS Chat (
         id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
         PRIMARY KEY(id),
         app_id INT(6) NOT NULL,
         app_key VARCHAR(20) NOT NULL,
         app_secretr VARCHAR(20) NOT NULL,
         cluster VARCHAR(2) NOT NULL,
         is_free BOOLEAN NOT NULL DEFAULT true,
         up_time INT NULL
        )";
        $this->db->exec($sql);
    }

    public function addChannels(array $channel)
    {
        $sql = "INSERT INTO Chat (app_id, app_key, app_secretr, cluster) VALUES (?,?,?,?)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($channel);
    }
}
