
<?php 
     class sellersbasic extends Model{
        public function __construct(){
            parent::__construct("seller_basic_data",array("Name", "Address", "Phone_Number", "Email", "Password", "Gender", "DOB", "Role", "Cash_Balance"));
        }
    }
 ?>
