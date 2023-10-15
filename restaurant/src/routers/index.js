import Login from "../container/Login/Login";
import Dashboard from "../container/Dashboard/Dashboard";
import Table from "../container/Table/Table";
import Dish from "../container/Dish/Dish";
import ContactUs from "../container/ContactUs/ContactUs";
import Review from "../container/Review/Review";
import Setting from "../container/Setting/Setting";
import ChatMessage from "../container/ChatMessage/ChatMessage";
import AddDish from "../container/AddDish/AddDish";
import UpdateDish from "../container/UpdateDish/UpdateDish";
import AddTable from "../container/AddTable/AddTable";
import UpdateTable from "../container/UpdateTable/UpdateTable";
import OrderDetail from "../container/OrderDetail/OrderDetail";
import HistoryOrder from "../container/HistoryOrder/HistoryOrder";

const publicRouter = [
    {path: 'restaurant/', component: Dashboard},
    {path: 'restaurant/login', component: Login, layout: null},
    {path: 'restaurant/dish', component: Dish},
    {path: 'restaurant/table', component: Table},
    {path: 'restaurant/contact-us', component: ContactUs},
    {path: 'restaurant/review', component: Review},
    {path: 'restaurant/setting', component: Setting},
    {path: 'restaurant/add-dish', component: AddDish},
    {path: 'restaurant/order-detail', component: OrderDetail},
    {path: 'restaurant/update-dish', component: UpdateDish},
    {path: 'restaurant/add-table', component: AddTable},
    {path: 'restaurant/update-table', component: UpdateTable},
    {path: 'restaurant/chat-message', component: ChatMessage},
    {path: 'restaurant/history-order', component: HistoryOrder},
]

const privateRouter = [
    {}
]

export {publicRouter, privateRouter};