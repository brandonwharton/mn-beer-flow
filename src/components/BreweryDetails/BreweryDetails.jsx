import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// Material-UI components
import Typography from '@material-ui/core/Typography';


// BreweryDetails is a details page that fetches data for a single brewery from the DB and renders it
function BreweryDetails() {
    const dispatch = useDispatch();
    // hold database ID for page that was navigated to
    const { id } = useParams();
    // access data from brewery reducer, data comes in as an array with one element
    const brewery = useSelector(store => store.breweryList[0]);

    // on navigation to specific details page, fetch details for specified brewery
    useEffect(()=> {
        dispatch({ type: 'FETCH_SINGLE_BREWERY', payload: id });
    }, []);

    console.log(brewery);
    return (
        <div>
            <Typography variant="h3" component="h3">
                {brewery?.name}
            </Typography>
        </div>
    )
}

export default BreweryDetails;