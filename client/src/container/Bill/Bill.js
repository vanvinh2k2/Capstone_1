import BillOrder from "./BillOrder.js/BillOrder";
import BillUser from "./BillUser/BillUser";
import { useState, useEffect, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getBill } from "../../action/bill";
import {useParams} from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Bill() {
    const bill = useSelector(state=>state.bill.bill);
    const dispatch = useDispatch();
    const {oid} = useParams();
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const pdfRef = useRef();

    useEffect(()=>{
        setOrder(bill.order);
        setOrderItems(bill.orderItems);
    },[bill])

    useEffect(()=>{
        async function getbill(){
            const action = await getBill(oid);
            dispatch(action)
        }
        getbill();
    }, [])

    function downloadPDF(){
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 30) / imgHeight);
            const imgX = 10;
            const imgY = 15;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('invoice.pdf');
        });
    }

    return ( 
        <div className="container the_bill">
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <h3 className="left"> Customer's Billing</h3>
                </div>
            </div>
            <div className="row line" ref={pdfRef}>
                <div className="bill">
                    <h2 className="center">The Bill of Customer</h2>
                    <BillUser order={order!==null?order:{}}/>
                    <BillOrder orderItems={orderItems!==null?orderItems:[]} order={order!==null?order:{}}/>
                </div>
            </div>
            <div className="print">
                <button className="btn text-light" onClick={downloadPDF}>Download PDF</button>
            </div>
        </div>
     );
}

export default Bill;