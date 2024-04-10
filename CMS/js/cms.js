// variables

let foodPhotoName;
let foodIdEdit = document.getElementById('food-id-edit');
const myFirebaseApi = "https://digital-menu-45360-default-rtdb.firebaseio.com/";
const myJsonDb = "./databaseJSON/db.json"
const categoryElement = document.getElementById("category-selection");
const mainContainer = document.getElementById("main-container");
const formSubmit = document.querySelector("form");
const categorySelection = document.getElementById("category-selection");
const foodName = document.getElementById("food-name");
const optionallity = document.getElementById("optionallity");
const foodOption = document.getElementById("food-option");
const foodPrice = document.getElementById("food-price");
const foodDesc = document.getElementById("food-desc");
const foodPhoto = document.getElementById("food-photo");
let foodIdEditValue;

// DataBase

let category = [];


let orders = [];


let ordersInStorage = JSON.parse(localStorage.getItem("orders"));
let ordersArray = !ordersInStorage ? [...orders] : ordersInStorage;

let foodIds = [];

let foodOptionType = [];


// functions

function generateCategoryItems() {
    categoryElement.innerHTML = `<option selected value="">Select one</option>`;
    category.forEach((item) => {
        let itemElem = `<option value="${item.id} - ${item.title}">${item.id} - ${item.title}</option>`;
        categoryElement.insertAdjacentHTML("beforeend", itemElem);
    });
}
async function generateFoodOptionallity() {
    optionallity.innerHTML = `<option selected value="">Select one</option>`;
    foodOptionType.forEach((item) => {
        let itemElem = `<option value="${item.type}">${item.type}</option>`;
        optionallity.insertAdjacentHTML("beforeend", itemElem);
    });
}
function generateFoodOptions(optionType) {
    foodOption.innerHTML = `<option selected value="">Select one</option>`;
    optionType.forEach((item) => {
        let itemElem = `<option value="${item}">${item}</option>`;
        foodOption.insertAdjacentHTML("beforeend", itemElem);
    });
}

const generateMenuItems = (cat) => {
    mainContainer.innerHTML = `<h2 class="text-center fw-bolder">لیست کامل محصولات</h2>`;
    console.log("cat ", cat);
    cat.forEach((cat) => {
        orders.some((item) => item.categoryId == cat.id) &&
            mainContainer.insertAdjacentHTML(
                "beforeend",
                `
    <!-- Title -->
    <p id="cat-${cat.id}" class="pt-1" ></p>    
    <div  class="category-title d-flex flex-column justify-content-center align-items-center position-relative mt-5 mb-5 ">
        <span class=" text-primary fw-bolder fs-5 position-absolute px-3">« ${cat.title} »</span>
    </div>
    <!-- Title -->
    `
            );

        const catorders = orders.filter((item) => item.categoryId === cat.id);

        catorders.forEach((item) => {
            if (item.isOptional) {
                const minPrice = Math.min(...item.price);
                mainContainer.insertAdjacentHTML(
                    "beforeend",
                    `
        <!-- item -->
        <div class="menu-item row bg-secondary-subtle2 text-white  my-4  pt-2 px-0 rounded rounded-4 overflow-hidden" id="food-${item.id}">
            <div class="col-4 col-sm-3 d-flex flex-column p-0 justify-content-center align-items-center food-photo-container" >
                <div class="ps-2 pb-2 food-photo-container" >
                     <img class="img-fluid food-photo-container  rounded rounded-2" src="../images/${item.imgName}" alt="image"/>
                </div>
            </div>
            <div class="menu-item-text col-8 col-sm-9 d-flex flex-column p-0 ">
                <h5 class="menu-item-title ps-3 ">${item.name}</h5>
                <div class="menu-item-content pt-0 px-3 fs-6s">${item.description}</div>
                <span class="fs-6l mt-2 mb-2  px-4 ">
                    <small> از </small>
                    <b>${minPrice}</b>
                    <small>تومان</small>
                </span>

                <div class="row justify-content-around">
                    <button class="btn btn-warning col-5 d-inline" id="edit-item-${item.id}">Edit</button>
                    <button class="btn btn-danger col-5 d-inline" id="delete-item-${item.id}">Delete</button>
                </div>

                

            </div>
            <details class="bg-secondary-subtle py-2">
                <summary>
                    <h6>قابلیت انتخاب <span class="text-primary">« ${item.OptionType} »</span></h6>
                </summary>
                <ul id="food-${item.id}-option" class="row p-0 justify-content-center">

                </ul>
            </details>
        </div>
        <!-- item -->
        `
                );

                let summaryUl = document.querySelector(`#food-${item.id}-option`);
                for (let i = 0; i < item.options.length; i++) {
                    summaryUl.insertAdjacentHTML(
                        "beforeend",
                        `
                <li class="d-flex  justify-content-between w-80 py-2">
                    <span class="">${item.options[i]}</span>
                    <strong class="text-primary fw-bold">${item.price[i]}<small class="fs-7">تومان</small></strong>
                </li>
                `
                    );
                }
            } else {
                mainContainer.insertAdjacentHTML(
                    "beforeend",
                    `
        <!-- item -->
        <div class="menu-item row bg-secondary-subtle2 text-white  my-4  pt-2 px-0 rounded rounded-4 overflow-hidden" id="food-${item.id}">
            <div class="col-4 col-sm-3 d-flex flex-column p-0 justify-content-center align-items-center food-photo-container" >
                <div class="ps-2 pb-2 food-photo-container">
                    <img class="img-fluid  rounded rounded-2 food-photo-container" src="../images/${item.imgName}" alt="image"/>
                </div>
            </div>
            <div class="menu-item-text col-8 col-sm-9 d-flex flex-column p-0 ">
                <h5 class="menu-item-title ps-3 ">${item.name}</h5>
                <div class="menu-item-content pt-0 px-3 fs-6s">${item.description}</div>
                <span class="fs-6l mt-2 mb-2  px-4 ">
                    <b>${(item.price).toLocaleString()}</b>
                    <small>تومان</small>
                </span>
                <div class="row justify-content-around">
                    <button class="btn btn-warning col-5 d-inline" id="edit-item-${item.id}">Edit</button>
                    <button class="btn btn-danger col-5 d-inline" id="delete-item-${item.id}">Delete</button>
                </div>
            </div>
        </div>
        <!-- item -->
        `
                );
            }
        });
    });
};


















