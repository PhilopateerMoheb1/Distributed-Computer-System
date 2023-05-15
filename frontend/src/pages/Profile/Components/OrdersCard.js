

export default function OrdersCard(props){
    return(

        <div>
                        <a href="#" class="list-group-item list-group-item-action">
              <div class="row">
                <div class="col col-lg-2">
                  <img src={props.img} alt="" class="img-fluid"/>
                </div>
                <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{props.name}</h5>
                    {props.quantity>0? <small>Quantity Left: {props.quantity}</small>:<p style={{"color":"Green"}}>Sold Out!</p>}
                  </div>
                  <p class="mb-1">Category: {props.category}</p>
                  <small>{props.description}</small>
                </div>
              </div>
            </a>
        </div>

    );

}