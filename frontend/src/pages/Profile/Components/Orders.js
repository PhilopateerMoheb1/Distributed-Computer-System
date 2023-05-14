import "../styles.css"
import 'bootstrap/dist/css/bootstrap.css';

export default function Orders(){
    return(
<div class="ProfileContainer">


  <main class="d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{width: "280px", height: "610px"}}>
      <hr/>
      <ul class="nav nav-pills flex-column mb-auto">
        <li>
          <a href="./userinfo" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#home"></use>
            </svg>
            User Info
          </a>
        </li>
        <li class="nav-item">
          <a href="./orders" class="nav-link active" aria-current="page">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#speedometer2"></use>
            </svg>
            Orders
          </a>
        </li>
        <li>
          <a href="./transactions" class="nav-link text-white">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use href="#table"></use>
            </svg>
            Transactions
          </a>
        </li>
      </ul>
      
    </div>

    <div class="b-example-divider b-example-vr"></div>

    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-tertiary" style={{margin: "0 auto", width: "1200px"}}>
      <hr/>
      <div class="row">
        <div class="col col-bg-6">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={require("../images/katana1.jpg")} alt="" class="img-fluid img-thumbnail"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>4/5/2023</small>
                  </div>
                  <p class="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </div>
              </div>
            </a>

            <a href="#" class="list-group-item list-group-item-action">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={require("../images/katana2.jpg")} alt="" class="img-fluid img-thumbnail"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>4/5/2023</small>
                  </div>
                  <p class="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </div>
              </div>
            </a>

            <a href="#" class="list-group-item list-group-item-action">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={require("../images/katana3.jpg")} alt="" class="img-fluid img-thumbnail"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>4/5/2023</small>
                  </div>
                  <p class="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="col col-bg-6">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={require("../images/katana1.jpg")} alt="" class="img-fluid"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>4/5/2023</small>
                  </div>
                  <p class="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </div>
              </div>
            </a>

            <a href="#" class="list-group-item list-group-item-action">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={require("../images/katana2.jpg")} alt="" class="img-fluid"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>4/5/2023</small>
                  </div>
                  <p class="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </div>
              </div>
            </a>

            <a href="#" class="list-group-item list-group-item-action">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={require("../images/katana3.jpg")} alt="" class="img-fluid"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>4/5/2023</small>
                  </div>
                  <p class="mb-1">Some placeholder content in a paragraph.</p>
                  <small>And some small print.</small>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>
  </main>

</div>
);
}