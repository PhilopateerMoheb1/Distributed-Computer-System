<?php
class transaction extends Model
{
    public function __construct()
    {
        parent::__construct("transaction", array("PID", "BID", "SID", "Transaction_Date"));
    }
}
?>