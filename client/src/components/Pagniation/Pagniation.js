function Pagniation({page, setPage, count}) {
    function handelPrev(){
        console.log(page)
        setPage(page<=1?1:page-1)
    }

    function handelNext(){
        console.log(page)
        setPage(page>=Math.ceil(count/12)?page:page+1)
    }

    return ( 
        <div>
            <nav aria-label="...">
                <ul class="pagination d-flex align-items-center justify-content-center my-3">
                    <span className="mx-4">Showing {page} to {Math.ceil(count/12)} of {count} Records</span>
                    <li class="page-item pointer">
                        {console.log(page)}
                        <span class="page-link" onClick={handelPrev}>Previous</span>
                    </li>
                    <li class="page-item pointer">
                        <span class="page-link" onClick={handelNext}>Next</span>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default Pagniation;