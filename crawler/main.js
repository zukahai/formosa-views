
async function setData() {
    let id = $("#userId").val();

    if (id !== "") {
        $("#name-id").text(id + '🔽');
        let link = `https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s10/${id}`;

        $("#loading").removeClass("hidden");
        $("#loading-text").removeClass("hidden");
        $("#messager").addClass("hidden");
        $("#data").addClass("hidden");
        return new Promise((resolve, reject) => {
        $.ajax({
            url: CONFIG.path_api,
            type: "POST",
            dataType: "json",
            data: {
                "link": link
            },
            success: function (data) {
                $("#loading").addClass("hidden");
                $("#loading-text").addClass("hidden");
                if (data.length <= 1) {
                    $("#data").addClass("hidden");
                    $("#messager").removeClass("hidden");
                    return;
                }
                $("#data").removeClass("hidden");
                $("#messager").addClass("hidden");
                data = (data.split("o|o")[0]).split("|");
                console.log(data);

                $("#htttrung").text(data[0]);
                $("#httanh").text(data[1]);
                $("#ntnsinh").text(data[2]);
                $("#nccty").text(data[3]);
                $("#tenbophan").text(data[4]);
                $("#tenchucvu").text(data[5]);
                $("#nhlccvht").text(data[6]);
                $("#chucvu").text(data[7]);
                $("#ngaybatdau").text(data[8]);
                $("#cbcv").text(data[9]);
                $("#ngaybatdau2").text(data[10]);
                $("#thangbacluong").text(data[11]);
                $("#ngaybatdau3").text(data[12]);
                $("#luongcoban").text(data[13]);
                $("#ngayhieuluc").text(data[14]);
                $("#nbdhdld").text(data[15]);
                $("#denngay").text(data[16]);
                $("#diachill").text(data[17]);
                $("#dcthuongtru").text(data[18]);
                $("#sdtll1").text(data[19]);
                $("#sdtll2").text(data[20]);
                $("#tenvochong").text(data[21]);

                localStorage.setItem("userId", id);
                $('title').text("Formosa | Profile " + data[0] + " - " + data[1]);
                
            },
            error: function (error) {
                console.log("Error:", error);
                $("#data").addClass("hidden");
                $("#messager").removeClass("hidden");
                $("#loading").addClass("hidden");
                $("#loading-text").addClass("hidden");
            }
        });
    });
    }
}

async function downloadFile() {
    let userId = $("#userId").val();
    let nameByUserId = userId + '_profile.xlsx';
    let table = document.getElementById("data");
    let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    let wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    let blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, nameByUserId);

    toastr.success("Đã tải thành công " + nameByUserId, "Thông báo");
}

async function crawler() {
    console.log('crawler');
    let prefix = 'VNW00';

    for (let id = 14737; id <= 14740; id++) {
        let userId = prefix + id;

        $("#userId").val(userId);
try {
            await setData();
            console.log('id: ' + id);
            await downloadFile();
        } catch (error) {
            console.log('Error:', error);
        }
        
    }
    console.log('End crawler');
}

crawler();