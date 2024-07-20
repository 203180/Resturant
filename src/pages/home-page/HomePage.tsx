import {Box, CircularProgress, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store";
import Default_Cover from "../../images/default_location_cover.jpg"
import Default_Logo from "../../images/default_location_logo.jpg"
import Call_Icon from "../../styles/icons/call.svg"
import Find_Icon from "../../styles/icons/find.svg"
import Share_Icon from "../../styles/icons/share.svg"
import Message_Icon from "../../styles/icons/message_icon.png"
import './home-page.scss'
import {setCategories, setIsCategoriesLoading, setSelectedCategory} from "../../redux/slices/CategoriesSlice";
import {useEffect} from "react";
import {fetchLocations} from "../../repositories/locationRepository";
import {Location} from "../../types/Location";
import {setIsLocationLoading, setLocations} from "../../redux/slices/LocationSlice";
import {fetchCategories} from "../../repositories/categoriesRepository";
import {Category} from "../../types/Category";
import {Link} from "react-router-dom";
import {selectCategoriesData} from "../../redux/selectors/categoriesSelectors";
import {Loader} from "../../shared/components/loader/Loader";
import Default from '../../images/no_image_available.png'

export const HomePage = () => {

    const dispatch: AppDispatch = useDispatch();

    const location: Location = useSelector((state: RootState) => state.location.location);

    const isLocationLoading = useSelector((state: RootState) => state.location.isLoading);

    const areCategoriesLoading = useSelector((state: RootState) => state.categories.isLoading);

    const categories: Category[] = useSelector((state: RootState) => state.categories.categories);

    useEffect(() => {
        if (location.name === '') {
            dispatch(setIsLocationLoading(true));
            fetchLocations()
                .then((data: Location) => dispatch(setLocations(data)))
                .then(() => dispatch(setIsLocationLoading(false)));
        }
        if (categories.length === 0) {
            dispatch(setIsCategoriesLoading(true));
            fetchCategories()
                .then((data: Category[]) => {
                    console.log('data', data)
                    dispatch(setCategories(data))
                })
                .then(() => dispatch(setIsCategoriesLoading(false)));
        }
    }, [])


    return <>
        <Box id='home-page-wrapper'>
            {isLocationLoading || areCategoriesLoading
                ?
                <Loader/>
                :
                <Box className='home-page-container'>
                    <img src={location.cover ? location.cover : Default} alt={location.name}
                         className='cover-image'/>
                    <Box className='container main-info-container'>
                        <img src={location.logo ? location.logo : Default} alt='logo' className='location-logo'/>
                        <Box className='main-info-content'>
                            <Typography className='location-name'>{location.name}</Typography>
                            <Typography className='text medium'>{location.active ? 'Open Now' : 'Closed'}</Typography>
                        </Box>
                    </Box>
                    <Box className='container'>
                        <Typography className='text medium'>{location.description}</Typography>
                    </Box>
                    <Box className='container buttons-container'>
                        <Box className='button'>
                            <img src={Call_Icon} alt='call-icon' className='icon'/>
                            <Typography variant='body1' className='text'>Call Restaurant</Typography>
                        </Box>
                        <Box className='button'>
                            <img src={Find_Icon} alt='call-icon' className='icon'/>
                            <Typography className='text'>Find Restaurant</Typography>
                        </Box>
                        <Box className='button'>
                            <img src={Share_Icon} alt='call-icon' className='icon'/>
                            <Typography className='text'>Share</Typography>
                        </Box>
                        <Box className='button'>
                            <img src={Message_Icon} alt='call-icon' className='icon'/>
                            <Typography className='text'>Message</Typography>
                        </Box>
                    </Box>
                    <Box className='menu-container'>
                        <Typography fontWeight='bold' variant='h5'>Menu</Typography>
                        <Box className='menu-categories-container'>
                            {categories.map((category, index) => (
                                <Box className='menu-category' key={category.id}>
                                    <Link to='/items' onClick={() => dispatch(setSelectedCategory(index))}>
                                        <Typography className='category-name'>{category.name}</Typography>
                                        <img src={category.logo} alt={category.name} className='category-image'/>
                                    </Link>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            }

        </Box>
    </>
}