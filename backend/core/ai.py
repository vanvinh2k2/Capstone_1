from ultralytics import YOLO
from rest_framework.response import Response
from rest_framework.decorators import api_view
from PIL import Image
from rest_framework import status


@api_view(['POST'])
def search_restaurant_image(request):
    uploaded_image = request.FILES.get('image')
    # Sử dụng PIL để chuyển đổi ảnh thành hình ảnh
    image = Image.open(uploaded_image)
    try:
        model = YOLO("best.pt")
        result = model(image, stream=True)
        for r in result:
            boxes = r.boxes.numpy()
            data = r.names
            for box in boxes:
                a = int(box.cls[0])
                return Response({
                    'success': True,
                    'message': "Search successfully.",
                    'data': {
                        'result': data[a],
                        'reliability': round(float(box.conf) * 100),
                        'restaurant': 'ok'
                    }
                }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'success': False,
            'message': str(e)
        }, status=status.HTTP_200_OK)
