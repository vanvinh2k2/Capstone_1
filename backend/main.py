def ArrayChallenge(arr):
    max_num = max(arr)
    arr.remove(max_num)  # Loại bỏ số lớn nhất từ mảng

    def can_sum(numbers, target):
        if target == 0:
            return True
        if not numbers:
            return False

        current_num = numbers[0]
        remaining_numbers = numbers[1:]

        # Thử cộng số hiện tại vào kết quả hoặc không cộng
        return can_sum(remaining_numbers, target - current_num) or can_sum(remaining_numbers, target)

    # Kiểm tra xem có tổ hợp nào có thể cộng lại thành số lớn nhất không
    if can_sum(arr, max_num):
        return "true"
    else:
        return "false"

# Sử dụng input() thay vì raw_input() và in the cú pháp Python 3
print(ArrayChallenge([3, 5, -1, 8, 12]))  # Output: "false"
