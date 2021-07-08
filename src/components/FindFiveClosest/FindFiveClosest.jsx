// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import GetUserLocation from '../GetUserLocation/GetUserLocation';
// Material-UI components
import Button from '@material-ui/core/Button';


// component that finds the five closest breweries to the user's current location and displays them

function FindFiveClosest() {
    const dispatch = useDispatch();
    // look at reducer that's holding user's geographical coordinates
    const userLocation = useSelector(store => store.location.userLocation);

    const allBreweries = useSelector(store => store.breweries.allBreweries);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_BREWERIES' });
    }, []);



    console.log(userLocation);
    if (allBreweries.length === 176) {
        console.log(allBreweries);
    } else {
        console.log('no data yet');
    }

    return (
        <div>

        </div>
    )
}


export default FindFiveClosest;