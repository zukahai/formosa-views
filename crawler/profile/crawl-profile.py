import requests
import openpyxl
import os
import threading
def make_time():
    return ['userID', 'Họ tên tiếng Trung', 'Họ tên tiếng Anh', 'Ngày tháng năm sinh', 'Ngày vàp công ty', 'Tên bộ phận', 'Tên chức vụ', 'Ngày hiệu lực của chức vụ hiện tại', 'Chức vụ', 'Ngày bắt đầu', 'Cấp bậc chức vụ', 'Ngày bắt đầu', 'Thang bậc lương', 'Ngày bắt đầu', 'Lương cơ bản', 'Ngày hiệu lực', 'Ngày bắt đầu hợp đồng lao động', 'Đến ngày', 'Địa chỉ liên lạc', 'Địa chỉ thường trú', 'Số điện thoại liên lạc 1', 'Số điện thoại liên lạc 2', 'Tên vợ/chồng']



def write_csv(header_exel, data_exel):
    excel_file_name = "data-profile.xlsx"

    # Kiểm tra xem tệp Excel đã tồn tại hay chưa
    if os.path.isfile(excel_file_name):
        # Nếu tệp tồn tại, mở workbook hiện có
        workbook = openpyxl.load_workbook(excel_file_name)
        sheet = workbook.active
    else:
        # Nếu tệp chưa tồn tại, tạo mới workbook và sheet
        workbook = openpyxl.Workbook()
        sheet = workbook.active
        # Thêm header (tiêu đề)
        header = header_exel
        sheet.append(header)

    data = data_exel

    for row in data:
        sheet.append(row)

    for column_cells in sheet.columns:
        max_length = 0
        column = column_cells[0].column_letter
        for cell in column_cells:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
            except:
                pass
        adjusted_width = (max_length + 2)
        sheet.column_dimensions[column].width = adjusted_width

    # Lưu workbook thành tệp Excel
    workbook.save(excel_file_name)

    print(f"Dữ liệu đã được lưu vào {excel_file_name}")

def call_api(url):
    # print(url)
    response = requests.get(url)
    if response.status_code == 200:
        response.encoding = 'utf-8'
        text_data = response.text
        # print(text_data)
        text_data = text_data.split("o|o")[0]
        data = text_data.split("|")
        if len(data) < 10:
            return []
        return data
    else:
        return []

data_result = []

def crawl(thread_id, num_cores):
    pre_id = 'VNW';
    for user_id in range(thread_id, 18000, num_cores):
        user_id_full = pre_id + str(user_id).zfill(7)
        profile = call_api(f'https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s10/{user_id_full}')
        if len(profile) == 0:
            continue
        print(thread_id, user_id_full, profile[1])
        data_result.append([user_id_full] + profile)
        

num_cores = 100

thread = []
for i in range(num_cores):
    thread.append(threading.Thread(target=crawl, args=(i,num_cores)))

for t in thread:
    t.start()

for t in thread:
    t.join()
data_result.sort(key=lambda x: x[0])
write_csv(make_time(), data_result)