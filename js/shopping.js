Array.from(document.getElementsByClassName("item-name")).forEach(element => {
    element.addEventListener("click", () => {
        if (element.checked)
            return;
        let prNode = element.parentNode.parentNode;
        Array.from(prNode.querySelectorAll("input[type=radio]")).forEach(node => node.checked = false);
        prNode.getElementsByTagName("select")[0].selectedIndex = 0;
        prNode.getElementsByClassName("price")[0].textContent = "$0";
    });
});

Array.from(document.getElementsByTagName("select")).forEach(element => {
    element.addEventListener("click", () => {
        try {
            validate(element);
        } catch (error) {
            alert(error.message);
        }
    });
    element.addEventListener("change", () => {
        try {
            itemChose(element);
        } catch (error) {
            alert(error.message);
        }
    });
});

Array.from(document.querySelectorAll("input[type=radio]")).forEach(element => {
    element.addEventListener("click", () => {
        try {
            property_chose(element);
        } catch (error) {
            element.checked = false;
            alert(error.message);
        }
    })
})

function validate(element) {
    prNode = element.parentNode.parentNode;
    let is_item_checked = prNode.getElementsByClassName("item-name")[0].checked;
    if (!is_item_checked)
        throw Error("Please Select The Item To Purchase !");

    let flag = true;
    prNode.querySelectorAll("input[type=radio]").forEach(element => {
        if (element.checked)
            flag = false;
    })
    if (flag)
        throw Error("Please Select The Property Of The Item To Purchase!");
}

function itemChose(element) {
    prNode = element.parentNode.parentNode;
    let is_item_checked = prNode.getElementsByClassName("item-name")[0].checked;
    if (!is_item_checked)
        throw Error("Please Select The Item To Purchase !");

    let price;
    prNode.querySelectorAll("input[type=radio]").forEach(element => {
        if (element.checked) {
            let price_tag = element.parentNode;
            price = parseInt(price_tag.getElementsByClassName("item-price")[0].textContent.slice(1));
        }
    })

    if (!price)
        throw Error("Please Select the property !");

    prNode.getElementsByClassName("price")[0].textContent = "$" + (price * parseInt(element.selectedIndex));
}

function property_chose(element) {
    prNode = element.parentNode.parentNode.parentNode;
    let is_item_checked = prNode.getElementsByClassName("item-name")[0].checked;
    if (!is_item_checked)
        throw Error("Please Select The Item To Purchase !");

    let price = parseInt(element.parentNode.getElementsByClassName("item-price")[0].textContent.slice(1));
    let qty = prNode.getElementsByTagName("select")[0].selectedIndex;
    prNode.getElementsByClassName("price")[0].textContent = "$" + price * qty;
}

function calculate(e) {
    e.preventDefault();
    let prices = document.getElementsByClassName("price");
    let total_price = 0;
    Array.from(prices).forEach(element => total_price += parseInt(element.textContent.slice(1)));

    let extra = total_price * 0.15;
    let msg = "Initial Price: $" + total_price + "\n";
    if (total_price > 1000) {
        msg += "Discount: $" + extra + "\n";
        total_price -= extra;
    } else {
        msg += "Tax: $" + extra + "\n";
        total_price += extra;
    }
    msg += "Total Price: $" + total_price + "\n" + "Do you want to continue with the purchase ?";

    document.getElementById("total").textContent = "$" + total_price;
    setTimeout(() => {
        if (total_price > 0) {
            let choice = confirm(msg);
            if (choice)
                alert("Thanks You For Doing Your Shopping With Us");
            else
                alert("Your Choice Has Been Removed !");

            Array.from(document.getElementsByTagName("select")).forEach(node => {
                prNode = node.parentNode.parentNode;
                Array.from(prNode.getElementsByClassName("item-name")).forEach(item => item.checked = false);
                Array.from(prNode.querySelectorAll("input[type=radio]")).forEach(element => element.checked = false);
                Array.from(document.getElementsByTagName("select")).forEach(element => element.selectedIndex = 0);
                Array.from(document.getElementsByClassName("price")).forEach(element => element.textContent = "$0");
            })
            document.getElementById("total").textContent = "$0";
        } else
            alert("Please Choose The Item To Purchase !");
    }, 1000);
}

document.getElementById("calculate").addEventListener("click", calculate);