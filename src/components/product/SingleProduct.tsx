import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { TextScramble } from '../ui/text-scramble';
import { TProduct } from './AllProducts';
import { ScrollReveal } from '@/components/ScrollReveal';
import toast from 'react-hot-toast';
import { addToCart } from '@/redux/Features/products/cart.api';
import { useDispatch } from 'react-redux';
import { ProductCategory } from '@/types/global';

const SingleProduct = ({ product }: { product: TProduct }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event bubbling

    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        brand: product.brand,
        category: product.category as ProductCategory,
        imageUrl: product.image,
        inStock: product.inStock,
        description: product.description,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <ScrollReveal direction='fade' delay={0.2}>
      <Card key={product._id} className='flex flex-col h-full'>
        <Link to={`/api/products/${product._id}`}>
          <CardHeader>
            <div className='flex items-center justify-between w-full'>
              <CardTitle>{product.name}</CardTitle>
              <Badge variant='secondary'>{product.brand}</Badge>
            </div>
            <CardDescription className='line-clamp-2'>
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-grow'>
            <div className='w-full h-48 overflow-hidden rounded-md'>
              <img
                src={product.image}
                alt={`${product.name} image`}
                className='object-cover w-full h-full'
                onError={(e) => {
                  e.currentTarget.src =
                    'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=';
                  console.error('Image failed to load:', product.image);
                }}
              />
            </div>
          </CardContent>
        </Link>

        <CardFooter className='flex items-center justify-between mt-auto'>
          <div className='flex items-center justify-between text-lg'>
            ৳
            <TextScramble className='text-lg font-semibold'>
              {product.price.toString()}
            </TextScramble>
          </div>
          <Button
            variant='ghost'
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </ScrollReveal>
  );
};

export default SingleProduct;
