
<?php 
     class event extends Model{
        public function __construct(){
            parent::__construct("events",array("Name", "Description","Location","Image","Date","isShown","isAdmitting"));
        }
    }
 ?>
