function Pagniation({page, setPage, count}) {
    function handelPrev(){
        setPage(page<=1?1:page-1)
    }

    function handelNext(){
        setPage(page>=Math.ceil(count/12)?page:page+1)
    }

    return ( 
        <div>
            <nav aria-label="...">
                <ul className="pagination d-flex align-items-center justify-content-center my-3">
                    <span className="mx-4">Showing {page} to {Math.ceil(count/12)} of {count} Records</span>
                    <li className="page-item pointer">
                        <span className="page-link" onClick={handelPrev}>Previous</span>
                    </li>
                    <li className="page-item pointer">
                        <span className="page-link" onClick={handelNext}>Next</span>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default Pagniation;