import { DAOCarts, DAOOrders } from "../daos/index.js";
import CartDTO from "../dto/DTO.cart.js";
import OrderDTO from "../dto/DTO.order.js";
import sendMailEth from "../libs/nodemailer.js";

const controller = {};

controller.getOrders = async (req, res, next) => {
  const { id } = req.user;
  res.status(200).json({ error: false });
};

controller.getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await DAOOrders.getOrderById(id);
  res.status(200).render("order", { order });
};

controller.newOrder = async (req, res) => {
  const { cart_id, fullname, email, _id } = req.user;
  const addressData = req.body;
  const cart = await DAOCarts.getCartById(cart_id);
  const dtoCart = new CartDTO(cart.products);
  const dtoOrder = new OrderDTO(dtoCart, addressData, fullname, email, _id);

  try {
    const order = await DAOOrders.saveOrder(dtoOrder);
    console.log("ORDER HTML", order);
    await DAOCarts.emptyCart(cart._id);

    const html = `<div id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body ">
                    <div class="text-right"> <i class="fa fa-close close" data-dismiss="modal"></i> </div>
                    <div class="px-4 py-5">
                        <small class="theme-color" style="color: rgba(25, 25, 25, .3)">order id ${
                          order._id
                        }
                        </small>
                        <h5 class="text-uppercase">
                        ${order.owner}
                        </h5>
                        <h4 class="mt-5 theme-color mb-5">Thanks for your order</h4>
                        <div>
                            <small class="theme-color">Date: ${
                              order.date
                            }</small>
                        </div>
                        <span class="theme-color">Payment Summary</span>
                        <div class="mb-3">
                            <hr class="new1">
                        </div>
                        //! MAPPING PRODUCTS
                        ${order.products.map((item) => {
                          return `<div class="d-flex justify-content-between">
                                <span class="font-weight-bold">
                                    ${item.title} (Qty: ${item.qty} )
                                </span>
                                <span class="text-muted">$ ${
                                  item.price * item.qty
                                } </span>
                            </div>`;
                        })}
                        //! MAPPING PRODUCTS 
                                <div class="d-flex justify-content-between">
                                    <small>Shipping <span style="color: rgba(25, 25, 25, .3)">(Free for purchases over
                                            7000)
                                        </span>
                                    </small>
                                    <small>$${order.shipment}</small>
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <span class="font-weight-bold">Total</span>
                                    <span class="font-weight-bold theme-color">$${
                                      order.total
                                    }</span>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    await sendMailEth(email, "Your order", html);
    res.render("succes_order", { order: order });
  } catch (error) {
    throw new Error(error);
  }
};

export default controller;
