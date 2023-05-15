export default function TransactionCard(props){
    return(
      <div>
          <hr/> 
          <div class="row">
            <div class="col col-bg-2">
              <img src={props.image} alt="" class="img-fluid img-thumbnail" style={{width: "50px"}}/>
            </div>
            <div class="col col-bg-6">{props.name}</div>
            <div class="col col-bg-2">{props.price}</div>
            <div class="col col-bg-2">{props.date}</div>
          </div>
      </div>
    )}