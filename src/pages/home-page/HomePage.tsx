import {Box, Divider, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store";
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
import {Loader} from "../../shared/components/loader/Loader";
import Default from '../../images/no_image_available.png'
import Report_Icon from '../../styles/icons/report.svg'

export const HomePage = () => {

    const dispatch: AppDispatch = useDispatch();

    const location: Location = useSelector((state: RootState) => state.location.location);

    const isLocationLoading = useSelector((state: RootState) => state.location.isLoading);

    const areCategoriesLoading = useSelector((state: RootState) => state.categories.isLoading);

    const categories: Category[] = useSelector((state: RootState) => state.categories.categories);

    const handleMessageClick = () => {
        const name = location.name.split(' ').join('_');
        window.location.href = `mailto:${name}@qpick.io?subject=Reservation&body=Hi ${location.name}, I would like to make a reservation.`;
    }

    const handleShareClick = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('Link copied to clipboard!');
            })
    }

    const handleCallClick = () => {
        // here i would put the phone number of the location but the mock data did not have a phone number in it so i put random numbers
        window.location.href = `tel:12345678`;
    }

    const handleFindClick = () => {
        // same here, so i put the coordinates of random location in Skopje
        const latitude = 41.9991;
        const longitude = 21.4254;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');
    }

    const buttons = [
        {
            imageSrc: Call_Icon,
            text: 'Call Restaurant',
            clickHandler: handleCallClick
        },
        {
            imageSrc: Find_Icon,
            text: 'Find Restaurant',
            clickHandler: handleFindClick
        },
        {
            imageSrc: Share_Icon,
            text: 'Share',
            clickHandler: handleShareClick
        },
        {
            imageSrc: Message_Icon,
            text: 'Message',
            clickHandler: handleMessageClick
        }
    ]


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
                        {buttons.map((button, index) => (
                            <Box className='button' key={index} onClick={() => button.clickHandler()}>
                                <img src={button.imageSrc} alt={button.text} className='icon'/>
                                <Typography variant='body1' className='text'>{button.text}</Typography>
                            </Box>
                        ))}
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
                    <Box className='footer'>
                        <Divider className='divider'/>
                        <Typography variant='body2' className='text'>You don't like what you see?</Typography>
                        <Link className='link' to="mailto:info@qpick.io?subject=Report Restaurant&body=Hi QX menu, I want to report this restaurant.">
                            <Box className='report-button'>
                                <img src={Report_Icon} alt='report' className='report-icon'/>
                                <Typography className='text'>REPORT</Typography>
                            </Box>
                        </Link>
                    </Box>
                </Box>
            }

        </Box>
    </>
}