import Sidebar from "../components/Sidebar/Sidebar";
function LayoutDefault({children}) {
    return ( 
        <div>
            <Sidebar/>
            <section id="content">
                {children}
            </section>
        </div>
     );
}

export default LayoutDefault;