const db = require('./models')
​
const seedDb = async () => {
  try {
    const dummyRestaurant = await db.Restaurant.create({
      restaurantName: "John's Pizzeria",
      restaurantDescription:
        'Famous for our delicious pizza and friendly service!',
      accountHolderName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      menu: [
        {
          sectionName: 'Pizza',
          products: [
            {
              name: 'Margherita',
              price: 15,
              description: 'Tomato sauce, mozzarella cheese, and basil',
              image: 'https://www.example.com/margherita.jpg'
            },
            {
              name: 'Pepperoni',
              price: 16,
              description:
                'Tomato sauce, mozzarella cheese, pepperoni, and herbs',
              image: 'https://www.example.com/pepperoni.jpg'
            }
          ]
        },
        {
          sectionName: 'Drinks',
          products: [
            {
              name: 'Coke',
              price: 3,
              description: 'Coca-Cola',
              image: 'https://www.example.com/coke.jpg'
            },
            {
              name: 'Sprite',
              price: 3,
              description: 'Lemon-lime soda',
              image: 'https://www.example.com/sprite.jpg'
            }
          ]
        }
      ],
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        zip: 12345
      },
      phone: 1234567890
    })
    console.log(dummyRestaurant)
    const dummyRestaurant2 = await db.Restaurant.create({
      restaurantName: "Mary's Kitchen",
      restaurantDescription: 'Serving up homestyle comfort food!',
      accountHolderName: 'Mary Smith',
      email: 'mary.smith@example.com',
      password: 'password456',
      menu: [
        {
          sectionName: 'Entrees',
          products: [
            {
              name: 'Fried Chicken',
              price: 12,
              description:
                'Crispy fried chicken with mashed potatoes and gravy',
              image: 'https://www.example.com/fried_chicken.jpg'
            },
            {
              name: 'Meatloaf',
              price: 13,
              description: 'Classic meatloaf with roasted vegetables',
              image: 'https://www.example.com/meatloaf.jpg'
            }
          ]
        },
        {
          sectionName: 'Sides',
          products: [
            {
              name: 'Mac and Cheese',
              price: 5,
              description: 'Creamy macaroni and cheese',
              image: 'https://www.example.com/mac_and_cheese.jpg'
            },
            {
              name: 'Cornbread',
              price: 4,
              description: 'Warm and sweet cornbread',
              image: 'https://www.example.com/cornbread.jpg'
            }
          ]
        }
      ],
      address: {
        street: '456 Elm St',
        city: 'Anothertown',
        state: 'Anotherstate',
        zip: 56789
      },
      phone: 9876543210
    })
    console.log(dummyRestaurant2)
    const dummyRestaurant3 = await db.Restaurant.create({
      restaurantName: "Speedy's Burgers",
      restaurantDescription: 'Fast food done right!',
      accountHolderName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      menu: [
        {
          sectionName: 'Burgers',
          products: [
            {
              name: 'Cheeseburger',
              price: 5,
              description:
                '100% beef patty topped with melted cheese and special sauce',
              image: 'https://www.example.com/cheeseburger.jpg'
            },
            {
              name: 'Double Cheeseburger',
              price: 7,
              description:
                'Two 100% beef patties topped with melted cheese and special sauce',
              image: 'https://www.example.com/double_cheeseburger.jpg'
            }
          ]
        },
        {
          sectionName: 'Fries',
          products: [
            {
              name: 'Small Fries',
              price: 2,
              description: 'Golden and crispy french fries',
              image: 'https://www.example.com/small_fries.jpg'
            },
            {
              name: 'Large Fries',
              price: 3,
              description: 'Golden and crispy french fries in a larger portion',
              image: 'https://www.example.com/large_fries.jpg'
            }
          ]
        },
        {
          sectionName: 'Drinks',
          products: [
            {
              name: 'Soft Drink',
              price: 2,
              description: 'Refreshing carbonated drink',
              image: 'https://www.example.com/soft_drink.jpg'
            },
            {
              name: 'Bottled Water',
              price: 1,
              description: 'Clean and crisp bottled water',
              image: 'https://www.example.com/bottled_water.jpg'
            }
          ]
        }
      ],
      address: {
        street: '123 Main St',
        city: 'Sometown',
        state: 'Somestate',
        zip: 12345
      },
      phone: 1234567890
    })
    console.log(dummyRestaurant3)
  } catch (error) {
    console.log(error)
  }
}
​
seedDb()