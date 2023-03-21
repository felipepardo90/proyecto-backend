import { DAOCarts, DAOOrders } from "../daos/index.js";
import CartDTO from "../dto/DTO.cart.js";
import OrderDTO from "../dto/DTO.order.js";
import sendMailEth from "../libs/nodemailer.js";

const getOrder = async (req, res) => {
  const { cart_id, fullname, email } = req.user;
  const cart = await DAOCarts.getCartById(cart_id);
  const dtoCart = new CartDTO(cart.products);
  const dtoOrder = new OrderDTO(dtoCart, fullname, email);

  try {
    const order = await DAOOrders.newOrder(dtoOrder);

    const html = `<div class="container mt-5 d-flex justify-content-center">
    <div class="card p-4 mt-3">
       <div class="first d-flex justify-content-between align-items-center mb-3">
         <div class="info">
             <span class="d-block name">Thank you, Alex</span>
             <span class="order">Order - 4554645</span>
              
         </div>
        
          <img src="https://i.imgur.com/NiAVkEw.png" width="40"/>
           

       </div>
           <div class="detail">
       <span class="d-block summery">Your order has been dispatched. we are delivering you order.</span>
           </div>
       <hr>
       <div class="text">
     <span class="d-block new mb-1" >Alex Dorlew</span>
      </div>
     <span class="d-block address mb-3">672 Conaway Street Bryantiville Massachusetts 02327</span>
       <div class="  money d-flex flex-row mt-2 align-items-center">
         <img src="https://i.imgur.com/ppwgjMU.png" width="20" />
     
         <span class="ml-2">Cash on Delivery</span> 

            </div>
            <div class="last d-flex align-items-center mt-3">
             <span class="address-line">CHANGE MY DELIVERY ADDRESS</span>

            </div>
     </div>
 </div>`;

    sendMailEth(email, "Your order", html);
  } catch (error) {}

  res.render("order", { order: dtoOrder });
};

export default getOrder;
