import requests
import openpyxl
import os
import threading
def make_time():
    year_start = 2021
    year_end = 2023
    quaterly_start = 1
    quaterly_end = 4

    result = []

    while year_start * 4 + quaterly_start <= year_end * 4 + quaterly_end:
        #2020-07
        result.append(str(year_start) + "-quaterly_" + str(quaterly_start))
        quaterly_start += 1
        if quaterly_start > 4:
            quaterly_start = 1
            year_start += 1
        
    return ["userId"] + result


def write_csv(header_exel, data_exel):
    excel_file_name = "data-bonus-quaterly.xlsx"

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
        text_data = response.text
        # print(text_data)
        data = text_data.split("|")
        if len(data) < 14:
            return 0
        return data[13]

    else:
        return 0

data_result = []

def crawl(thread_id, num_cores):
    pre_id = 'VNW';
    for user_id in range(thread_id, 18000, num_cores):
        user_id_full = pre_id + str(user_id).zfill(7)
        result = [user_id_full]
        last_bonus_quaterly  = call_api(f'https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s24/{user_id_full}vkokv2023vkokvqr2')
        if last_bonus_quaterly == 0:
            continue
        for year in range(2021, 2024):
            for quarter in range(1, 5):
                bonus_quaterly = call_api(f'https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s24/{user_id_full}vkokv{year}vkokvqr{quarter}')
                result.append(bonus_quaterly)
                print(thread_id, user_id_full, year, quarter, bonus_quaterly)
        data_result.append(result)
        


# Xác định số lõi CPU
num_cores = os.cpu_count()

if num_cores is not None:
    print(f"Số lõi CPU: {num_cores}")
else:
    print("Không thể xác định số lõi CPU.")

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