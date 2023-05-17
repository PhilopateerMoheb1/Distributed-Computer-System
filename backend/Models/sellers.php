
<?php 
     class sellers extends Model{
        public function __construct(){
            parent::__construct("seller",array("Name", "Address", "Phone_Number", "Email", "Password", "Gender", "DOB", "Role", "Cash_Balance"));
        }
    }
 ?>
