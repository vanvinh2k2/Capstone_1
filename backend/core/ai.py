from ultralytics import YOLO
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from PIL import Image
from rest_framework import status, permissions
from core.models import *
from core.serializers import *
from django.db.models import Avg

import pandas as pd #xử lý và phân tích dữ liệu có cấu trúc
# Term Frequency-Inverse Document Frequency
from sklearn.feature_extraction.text import TfidfVectorizer # chuyển đổi một tập hợp các văn bản thành ma trận Tfidf
from sklearn.metrics.pairwise import linear_kernel
from collections import Counter

# AI find the food from Image
def search_restaurants(restaurants, query):
    all_data = restaurants['product_name'] + [query]
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(all_data)
    cosine_similarities = linear_kernel(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
    # .flatten(): Chuyển ma trận kết quả thành mảng một chiều để thuận tiện khi làm việc với nó.
    # để tính toán kernel tuyến tính (tương đương với cosine similarity khi sử dụng ma trận Tfidf) giữa dòng cuối cùng 
    similarities_with_names = list(zip(restaurants['product_name'], restaurants['did'], restaurants['like'], restaurants['is_featured'], restaurants['rating'], cosine_similarities))
    # list(zip(...)): Kết hợp thông tin từ cột product_name, did, like, is_featured, rating của DataFrame restaurants với giá trị cosine similarities.
    result = []
    for name, pid, like, is_featured, rating, similarity in similarities_with_names:
        if similarity > 0.5:
            result.append({'product_name': name, 'did': pid, 'like': like, 'is_featured': is_featured, 'rating': rating})
    return result

def avg_rating(restaurant):
    avg_rating = RestaurantReview.objects.filter(restaurant=restaurant).aggregate(Avg('rating'))
    if avg_rating is not None: return avg_rating['rating__avg']
    else: return 0

def default_value(value, default):
    return value if value is not None else default

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def search_restaurant_image(request):
    uploaded_image = request.FILES.get('image')
    # Sử dụng PIL để chuyển đổi ảnh thành hình ảnh
    image = Image.open(uploaded_image)
    try:
        model = YOLO("best.pt")
        result = model(image, stream=True)
        dataOrder = {
            'product_name' : [],
            'did': [],
            'is_featured': [],
            'rating': [],
            'like': []
        }
        dish_data = ""
        for r in result:
            boxes = r.boxes.numpy() #lay sử dụng tọa độ
            data = r.names #Lấy tên của đối tượng
            for box in boxes:
                a = int(box.cls[0]) # Lấy lớp (class) của hộp giới hạn hiện tại
                dish_data = data[a] #Dùng chỉ số a để truy xuất tên của đối tượng được dự đoán từ danh sách data

        restaurants = Restaurant.objects.all()
        for restaurant in restaurants:
            dishes = Dish.objects.filter(restaurant=restaurant)
            for dish in dishes:
                dataOrder['product_name'].append(dish.title)
                dataOrder['did'].append(dish.did)
                dataOrder['is_featured'].append(dish.featured)
                dataOrder['like'].append(restaurant.like)
                dataOrder['rating'].append(avg_rating(restaurant))

        results = search_restaurants(dataOrder, dish_data)
        # sorted_results = sorted(results, key=lambda x: (x['is_featured'], x['rating'], x['like']), reverse=True)
        sorted_results = sorted(results, key=lambda x: (
            default_value(x['is_featured'], 0),
            default_value(x['rating'], 0),
            default_value(x['like'], 0)
        ), reverse=True)

        restaurant_results = []
        for result in sorted_results:
            dish = Dish.objects.get(did=result['did'])
            serialize = DishesSerializers(dish, context={'request': request})
            restaurant_results.append(serialize.data)
                    
        return Response({
            'success': True,
            'message': "Search successfully.",
            'data': {
                'result': dish_data,
                # 'reliability': round(float(box.conf) * 100),
                'restaurant': restaurant_results
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print(str(e), " ok");
        return Response({
            'success': False,
            'message': str(e)
        }, status=status.HTTP_200_OK)
    

# AI suggest the the food
def find_similarities(dataRestaurant, dataOrder):
    data = pd.DataFrame(dataOrder)
    data['order_date'] = pd.to_datetime(data['order_date'])
    # Sắp xếp DataFrame theo 'order_date' giảm dần
    data = data.sort_values(by='order_date', ascending=False)
    # Lấy 5 sản phẩm được đặt nhiều nhất
    top_products = [item[0] for item in Counter(data['product_name']).most_common(5)]
    # print(top_products)
    result = []
    for product in top_products:
        all_data = dataRestaurant['dataAll'] + [product]
        # Tạo ma trận TF-IDF cho các sản phẩm loại bỏ từ dừng
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf_vectorizer.fit_transform(all_data)
        # Sử dụng linear_kernel để tính toán độ tương đồng giữa "xxxx" và tất cả các sản phẩm khác
        cosine_similarities = linear_kernel(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
        # tfidf_matrix[-1]: Đây là cách truy cập dòng cuối cùng của tfidf_matrix
        # tfidf_matrix[:-1]: Đây là cách truy cập tất cả các dòng của tfidf_matrix trừ dòng cuối cùng
        # print(cosine_similarities)
        # Xây dựng danh sách các cặp (tên món ăn, độ tương đồng cosine)
        similarities_with_names = list(zip(dataRestaurant['dataAll'], dataRestaurant['did'], cosine_similarities))
        # In ra danh sách các món ăn và độ tương đồng cosine tương ứng
        
        for dataAll, did, similarity in similarities_with_names:
            if similarity >= 0.4:
                result.append({'did': did, 'title': dataAll})
    return result


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def suggest_food(request, *args, **kwargs):
    uid = kwargs.get('uid')
    user = User.objects.get(id=uid)
    rid = kwargs.get('rid')
    restaurant = Restaurant.objects.get(rid=rid)
    dataRestaurant = {
        'did': [],
        'dataAll': []
    }
    dataOrder = {
        'product_name': [],
        'order_date': []
    }
    orders = Order.objects.filter(user=user)
    for order in orders:
        orderItems = OrderItem.objects.filter(order=order)
        for item in orderItems:
            dataOrder['product_name'].append(item.dish.title)
            dataOrder['order_date'].append(order.order_date.strftime("%Y-%m-%d"))
    
    dishes = Dish.objects.filter(restaurant=restaurant)
    for dish in dishes:
        dataRestaurant['dataAll'].append(dish.title)
        dataRestaurant['did'].append(dish.did)
    
    # print(dataRestaurant['dataAll'])
    # print(dataOrder)
    data = find_similarities(dataRestaurant, dataOrder)
    # print(data)

    return Response({
            'success': True,
            'message': 'Suggest Successful.',
            'data': data
        }, status=status.HTTP_200_OK)