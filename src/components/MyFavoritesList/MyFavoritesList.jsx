// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material-UI components
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// components
import MyFavoritesItem from '../MyFavoritesItem/MyFavoritesItem';


// Material-UI styles
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
}));

// "Home Page" component after login that shows the user their list of breweries they've marked as favorite
function MyFavoritesList() {
    // use the correct Material-UI styles
    const classes = useStyles();

    const dispatch = useDispatch();
    // access data from brewery reducer
    const favoriteBreweryList = useSelector(store => store.breweryList)
    // states for handling the search input and the filtered search results array
    const [searchInput, setSearchInput] = useState('');
    const [searchedArray, setSearchedArray] = useState([]);

    // on page load, get user's favorites
    useEffect(() => {
        // dispatch brewery saga to GET any breweries marked as user favorites
        dispatch({ type: 'FETCH_USER_FAVORITES' });
    }, [])


    // change handler for search input
    const handleChange = (event) => {
        // adjust search input state on input change
        setSearchInput(event.target.value);
    }

    // submit handler for the search favorites feature
    const handleSearch = () => {
        // filter through the favoriteBreweryList array looking for search matches to a brewery name
        const tempArray = favoriteBreweryList.filter(brewery => {
            console.log('brewery names', brewery.name);
            // return any name matches ignoring case
            if (brewery.name.toUpperCase().includes(searchInput.toUpperCase())) {
                return brewery;
            }
        })
        // set the searchedArray state to the filtered array
        setSearchedArray(tempArray);
        // clear input
        setSearchInput('');
    }

    // conditional rendering for search results
    const renderFavorites = () => {
        if (searchedArray.length !== 0) {
            favoriteBreweryList?.map(brewery => {
                return <MyFavoritesItem key={brewery.id} brewery={brewery}/>
            })
        }
    }

    console.log(searchedArray);
    return (
        <div>
            <Typography variant="h3" component="h3">
                My Favorites
            </Typography>
            <FormControl onSubmit={handleSearch}>
                <TextField 
                    label="search favorites"
                    helperText="by name only"
                    value={searchInput}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </FormControl>
            <Grid container className={classes.root} spacing={2} justify={'center'}>
                <Grid item xs={10}>
                    {/* conditionally render either the full list of user favorites or the search results if a search was done */}
                    {renderFavorites()}
                    {searchedArray.length === 0 ?
                        favoriteBreweryList?.map(brewery => (
                            <MyFavoritesItem key={brewery.id} brewery={brewery}/>
                        ))
                        :
                        searchedArray.map(brewery => (
                            <MyFavoritesItem key={brewery.id} brewery={brewery}/>
                        ))
                    }

                </Grid>
            </Grid>
        </div>

    )
}

export default MyFavoritesList;