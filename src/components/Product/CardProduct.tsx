import { Card } from 'flowbite-react'
import { Product } from '../../types/produc.type'
import Button from '../Button'
import useAuth from '../../hooks/auth/useAuth'


const CardProduct = ({name, price, sku, quantity, user }:Product) => {
    const {isAdmin} = useAuth()
    return (
        <Card
            imgAlt={name}
            imgSrc={`https://placehold.co/400x200/png?text=Product image ${name}`}
            className='shadow-lg'
        >
            <div className="text-gray-900 font-medium">
                <h5 className='text-lg leading-[normal] mb-2'>
                    {name} 
                </h5>
                <div className='flex gap-2'>
                    <span className='text-xs leading-3'>
                        <i className='bx bx-barcode'></i>
                        SKU: {sku}
                    </span>
                    <span className='text-xs leading-3'>
                        <i className='bx bx-receipt'></i>
                        STOCK: {quantity}
                    </span>
                </div>
            </div>
            <span className="text-lg font-bold text-gray-900 mb-2">${price}</span>
            {
                !isAdmin && (
                    <Button variant='secondary'>
                        Add to cart
                    </Button>
                )
            }
            {
                isAdmin && user?.email && (
                    <div className='text-xs italic text-gray-600'>
                         <p>
                            Created By {user?.name}
                         </p>
                         <p>
                            Email: {user?.email}
                         </p>
                    </div>
                )
            }
        </Card>
    )
}

export default CardProduct