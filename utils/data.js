import bcrypt from 'bcryptjs';

const data ={
    users :[

        {
            name : 'Pravin',
            email : 'pkd@gmail.com',
            password : bcrypt.hashSync('123456'),
            isAdmin : true,
        },

        
        {
            name : 'Swastik',
            email : 'swastik@gmail.com',
            password : bcrypt.hashSync('1234'),
            isAdmin : true,
        }
    ],
    products: [
    {
        name : 'Ladies Top Black',
        slug: 'ladies-top1',
        category: 'shirt',
        image: '/images/1.png',
        price : 70,
        brand : 'Nike',
        rating: 4.5,
        numReviews : 8,
        countInStock : 10,
        description : 'A Nice Looking Shirt',
    },
    {
        name : 'Ladies Top2',
        slug: 'ladies-top2',
        category: 'shirt',
        image: '/images/2.png',
        price : 70,
        brand : 'Nike',
        rating: 4.5,
        numReviews : 8,
        countInStock : 10,
        description : 'A Nice Looking Shirt',
    },
    {
        name : 'Ladies Top3',
        slug: 'ladies-top3',
        category: 'shirt',
        image: '/images/3.png',
        price : 70,
        brand : 'Nike',
        rating: 4.5,
        numReviews : 8,
        countInStock : 20,
        description : 'A Nice Looking Shirt',
    },
    {
        name : 'Ladies Top4',
        slug: 'ladies-top',
        category: 'shirt',
        image: '/images/4.png',
        price : 70,
        brand : 'Nike',
        rating: 4.5,
        numReviews : 8,
        countInStock : 20,
        description : 'A Nice Looking Shirt',
    }
],
}
export default data;