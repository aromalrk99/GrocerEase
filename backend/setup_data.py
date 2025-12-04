import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'grocerease.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import UserProfile, Product, Cart, Order, OrderItem
import uuid

User.objects.all().delete()
UserProfile.objects.all().delete()
Product.objects.all().delete()
Cart.objects.all().delete()
Order.objects.all().delete()
OrderItem.objects.all().delete()

customer_user = User.objects.create_user(
    username='customer',
    email='customer@example.com',
    password='123456',
    first_name='John',
    last_name='Doe'
)
customer_profile = UserProfile.objects.create(
    user=customer_user,
    role='customer',
    phone='555-202-4455',
    address='42 Elm Street'
)
Cart.objects.create(user=customer_user)

staff_user = User.objects.create_user(
    username='staff',
    email='staff@example.com',
    password='staff123',
    first_name='Jane',
    last_name='Smith'
)
UserProfile.objects.create(
    user=staff_user,
    role='staff',
    phone='555-112-8899',
    address='123 Staff Avenue'
)
Cart.objects.create(user=staff_user)

customer_user2 = User.objects.create_user(
    username='customer2',
    email='customer2@example.com',
    password='123456',
    first_name='Alice',
    last_name='Johnson'
)
customer_profile2 = UserProfile.objects.create(
    user=customer_user2,
    role='customer',
    phone='555-987-6543',
    address='789 Oak Avenue'
)
Cart.objects.create(user=customer_user2)

