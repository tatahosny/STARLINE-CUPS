function addToInvoice() {
    const itemName = document.getElementById('item-name').value;
    const itemSize = document.getElementById('item-size').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    if (!itemName || !itemSize || isNaN(itemPrice) || isNaN(itemQuantity)) {
        alert("يرجى إدخال بيانات صحيحة.");
        return;
    }

    const invoiceBody = document.getElementById('invoice-body');
    const newRow = document.createElement('tr');
    const totalRowPrice = itemPrice * itemQuantity;

    newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${itemSize}</td>
        <td>${itemPrice.toFixed(2)}</td>
        <td>${itemQuantity}</td>
        <td>${totalRowPrice.toFixed(2)}</td>
    `;
    invoiceBody.appendChild(newRow);

    const totalAmount = document.getElementById('total-amount');
    totalAmount.textContent = (parseFloat(totalAmount.textContent) + totalRowPrice).toFixed(2);
}


function printInvoice() {
    const companyName = document.getElementById('company-name').value || "غير محدد";
    const clientName = document.getElementById('client-name').value || "غير محدد";
    const totalAmount = document.getElementById('total-amount').textContent;

    // استخراج محتوى الصفوف من الفاتورة الحالية
    const rows = document.querySelectorAll('#invoice-body tr');
    let rowsHtml = '';
    rows.forEach(row => {
        rowsHtml += `<tr>${row.innerHTML}</tr>`;
    });

    const invoiceHtml = `
        <html>
        <head>
            <title>فاتورة الحساب</title>
            <style>
                body { font-family: 'Arial', sans-serif; direction: rtl; margin: 20px; }
                .header { text-align: center; margin-bottom: 20px; position: relative; }
                .logo { position: absolute; top: 0; ${/* تحديد المكان */ ''} right: 0; width: 100px; }
                .invoice-details { margin: 20px 0; text-align: right; }
                .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .invoice-table th, .invoice-table td { padding: 10px; border: 1px solid #ddd; text-align: center; }
                .invoice-table th { background-color: #1E90FF; color: white; }
                .total-amount { font-size: 20px; font-weight: bold; text-align: right; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="logo.jpg" alt="Logo" class="logo">
                <h1>فاتورة الحساب</h1>
                <p>شركة الإنتاج: <strong>STAR LINE CUPS</strong></p>
            </div>
            <div class="invoice-details">
                <p><strong>اسم العميل:</strong> ${clientName}</p>
                <p><strong>اسم الشركة:</strong> ${companyName}</p>
            </div>
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>اسم الصنف</th>
                        <th>المقاس</th>
                        <th>السعر (جنيه)</th>
                        <th>العدد</th>
                        <th>المجموع (جنيه)</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <div class="total-amount">إجمالي الفاتورة: ${totalAmount} جنيه</div>
        </body>
        </html>
    `;

    // فتح نافذة جديدة للطباعة
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.print();
}
