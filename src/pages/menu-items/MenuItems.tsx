import './menu-items.scss'
import {Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store";
import Arrow from '../../styles/icons/arrow.png'
import Default_Cover from "../../images/default_location_cover.jpg"
import {useEffect} from "react";
import {fetchProducts} from "../../repositories/productsRepository";
import {expandPhoto, setAreProductsLoading, setProducts} from "../../redux/slices/ProductsSlice";
import {Loader} from "../../shared/components/loader/Loader";
import Default from '../../images/no_image_available.png'


export const MenuItems = () => {
    const dispatch: AppDispatch = useDispatch();
    const category = useSelector((state: RootState) => state.categories.selectedCategory)
    const products = useSelector((state: RootState) =>
        state.products.products.filter(product => category && product.category_id === category.id)
    )
    const isLoading = useSelector((state: RootState) => state.products.isLoading);

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(setAreProductsLoading(true));
        fetchProducts()
            .then(data => dispatch(setProducts(data)))
            .then(() => dispatch(setAreProductsLoading(false)));
    }, []);

    return <Box id='menu-item-wrapper'>
        {isLoading
            ?
            <Loader/>
            :
            <Box className='menu-item-container'>
                <Box className='header'>
                    <Link to='/'>
                        <img src={Arrow} alt='back' className='arrow-left'/>
                    </Link>
                    <Typography variant='h5' fontWeight='bold'>{category ? category.name : ''}</Typography>
                    <Link to='/'>
                        <img src={Default_Cover} alt='logo' className='logo'/>
                    </Link>
                </Box>
                <Box className='content'>
                    {products.map((product) => (
                        <Box key={product.id} className='item-wrapper' onClick={() => {
                            dispatch(expandPhoto(product.id))
                        }}>
                            <img src={product.logo ? product.logo : Default} alt='product-image'
                                 className={!product.is_photo_expanded ? 'item-image hide' : 'item-image show'}/>
                            <Box className='item-content'>
                                <img src={Arrow}
                                     className={!product.is_photo_expanded ? 'arrow-interactive' : 'arrow-interactive down'}/>
                                <Box className='title'>
                                    <Typography fontWeight='bold'>{product.name}</Typography>
                                    <Typography fontWeight='bold'>{product.price} $</Typography>
                                </Box>
                                <Typography variant='body2'>{product.description}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        }
    </Box>
}