products_data = [
    ('Apples', 'Fresh red apples from local orchards', 3.99, 50, 'Fruits', 'https://via.placeholder.com/300?text=Apples'),
    ('Bananas', 'Ripe yellow bananas rich in potassium', 2.49, 80, 'Fruits', 'https://via.placeholder.com/300?text=Bananas'),
    ('Oranges', 'Sweet and juicy oranges perfect for juice', 4.99, 40, 'Fruits', 'https://via.placeholder.com/300?text=Oranges'),
    ('Strawberries', 'Fresh red strawberries with sweet taste', 5.99, 30, 'Fruits', 'https://via.placeholder.com/300?text=Strawberries'),
    ('Grapes', 'Seedless green grapes fresh from farm', 6.99, 25, 'Fruits', 'https://via.placeholder.com/300?text=Grapes'),
    ('Watermelon', 'Large juicy watermelon perfect for summer', 7.99, 15, 'Fruits', 'https://via.placeholder.com/300?text=Watermelon'),
    ('Tomatoes', 'Ripe red tomatoes fresh from garden', 3.49, 60, 'Vegetables', 'https://via.placeholder.com/300?text=Tomatoes'),
    ('Carrots', 'Orange carrots packed with vitamins', 2.99, 70, 'Vegetables', 'https://via.placeholder.com/300?text=Carrots'),
    ('Broccoli', 'Fresh green broccoli florets', 3.99, 35, 'Vegetables', 'https://via.placeholder.com/300?text=Broccoli'),
    ('Lettuce', 'Crisp green lettuce perfect for salads', 2.49, 45, 'Vegetables', 'https://via.placeholder.com/300?text=Lettuce'),
    ('Bell Peppers', 'Colorful bell peppers red and yellow', 4.49, 40, 'Vegetables', 'https://via.placeholder.com/300?text=BellPeppers'),
    ('Onions', 'Sweet onions for cooking and flavoring', 1.99, 90, 'Vegetables', 'https://via.placeholder.com/300?text=Onions'),
    ('Chicken Breast', 'Fresh boneless skinless chicken breast', 8.99, 25, 'Meat', 'https://via.placeholder.com/300?text=ChickenBreast'),
    ('Ground Beef', 'Lean ground beef for burgers and tacos', 9.99, 20, 'Meat', 'https://via.placeholder.com/300?text=GroundBeef'),
    ('Salmon Fillet', 'Fresh salmon fillet rich in omega-3', 14.99, 15, 'Meat', 'https://via.placeholder.com/300?text=SalmonFillet'),
    ('Pork Chops', 'Thick cut pork chops ready to cook', 10.99, 18, 'Meat', 'https://via.placeholder.com/300?text=PorkChops'),
    ('Turkey Breast', 'Fresh turkey breast for healthy meals', 11.99, 12, 'Meat', 'https://via.placeholder.com/300?text=TurkeyBreast'),
    ('Milk', 'Fresh whole milk one gallon', 3.49, 50, 'Dairy', 'https://via.placeholder.com/300?text=Milk'),
    ('Cheese', 'Sharp cheddar cheese block', 6.99, 30, 'Dairy', 'https://via.placeholder.com/300?text=Cheese'),
    ('Yogurt', 'Greek yogurt plain flavor', 4.99, 40, 'Dairy', 'https://via.placeholder.com/300?text=Yogurt'),
    ('Butter', 'Unsalted butter premium quality', 5.49, 35, 'Dairy', 'https://via.placeholder.com/300?text=Butter'),
    ('Eggs', 'Dozen large brown eggs', 3.99, 60, 'Dairy', 'https://via.placeholder.com/300?text=Eggs'),
    ('Bread', 'Whole wheat bread fresh baked', 2.99, 50, 'Bakery', 'https://via.placeholder.com/300?text=Bread'),
    ('Croissants', 'Butter croissants pack of four', 4.99, 20, 'Bakery', 'https://via.placeholder.com/300?text=Croissants'),
    ('Bagels', 'Plain bagels half dozen', 3.99, 25, 'Bakery', 'https://via.placeholder.com/300?text=Bagels'),
    ('Muffins', 'Blueberry muffins pack of six', 5.99, 15, 'Bakery', 'https://via.placeholder.com/300?text=Muffins'),
    ('Donuts', 'Glazed donuts half dozen', 4.49, 30, 'Bakery', 'https://via.placeholder.com/300?text=Donuts'),
    ('Orange Juice', 'Fresh squeezed orange juice', 4.99, 40, 'Beverages', 'https://via.placeholder.com/300?text=OrangeJuice'),
    ('Coffee', 'Premium ground coffee medium roast', 7.99, 25, 'Beverages', 'https://via.placeholder.com/300?text=Coffee'),
    ('Tea', 'Organic green tea bags pack of twenty', 5.99, 30, 'Beverages', 'https://via.placeholder.com/300?text=Tea'),
    ('Soda', 'Cola twelve pack cans', 6.99, 35, 'Beverages', 'https://via.placeholder.com/300?text=Soda'),
    ('Water', 'Bottled water pack of twenty-four', 3.99, 60, 'Beverages', 'https://via.placeholder.com/300?text=Water'),
    ('Chips', 'Classic potato chips large bag', 3.49, 50, 'Snacks', 'https://via.placeholder.com/300?text=Chips'),
    ('Cookies', 'Chocolate chip cookies pack of twelve', 4.99, 40, 'Snacks', 'https://via.placeholder.com/300?text=Cookies'),
    ('Nuts', 'Mixed nuts unsalted one pound', 8.99, 20, 'Snacks', 'https://via.placeholder.com/300?text=Nuts'),
    ('Granola Bars', 'Honey granola bars pack of ten', 5.49, 35, 'Snacks', 'https://via.placeholder.com/300?text=GranolaBar'),
    ('Popcorn', 'Microwave popcorn pack of six', 3.99, 45, 'Snacks', 'https://via.placeholder.com/300?text=Popcorn'),
    ('Ice Cream', 'Vanilla ice cream half gallon', 4.99, 25, 'Frozen Food', 'https://via.placeholder.com/300?text=IceCream'),
    ('Frozen Vegetables', 'Mixed vegetables frozen bag', 3.99, 35, 'Frozen Food', 'https://via.placeholder.com/300?text=FrozenVegetables'),
    ('Frozen Pizza', 'Pepperoni frozen pizza', 6.99, 20, 'Frozen Food', 'https://via.placeholder.com/300?text=FrozenPizza'),
    ('Frozen Berries', 'Mixed berries frozen bag', 5.99, 15, 'Frozen Food', 'https://via.placeholder.com/300?text=FrozenBerries'),
    ('Frozen Fish', 'Cod fillets frozen bag', 7.99, 12, 'Frozen Food', 'https://via.placeholder.com/300?text=FrozenFish'),
    ('Paper Towels', 'Paper towels six pack rolls', 9.99, 40, 'Essentials', 'https://via.placeholder.com/300?text=PaperTowels'),
    ('Toilet Paper', 'Toilet paper twelve pack rolls', 12.99, 50, 'Essentials', 'https://via.placeholder.com/300?text=ToiletPaper'),
    ('Soap', 'Bar soap pack of three', 5.99, 60, 'Essentials', 'https://via.placeholder.com/300?text=Soap'),
    ('Shampoo', 'Hair shampoo bottle', 6.99, 35, 'Essentials', 'https://via.placeholder.com/300?text=Shampoo'),
    ('Detergent', 'Laundry detergent large bottle', 8.99, 30, 'Essentials', 'https://via.placeholder.com/300?text=Detergent'),
]

for name, desc, price, stock, category, image in products_data:
    Product.objects.create(
        name=name,
        description=desc,
        price=price,
        stock=stock,
        category=category,
        image_url=image,
        nutritional_info={
            'calories': 100,
            'protein': '5g',
            'carbs': '15g',
            'fat': '2g'
        }
    )

for i in range(10):
    order = Order.objects.create(
        user=customer_user,
        order_id=f"ORD-{uuid.uuid4().hex[:8].upper()}",
        status=['Pending', 'Packed', 'Shipped', 'Delivered'][i % 4],
        total=50 + i * 10,
        shipping_address='42 Elm Street',
        payment_method='Card'
    )
    for j in range(3, 6):
        product = Product.objects.all()[j]
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=2 + i % 3,
            price=product.price
        )

print("Database populated successfully!")
