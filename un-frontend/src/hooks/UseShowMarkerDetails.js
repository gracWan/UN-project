import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const UseShowMarkerDetails = ({ place, onClose, show, setShow }) => {
    useEffect(() => {
        if (place) {
            setShow(true);
        }
    }, [place, setShow]);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    if (!place) return null;

    return (
        <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement="bottom" 
        className='markerDetails'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{place.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>{place.description || "No description available"}</p>
                <p>Address: {place.address}</p>
                <p>Contact: {place.phone || "No contact information provided"}</p>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default UseShowMarkerDetails;