function clearForm() {
    generateMenuItems(category);
    generateCategoryItems();
    generateFoodOptionallity();
    foodOption.innerHTML = `<option selected value="">Select one</option>`;
    // foodName.value = "";
    // foodPrice.value = "";
    // foodDesc.value = "";
    formSubmit.reset();
    foodPhotoName = "";


}

async function deleteItem(table, id) {
    console.log(id);
    console.log(orders);

    let itemDelete = orders.find((item) => item.id == id);
    let arrayIndex = orders.indexOf(itemDelete);

    console.log(itemDelete);
    console.log(arrayIndex);

    let deletedFood = {
        id: 0,
        title: "deleted",
        categoryId: 0,
        price: [0],
        isOptional: false,
        OptionType: "",
        options: [],
        imgName: "",
        description: "",
    };
    await setRequest(deletedFood, `${table}`, arrayIndex);
    await callApiFunctions();
}
async function editItem(id) {
    // foodIdEditValue = id
    foodIdEdit.setAttribute('value', id)
    foodIdEditValue = foodIdEdit.getAttribute('value');
    let food = orders.find((item) => item.id == id);
    let catFinded = category.find((item) => item.id == food.categoryId);
    // let arrayIndex = orders.indexOf(food);
    foodName.value = food.name;
    optionallity.value = food.OptionType;
    // foodOption.value = food.options[0];

    const optionallityValue = optionallity.value;
    const opt = optionallityValue && foodOptionType.find((item) => item.type == optionallityValue).options;
    opt && generateFoodOptions(opt);


    // let photo = document.getElementById("food-photo")
    foodDesc.value = food.description;
    categorySelection.value = `${catFinded.id} - ${catFinded.title}`;
    // const catId = categorySelection.value.split("-")[0];
    foodPrice.value = food.price;


}

