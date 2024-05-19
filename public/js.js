document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date('2024-04-19');
    const endDate = new Date('2024-05-19');
    const selectElement = document.getElementById('date-select');
    const submitButton = document.getElementById('submit-btn');
    const selectedDateElement = document.getElementById('selected-date');

    // Generate date options for the select dropdown
    let currentDate = startDate;
    while (currentDate <= endDate) {
        const option = document.createElement('option');
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
        option.value = formattedDate;
        option.textContent = formattedDate;
        selectElement.appendChild(option);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Pad single digit numbers with leading zero
    function padZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    // Handle submit button click
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const selectedDate = selectElement.value;
        if (selectedDate) {
            const date = new Date(selectedDate);
            const formattedDate = `24/${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}`;
            //selectedDateElement.textContent = `選擇的日期: ${formattedDate}`;
            const response = await fetch("/api/duo",{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ date: formattedDate })
            })
            if (response.ok) {
                const data = await response.json();
                // 假設回傳的數據是數組並且只包含一個對象
                if (data.length > 0) {
                    const price = data[0].price; // 提取 price 值
                    document.getElementById('price_area').innerText = "黃豆價格: "+ price;
                } else {
                    document.getElementById('price_area').innerText = "No data available";
                }
            } else {
                const error = await response.text();
                document.getElementById('price_area').innerText = error;
            }

        }
    });
});
