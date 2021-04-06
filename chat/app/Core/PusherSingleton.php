<?php

namespace Dva\Chat\Core;

use Pusher\Pusher;

class PusherSingleton
{
	protected static $instance;
	protected static $app_id ;
	protected static $key ;
	protected static $secret ;
	protected static $cluster ;
	
	public static function getPusher($key, $secret, $app_id, $cluster)
	{
		if(self::$instance === NULL || $app_id !== self::$app_id || $key !== self::$key){
			self::$instance = self::pusher($key, $secret, $app_id, $cluster);
		}
		return self::$instance;
	}
	
	protected static function pusher($key, $secret, $app_id, $cluster)
	{
		self::$key = $key;
		self::$secret = $secret;
		self::$app_id = $app_id;
		self::$cluster = $cluster;

		return new Pusher($key, $secret, $app_id, array('cluster' => $cluster));
	}

}

