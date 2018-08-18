/* Event Handlers */

let invoiceListDOM = document.querySelector('.invoice-list');
invoiceListDOM.addEventListener('click', (evt) => {
    let target = $(evt.target).closest('.invoice-item');
    let data = target.data();
    let invoiceNumer = data.invoiceNumber;                             
    renderDetails({ invoiceNumer });
});

function renderDetails({ invoiceNumer }) {    
    let invoiceDetails = dummyInvoices[invoiceNumer];
    console.log(invoiceDetails);
    let invoiceDetailsTemplate = _.template(InvoiceDetailsTemplate)(invoiceDetails);
    document.querySelector('.invoice-details').innerHTML = invoiceDetailsTemplate;    
}

/* Create Invoice */
let addInvoice = document.querySelector('.create-invoice');
addInvoice.addEventListener('click', (evt) => {    
    // modal.style.display = "block";
});


// When the user clicks anywhere outside of the modal, close it
let modal = document.getElementById('myModal');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/* Undersocre template for Invoice item */
let InvoiceListTemplate = 
`
    <%
        var i = 0;
        var length = invoices.length;
        for(i; i<length; i++) {
    %>
            <div class="invoice-item" data-invoice-number="<%= invoices[i].number %>">
                <div class="invoice-left">
                    <div class="invoice-number">INV. # <%= invoices[i].number %></div>
                    <div class="invoice-total-items">Items - <%= invoices[i].totalItems %> </div>
                    <div class="order-placed-by"> <%= invoices[i].orderBy %> </div>
                </div>
                <div class="invoice-right">
                    <div class="order-date"> <%= invoices[i].on %> </div>
                    <div class="order-amount"> <%= invoices[i].totalAmount %> </div>
                </div>                            
            </div>
    <%
        }
    %>
`;

/* Invoice details template */

let InvoiceDetailsTemplate = 
`
    <div class="invoice-header">
        <div class="invoice-meta">
            <div class="left">
                <h2 class="invoice-title text">Invoice</h2>
                <div class="invoice-number text"># INV<%= number %></div>
                <div class="invoice-on text"> <%= on %> </div>
            </div>                                
            <div class="right">
                <h2 class="invoice-customer-details text">CUSTOMER DETAILS</h2>
                <div class="invoice-customer-name text"> <%= orderBy %> </div>
                <div class="invoice-customer-email text">  <%= email %> </div>
            </div>
        </div>
        <div class="invoice-actions">
                <i class="print-icon"></i>
        </div>
    </div>
    <div class="invoice-content">
        <div class="invoice-content-header">
            <div class="header-name item">Item</div>
            <div class="header-name quantity">Quantity</div>
            <div class="header-name price">Price</div>
        </div>
        <div class="invoice-content-items">
        <%
            var j = 0;
            var itemsLength = items.length;            
            for(;j<itemsLength; j++) {
        %>
                <div class="row">
                    <div class="item-name"> <%= items[j].name %> </div>
                    <div class="item-quantity"> <%= items[j].quantity %> </div>
                    <div class="item-cost"> <%= items[j].price %> </div>
                </div>                                
        <%
            }
        %>
        </div>
    </div>
`;


let dummyInvoices = [];
for(let i = 0; i<10; i++) {
    dummyInvoices.push({
        number: i,
        totalItems: i + 10,
        orderBy: `VJ Coder ${i+1}`,
        on: "Aug 3PM - Today",
        totalAmount: 100 * (i + 1),
        email: "test@test.com",
        items: [{
            name: "Item 1", quantity: i * 2, price: Math.floor(22.2 * i * 3)
        },{
            name: "Item 2", quantity: 3, price: Math.floor(22.2 * i)
        },{
            name: "Item 3", quantity: 3, price: Math.floor(22.2 * i * 4)
        }]
    });
}

let invoicesDOMList = _.template(InvoiceListTemplate)({ invoices: dummyInvoices });
document.querySelector('.invoice-list').innerHTML = invoicesDOMList;


