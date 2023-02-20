import './footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="fLists">
            <ul className="fList">
                <li className="fListItem"><b>Countries</b></li>
                <li className="fListItem">India</li>
               
            </ul>
            <ul className="fList">
                <li className="fListItem"><b>Regions</b></li>
                <li className="fListItem">Tamil Nadu</li>
                <li className="fListItem">Kerala</li>
                <li className="fListItem">Karnataka</li>
                <li className="fListItem">Maharashtra</li>
                
            </ul>
            <ul className="fList">
                <li className="fListItem" ><b>Cities</b></li>
                <li className="fListItem">Coimbatore</li>
                <li className="fListItem">Karur</li>
                <li className="fListItem">Ooty</li>
                <li className="fListItem">Kodaikanal</li>
                <li className="fListItem">Trichy</li>
            </ul>
            <ul className="fList">
                <li className="fListItem"><b>Hotels</b></li>
                <li className="fListItem">New Karur Hotel</li>
                <li className="fListItem">Silver cascade Hotel</li>
                <li className="fListItem">Ooty Hotel</li>
                <li className="fListItem">Aloft Hotel</li>
                <li className="fListItem">Aditya Hotel</li>
            </ul>
            <ul className="fList">
                <li className="fListItem"><b>Airports</b></li>
                <li className="fListItem">Coimbatore</li>
                <li className="fListItem">Trichy</li>
            </ul>
        </div>
        <div className="fText">copyright © Simple Booking </div>
    </div>
  )
}

export default Footer