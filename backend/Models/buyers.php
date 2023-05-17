
<?php 
     class buyers extends Model{
        public function __construct(){
            parent::__construct("buyer",array("Name", "Address", "Phone_Number", "Email", "Password", "Gender", "DOB", "Role", "Cash_Balance"));
        }
    }
 ?>