async function submit(e) {

    const categorySelectionValue = categorySelection.value;
    const foodNameValue = foodName.value;
    const optionallityValue = optionallity.value;
    const foodOptionValue = foodOption.value;
    const foodPriceValue = foodPrice.value;
    const foodDescValue = foodDesc.value;
    const catId = categorySelectionValue.split("-")[0];

    let duplicateFood = orders.find((food) => food.id == foodIdEditValue);
    let duplicateFoodIndex = orders.indexOf(duplicateFood);
    // console.log(orders);
    // console.log(orders[1]);
    // console.log(orders[duplicateFoodIndex]);







    if (duplicateFood) {
        if (!duplicateFood.isOptional) {
            if (foodOption.value) {
                duplicateFood.isOptional = true
                duplicateFood.OptionType = [optionallityValue]
                duplicateFood.options[0] = foodOption.value
            }
            duplicateFood.price = Number(foodPrice.value)
        }

        else {
            const isExistOption = duplicateFood.options.some(option => option == foodOption.value)

            if (isExistOption) {
                duplicateFood.options.forEach((option, index) => {
                    if (option == foodOption.value) { duplicateFood.price[index] = Number(foodPrice.value) }


                })
            }

            else {
                duplicateFood.options.push(foodOptionValue)
                duplicateFood.price.push(Number(foodPrice.value))
            }
        }






        orders[duplicateFoodIndex] = {
            id: orders[duplicateFoodIndex].id,
            name: foodNameValue,
            categoryId: catId ? Number(catId) : duplicateFood.categoryId,
            price: duplicateFood.price,
            isOptional: duplicateFood.isOptional,
            OptionType: optionallityValue !== "" ? optionallityValue : false,
            options: !duplicateFood.options ? [foodOptionValue] : duplicateFood.options,
            imgName: foodPhotoName || duplicateFood.imgName,
            description: foodDescValue,
        };
        // localStorage.setItem("orders", JSON.stringify(orders));
        console.log(duplicateFood);

    }
    else {
        // Generate Food id
        orders.forEach((food) => {
            foodIds.push(food.id);
        });
        let lastId = Math.max(...foodIds);

        let foodId = !lastId ? 0 : lastId;
        foodId++;

        const foodObject = {
            id: foodId,
            name: foodNameValue,
            categoryId: Number(catId),
            price: foodPriceValue,
            isOptional: foodOptionValue ? true : false,
            OptionType: foodOptionValue ? optionallityValue : false,
            options: [foodOptionValue ? foodOptionValue : null],
            imgName: foodPhotoName,
            description: foodDescValue,
        };

        orders.push(foodObject);

    }



    await setRequest(orders, "orders");
    await callApiFunctions();

    clearForm();
}

// API Functions
async function postRequest(array, arrayStringName) {
    let req = `${myFirebaseApi}${arrayStringName}.json`; // FireBase
    let res = await fetch(req, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(array),
    });

    return res;
}
async function setRequest(array, arrayStringName, index) {

    let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`; // FireBase
    let res = await fetch(req, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(array),
    });

    return res;
}

async function getRequest(arrayStringName, index) {
    let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`; // FireBase
    // let req =index ? `${myJsonDb}/${arrayStringName}/${index}.json` : `${myJsonDb}/${arrayStringName}.json`
    let res = await fetch(req);
    let resJson = await res.json();
    // console.log('res', res);

    return resJson;
    return Object.values(resJson);
}

async function deleteRequest(arrayStringName, index) {
    // let req = index ? `${myFirebaseApi}${arrayStringName}/${index}.json` : `${myFirebaseApi}${arrayStringName}.json`; // FireBase
    let req = `./js/db.json`;
    let res = await fetch(req, {
        method: "DELETE",
    });

    return res;
}

async function callApiFunctions() {
    await getRequest("category")
        .then((result) => {
            category = result.filter((item) => item);
            generateCategoryItems();
        })
        .catch((err) => {
            callApiFunctions();
        });
    await getRequest("orders")
        .then((result) => {
            orders = result;
            console.log(orders);
            generateMenuItems(category);
        })
        .catch((err) => {
            callApiFunctions();
        });

    await getRequest("foodOptionType")
        .then((result) => {
            console.log(result);
            foodOptionType = result.filter((item) => item);
            generateFoodOptionallity();
        })
        .catch((err) => {
            callApiFunctions();
        });
}

// Call Functions

callApiFunctions();



// Events
optionallity.addEventListener("change", (e) => {
    const optionallityValue = optionallity.value;
    const opt = foodOptionType.find((item) => item.type == optionallityValue).options;
    generateFoodOptions(opt);

});

foodOption.addEventListener('change', e => {
    let food = foodIdEditValue && orders.find(item => item.id == foodIdEditValue)
    food.options && food.options.forEach(option => {

        console.log(food.options.indexOf(option));
        foodOption.value == option ? foodPrice.value = food.price[food.options.indexOf(option)] : null
    })

})

mainContainer.addEventListener("click", (e) => {
    const idd = e.target.id.includes("delete") && e.target.id.split("-")[2];
    idd && deleteItem("orders", idd);
});
mainContainer.addEventListener("click", (e) => {
    const idd = e.target.id.includes("edit") && e.target.id.split("-")[2];
    idd && editItem(idd);
});

foodPhoto.addEventListener("change", (e) => {
    foodPhotoName = e.target.files[0].name;
    console.log(foodPhotoName);
});

formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    submit();
});



// orders = [
//     {
//         id: 1,
//         categoryId: 1,
//         name: 'موکا | Mocha',
//         price: 80000,
//         imgName: 'mocha.jpg',
//         description: 'شکلات , شیر فرم گرفته , اسپرسو و خامه زده شده ',
//         isOptional: false,
//         OptionType: "",
//         options: []

