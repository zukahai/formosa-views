import requests
import openpyxl
import os
def make_time():
    year_start = 2020
    year_end = 2023
    month_start = 7
    month_end = 7

    result = []

    while year_start * 12 + month_start <= year_end * 12 + month_end:
        #2020-07
        result.append(str(year_start) + "-" + str(month_start).zfill(2))
        month_start += 1
        if month_start > 12:
            month_start = 1
            year_start += 1
        
    return ["userId"] + result


def write_csv(header_exel, data_exel):
    excel_file_name = "data.xlsx"

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
        if len(data) < 44:
            return 0
        return data[43]

    else:
        return 0


def crawl():
    date = make_time()
    print(date)
    pre_id = 'VNW';
    for user_id in range(6, 18000):
        user_id_full = pre_id + str(user_id).zfill(7)
        result = [user_id_full]
        last_salary = salary = call_api(f'https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s16/{user_id_full}vkokv{date[-1]}')
        if last_salary == 0:
            continue
        for i in date:
            salary = call_api(f'https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s16/{user_id_full}vkokv{i}')
            result.append(salary)
            print(user_id, user_id_full, i, salary)
        write_csv(date, [result])

crawl()