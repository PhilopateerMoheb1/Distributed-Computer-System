import "../styles.css"
import 'bootstrap/dist/css/bootstrap.css';

export default function Transactions(){
    return(

<div>




  <main class="d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{width: "280px", height: "610px"}}>
      <hr/>
      <ul class="nav nav-pills flex-column mb-auto">
        <li>
          <a href="./userInfo" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#home"></use>
            </svg>
            User Info
          </a>
        </li>
        <li>
          <a href="./orders" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#speedometer2"></use>
            </svg>
            Orders
          </a>
        </li>
        <li class="nav-item">
          <a href="./transactions" class="nav-link active" aria-current="page">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#table"></use>
            </svg>
            Transactions
          </a>
        </li>
      </ul>
    </div>

    <div class="b-example-divider b-example-vr"></div>

    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{margin:"0 auto",width: "800px"}}>
      <hr/>
      <ol class="list-group">
        <li class="list-group-item">
          <div class="row" style={{paddingBottom: "45px"}}>
            <div class="col col-bg-2"><h5>Item Image</h5></div>
            <div class="col col-bg-8"><h5>Item Name</h5></div>
            <div class="col col-bg-1"><h5>Item Price</h5></div>
            <div class="col col-bg-1"><h5>Transaction Date</h5></div>
          </div>

          <hr/> 

          <div class="row">
            <div class="col col-bg-2">
              <img src={require("../images/katana1.jpg")} alt="" class="img-fluid img-thumbnail" style={{width: "50px"}}/>
            </div>
            <div class="col col-bg-6">Item Name</div>
            <div class="col col-bg-2">Price</div>
            <div class="col col-bg-2">4/5/2023</div>
          </div>

          <hr/>

          <div class="row">
            <div class="col col-bg-2">
              <img src={require("../images/katana2.jpg")} alt="" class="img-fluid img-thumbnail" style={{width: "50px"}}/>
            </div>
            <div class="col col-bg-6">Item Name</div>
            <div class="col col-bg-2">Price</div>
            <div class="col col-bg-2">4/5/2023</div>
          </div>

          <hr/>

          <div class="row">
            <div class="col col-bg-2">
              <img src={require("../images/katana3.jpg")} alt="" class="img-fluid img-thumbnail" style={{width: "50px"}}/>
            </div>
            <div class="col col-bg-6">Item Name</div>
            <div class="col col-bg-2">Price</div>
            <div class="col col-bg-2">4/5/2023</div>
          </div>
        </li>
      </ol>

    </div>
  </main>

</div>
);
}