//     },
//     {
//         id: 2,
//         categoryId: 2,
//         name: 'شیراز | Shiraz',
//         price: 1000,
//         imgName: 'shiraz.jpg',
//         description: ' سکنجبین , زعفران و آب سودا',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 3,
//         categoryId: 3,
//         name: 'چای سبز| Green tea',
//         price: 40000,
//         imgName: 'green.jpg',
//         description: 'چای سبز و عسل',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 4,
//         categoryId: 4,
//         name: 'چری بری|Cherry berry',
//         price: 1000,
//         imgName: 'chery.jpg',
//         description: 'شاتوت , توت فرنگی و آلبالو ',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 5,
//         categoryId: 1,
//         name: ' وایت چاکلت | Chocolate',
//         price: 95000,
//         imgName: 'mint.jpg',
//         description: 'شکلات سفید , وانیل و شیر ',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 6,
//         categoryId: 2,
//         name: 'کاشان  | Kashan',
//         price: 1000,
//         imgName: 'kashan.jpg',
//         description: 'زعفران , تخم شربتی, پنیرک و خاکشیر',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 7,
//         categoryId: 6,
//         name: 'جینجر لایم | Gingerlime',
//         price: 1000,
//         imgName: 'ginger.jpg',
//         description: 'زنجبیل و لیمو',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 8,
//         categoryId: 3,
//         name: 'گلدن وانیلا | Golden vanila',
//         price: 1000,
//         imgName: 'vanill.jpg',
//         description: ' میخک , وانیل , دارچین و سیب زرد',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 9,
//         categoryId: 4,
//         name: 'مانگو بری| Mongo berry',
//         price: 1000,
//         imgName: 'mongo.jpg',
//         description: ' توت فرنگی , آب انبه و پرتقال',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 10,
//         categoryId: 5,
//         name: 'ترامیسو | Tiramisu',
//         price: 1000,
//         imgName: 'tramiso.jpg',
//         description: ' بیسکوییت , پنیر خامه ای و کافی میکس',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 11,
//         categoryId: 4,
//         name: 'موهیتو | Mojito',
//         price: 125000,
//         imgName: 'mohito.jpg',
//         description: ' آب گازدار , برگ نعناع , شکر , رام سفید و آبلیمو ',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 12,
//         categoryId: 3,
//         name: 'چای مراکشی | Moroccan ',
//         price: 72000,
//         imgName: 'marakeshi.jpg',
//         description: ' چای سیاه، چای سبز،برگ نعناع، تکه های میوه های استوایی',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 13,
//         categoryId: 1,
//         name: 'ماسالا| Masala',
//         price: 95000,
//         imgName: 'masala.jpg',
//         description: 'چای سیاه، شیر ,زنجبیل , هل , دارچین و فلفل سیاه',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 14,
//         categoryId: 2,
//         name: 'کافه گلاسه|Cafe glace',
//         price: 111000,
//         imgName: 'glaseh.jpg',
//         description: 'شیر, بستنی , نسکافه و سس شکلات',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     },
//     {
//         id: 15,
//         categoryId: 2,
//         name: 'آیس لته|iced latte',
//         price: 110000,
//         imgName: 'icelate.jpg',
//         description: 'اسپرسو , یخ و شیر سرد ',
//         isOptional: false,
//         OptionType: "",
//         options: []
//     }
// ];

// setRequest(orders, 'orders')






// category = [
//     { id: 1, title: "نوشیدنی های گرم", imgName: "hot-drink_2387020.png" },
//     { id: 2, title: "نوشیدنی های سرد", imgName: "ICE.png" },
//     { id: 3, title: "چای و دمنوش  ", imgName: "tea.png" },
//     { id: 4, title: "فراپه و اسموتی ", imgName: "smoothies_.png" },
//     { id: 5, title: "کیک و دسر ", imgName: "cake.png" },
//     { id: 6, title: "ماکتیل ", imgName: "mocktail.png" }
// ];


//  setRequest(category, 'category')




//  foodOptionType = [
//     { type: "طعم", options: ["نیویورکی", "فندق", "کارامل", "نوتلا"] },
//     { type: "نوع مرغ", options: ["سینه", "ران"] },
//     { type: "نوع پخت مرغ", options: ["مرغ گریل", "مرغ سوخاری"] },
//     { type: "ادویه مخصوص", options: ["مالایی", "هندی (تند)", "ایرانی"] },
//     { type: "نوع پروتئین", options: ["گوشت", "مرغ"] },
//     { type: "طعم بستنی", options: ["شاتوت", "بلوبری", "تمشک"] },
//     { type: "کاپ", options: ["سینگل", "دبل"] },
// ];

// setRequest(foodOptionType, 'foodOptionType')













