import { DAOCarts, DAOOrders } from "../daos/index.js";
import CartDTO from "../dto/DTO.cart.js";
import OrderDTO from "../dto/DTO.order.js";
import sendMailEth from "../libs/nodemailer.js";

const getOrder = async (req, res) => {
  const { cart_id, fullname, email } = req.user;
  const { address } = req.body
  const cart = await DAOCarts.getCartById(cart_id);
  const dtoCart = new CartDTO(cart.products);
  const dtoOrder = new OrderDTO(dtoCart, fullname, address, email);
  console.log(dtoOrder)

  try {
    const order = await DAOOrders.newOrder(dtoOrder);

    const html = `<div class="container mt-5 d-flex justify-content-center">
    <div class="card p-4 mt-3">
       <div class="first d-flex justify-content-between align-items-center mb-3">
         <div class="info">
             <span class="d-block name">Thank you, ${order.owner}</span>
             <span class="order">Order - ${order._id}</span>
              
         </div>
       </div>
           <div class="detail">
       <span class="d-block summery">Your order has been dispatched. we are delivering you order.</span>
       <span class="d-block summery">${order.date}</span>
           </div>
       <hr>
       <div class="text">
     <span class="d-block new mb-1" >${order.owner}</span>
     <span class="d-block new mb-1" >${order.owner_email}</span>
      </div>
     <span class="d-block address mb-3">${order.address}</span>
       <div class="  money d-flex flex-row mt-2 align-items-center">
         <span class="ml-2">Cash on Delivery:$ ${order.shipment}</span> 
            </div>
            <div class="last d-flex align-items-center mt-3">
             <span class="address-line">CHANGE MY DELIVERY ADDRESS</span>

            </div>
     </div>
 </div>`;

    sendMailEth(email, "Your order", html);
  } catch (error) {
    throw new Error(error)
  }

  res.render("order", { order: dtoOrder });
};

export default getOrder;
