// Global variables
const items = ["Chair", "Recliner", "Table", "Umbrella"];
const prices = [25.50, 37.75, 49.95, 24.89];
const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND","OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
let purchasedItems = [];
let quantities = [];

document.getElementById('purchaseButton').addEventListener('click', makePurchase);

function makePurchase() {
    purchasedItems = [];
    quantities = [];
    let moreItems = true;

    while (moreItems) {
        let item = prompt("Enter the item you want to purchase (Chair, Recliner, Table, Umbrella):").trim().toLowerCase();
        let itemIndex = items.findIndex(i => i.toLowerCase() === item);

        if (itemIndex === -1) {
            alert("Invalid item. Please enter Chair, Recliner, Table, or Umbrella.");
            continue;
        }

        let quantity = parseInt(prompt(`How many ${items[itemIndex]}s would you like to buy?`));

        if (isNaN(quantity) || quantity <= 0) {
            alert("Invalid quantity. Please enter a number greater than 0.");
            continue;
        }

        purchasedItems.push(itemIndex);
        quantities.push(quantity);

        moreItems = confirm("Would you like to purchase another item?");
    }

    let state = "";
    while (!states.includes(state)) {
        state = prompt("Enter the two-letter state abbreviation for shipping:").toUpperCase();
        if (!states.includes(state)) {
            alert("Invalid state abbreviation. Please enter a valid two-letter state code.");
        }
    }

    let subtotal = calculateSubtotal();
    let tax = subtotal * 0.15;
    let shipping = calculateShipping(subtotal, state);
    let total = subtotal + tax + shipping;

    displayInvoice(subtotal, tax, shipping, total, state);
}

function calculateSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < purchasedItems.length; i++) {
        subtotal += prices[purchasedItems[i]] * quantities[i];
    }
    return subtotal;
}

function calculateShipping(subtotal, state) {
    const zones = {
        "Zone 1": ["ME", "NH", "VT", "CT", "NJ", "NY", "PA", "MD", "DE", "WV", "RI", "MA", "DC"],
        "Zone 2": ["OH", "IN", "MI", "KY", "WV", "TN", "NC", "SC"],
        "Zone 3": ["IL", "WI", "MN", "IA", "MO", "AR", "LA", "MS", "AL", "GA", "FL"],
        "Zone 4": ["ND", "SD", "NE", "KS", "OK", "TX"],
        "Zone 5": ["MT", "WY", "CO", "UT", "AZ", "NM", "ID", "NV", "CA", "OR", "WA", "AK", "HI"]
    };

    let zone = Object.keys(zones).find(zone => zones[zone].includes(state));
    let shippingCost = 0;

    switch (zone) {
        case "Zone 1":
            shippingCost = 0;
            break;
        case "Zone 2":
            shippingCost = 20.00;
            break;
        case "Zone 3":
            shippingCost = 30.00;
            break;
        case "Zone 4":
            shippingCost = 35.00;
            break;
        case "Zone 5":
            shippingCost = 45.00;
            break;
    }

    return (subtotal > 100) ? 0 : shippingCost;
}

function displayInvoice(subtotal, tax, shipping, total, state) {
    let invoice = `
        <h2>Invoice</h2>
        <table>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
    `;

    for (let i = 0; i < purchasedItems.length; i++) {
        invoice += `
            <tr>
                <td>${items[purchasedItems[i]]}</td>
                <td>${quantities[i]}</td>
                <td>$${prices[purchasedItems[i]].toFixed(2)}</td>
                <td>$${(prices[purchasedItems[i]] * quantities[i]).toFixed(2)}</td>
            </tr>
        `;
    }

    invoice += `
        </table>
        <hr>
        <p>State: ${state}</p>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Tax: $${tax.toFixed(2)}</p>
        <p>Shipping: $${shipping.toFixed(2)}</p>
        <p>Total: $${total.toFixed(2)}</p>
        <button id="shopAgainButton" onclick="location.reload()">Shop Again</button>
    `;

    document.getElementById('invoiceSection').innerHTML = invoice;
}
