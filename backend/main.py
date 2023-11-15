# in_time = [7, 11, 16]
# out_time = [10, 15, 18]

# clock = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
# time = []
# # Khoi tao lich thoi gian da co order(1) và ko có order(0)
# def init(clock, in_time, out_time):
#     for i in clock: 
#         time.append(0)
#     for i in range(0, len(in_time)):
#         for j in clock:
#             if (j > in_time[i]) and (j <= out_time[i]):
#                 time[j] = 1

# init(clock, in_time, out_time)
# print(time)

# # Check xem don hang them vao co ai dat chua
# def check_time(a, b, time):
#     for i in range(0, len(time)):
#         if a < clock[i] <= b:
#             if time[i] == 1:
#                 return False
#     return True

# print(check_time(10,11,time))


# a= "12:15"
# h,p = a.split(":")
# print((int(h)*100+int(p))/100)

#####################################################################################################
# import nltk
# from nltk.tokenize import word_tokenize
# nltk.download('punkt')
# def search_restaurants(restaurants, query):
#     # Chuyển đổi tất cả tên nhà hàng và truy vấn thành chữ thường
#     restaurants_lower = [restaurant.lower() for restaurant in restaurants]
#     query_lower = query.lower()
#     # Tách từ trong truy vấn
#     words_in_query = word_tokenize(query_lower)
#     # Tìm kiếm truy vấn trong danh sách nhà hàng
#     found_restaurants = []
#     for restaurant in restaurants_lower:
#         # Tách từ trong tên nhà hàng
#         words_in_restaurant = word_tokenize(restaurant)
#         # Kiểm tra xem có từ nào trong truy vấn xuất hiện trong tên nhà hàng không
#         if any(word in words_in_restaurant for word in words_in_query):
#             found_restaurants.append(restaurant)
#     return found_restaurants
# restaurants_array = ['Mì Quảng', 'Bún chả cá', 'Nem lụi', 'Bún bò Huế', 'Gỏi cuốn', 'Lẩu mắm', 'Cơm niêu', 'Bánh mì Quảng', 'Hến xúc bánh tráng', 'Bánh tráng cuốn', 'Mì bò']

# result = search_restaurants(restaurants_array, "Mì Quảng VN")
# print(result)
#####################################################################################################
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from collections import Counter

dataAll = ['Quang noodles', 'Fish ball vermicelli', 'Nem lui', 'Hue beef noodle soup', 'Goi spring rolls', 'Fish sauce hot pot', 'Pot pot rice', 'Bread', 'Mussels with rice paper', 'Rice paper rolls', 'Beef noodles']

dataOrder = {
    'product_name': ['Quang noodles', 'Bun with fish balls', 'Nem lui', 'Quang noodles', 'Bun with fish balls', 'Bun with beef noodles', 'Nem lui', 'Quang noodles', 'Bun with fish balls', 'Spring rolls'],
    'order_date': ['2023-11-01', '2023-11-01', '2023-11-02', '2023-11-02', '2023-11-03', '2023-11-03', '2023-11-04', '2023-11-04', '2023-11-05', '2023-11-05']
}

df = pd.DataFrame(dataOrder)
df['order_date'] = pd.to_datetime(df['order_date'])

# Sắp xếp DataFrame theo 'order_date' giảm dần
df = df.sort_values(by='order_date', ascending=False)

# Lấy 5 sản phẩm được đặt nhiều nhất
top_products = [item[0] for item in Counter(df['product_name']).most_common(5)]
print(top_products)

check = 'Beef noodle'
all_data = dataAll + [check]

# Tạo ma trận TF-IDF cho các sản phẩm loại bỏ từ dừng vietnamese
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(all_data)

#################################################################
# # Lấy danh sách các từ trong từ điển
# feature_names = tfidf_vectorizer.get_feature_names_out()
# # Duyệt qua từng dòng của ma trận TF-IDF
# for i, row in enumerate(tfidf_matrix.toarray()):
#     # Lấy tên của văn bản tại dòng i
#     document_name = f'Dòng {i} ({i}) - \'{top_products[i]}\':'
    
