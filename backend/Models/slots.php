
<?php 
     class slots extends Model{
        public function __construct(){
            parent::__construct("slots",array( "AdminEmail", "EventID", "StartTime", "EndTime", "Date"));
        }
    }
 ?>
