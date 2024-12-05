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
    const companyName = document.getElementById('company-name').value;
    const clientName = document.getElementById('client-name').value;
    const totalAmount = document.getElementById('total-amount').textContent;
    
    const invoiceHtml = `
        <html>
        <head>
            <title>فاتورة إلكترونية</title>
            <style>
                body { font-family: 'Arial', sans-serif; }
                .header { text-align: center; }
                .invoice-details { margin: 20px 0; }
                .invoice-table { width: 100%; border-collapse: collapse; }
                .invoice-table th, .invoice-table td { padding: 10px; border: 1px solid #ddd; text-align: center; }
                .invoice-table th { background-color: #1E90FF; color: white; }
                .total-amount { font-size: 20px; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>فاتورة إلكترونية</h1>
                <p>شركة الإنتاج: <strong>شركة النجوم للتجارة</strong></p>
            </div>
            <div class="invoice-details">
                <p>اسم العميل: ${clientName}</p>
                <p>اسم الشركة: ${companyName}</p>
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
                <tbody id="invoice-body">
                    <!-- سيتم إضافة تفاصيل الفاتورة هنا -->
                </tbody>
            </table>
            <div class="total-amount">إجمالي الفاتورة: ${totalAmount} جنيه</div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.print();
}