#     # In ra từ và trọng số
#     print(document_name)
#     for j, weight in enumerate(row):
#         if weight != 0:
#             word = feature_names[j]
#             print(f'({i}, {j}) {weight}: Tại {document_name}, từ ở vị trí {j} (index {j}) là "{word}".')
#     print()
#####################################################################

# Sử dụng linear_kernel để tính toán độ tương đồng giữa "Mì Quảng" và tất cả các sản phẩm khác
cosine_similarities = linear_kernel(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
print(cosine_similarities)

# Xây dựng danh sách các cặp (tên món ăn, độ tương đồng cosine)
similarities_with_names = list(zip(dataAll, cosine_similarities))

# In ra danh sách các món ăn và độ tương đồng cosine tương ứng
for name, similarity in similarities_with_names:
    print(f"Độ tương đồng giữa 'mì quảng' và '{name}': {similarity}")

#####################################################################################

# def search_restaurants(restaurants, query):
#     all_data = restaurants + [query]
#     # Tạo ma trận TF-IDF cho các sản phẩm loại bỏ từ dừng
#     tfidf_vectorizer = TfidfVectorizer(stop_words='english')
#     tfidf_matrix = tfidf_vectorizer.fit_transform(all_data)

#     # Sử dụng linear_kernel để tính toán độ tương đồng giữa "Mì Quảng" và tất cả các sản phẩm khác
#     cosine_similarities = linear_kernel(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
#     print(cosine_similarities)

#     # Xây dựng danh sách các cặp (tên món ăn, độ tương đồng cosine)
#     similarities_with_names = list(zip(restaurants, cosine_similarities))

#     # In ra danh sách các món ăn và độ tương đồng cosine tương ứng
#     for name, similarity in similarities_with_names:
#         if similarity >0.4: 
#             print(f"Độ tương đồng giữa '{query}' và '{name}': {similarity}")

# restaurants_array = ['Quang noodles', 'Fish ball noodle soup', 'Nem lui', 'Hue beef noodle soup', 'Goi spring rolls', 'Fish sauce hot pot', 'Pot pot rice', 'Bread', 'Mussels with rice paper' , 'Rice paper rolls', 'Beef noodles', "crab noodle soup", "vermicelli with crab"]
# search_restaurants(restaurants_array, "Quang noodles")


# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import linear_kernel

# def search_restaurants(restaurants, query):
#     all_data = restaurants['product_name'] + [query]
#     tfidf_vectorizer = TfidfVectorizer(stop_words='english')
#     tfidf_matrix = tfidf_vectorizer.fit_transform(all_data)
#     cosine_similarities = linear_kernel(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
#     similarities_with_names = list(zip(restaurants['product_name'], restaurants['pid'], cosine_similarities))
#     result = []
#     for name, pid, rid, similarity in similarities_with_names:
#         if similarity > 0.4:
#             result.append({'product_name': name, 'pid': pid})
#     return result

# dataOrder = {
#     'product_name': ['Quang noodles', 'Fish ball noodle soup', 'Nem lui', 'Hue beef noodle soup', 'Goi spring rolls', 'Fish sauce hot pot', 'Pot pot rice', 'Bread', 'Mussels with rice paper' , 'Rice paper rolls', 'Beef noodles', "crab noodle soup", "vermicelli with crab"],
#     'pid': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13']
# }

# result = search_restaurants(dataOrder, "Quang noodles")
# print(result)
##################################################################################################################
# restaurant_results = [
#     {'did': 'some_did1', 'specialty': True, 'rating': 4.5, 'like': 100},
#     {'did': 'some_did2', 'specialty': False, 'rating': 4.0, 'like': 120},
#     {'did': 'some_did3', 'specialty': True, 'rating': 4.5, 'like': 150}
# ]
# sorted_results = sorted(restaurant_results, key=lambda x: (x['specialty'], x['rating'], x['like']), reverse=True)
# for result in sorted_results:
#     print(result)