in_time = [7, 11, 16]
out_time = [10, 15, 18]

clock = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
time = []
# Khoi tao lich thoi gian da co order(1) và ko có order(0)
def init(clock, in_time, out_time):
    for i in clock: 
        time.append(0)
    for i in range(0, len(in_time)):
        for j in clock:
            if (j > in_time[i]) and (j <= out_time[i]):
                time[j] = 1

init(clock, in_time, out_time)
print(time)

# Check xem don hang them vao co ai dat chua
def check_time(a, b, time):
    for i in range(0, len(time)):
        if a < clock[i] <= b:
            if time[i] == 1:
                return False
    return True

print(check_time(10,11,time))


a= "12:15"
h,p = a.split(":")
print((int(h)*100+int(p))/100)
