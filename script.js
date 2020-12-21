$(document).ready(function() {

    let restPlacehold = "Assets/Images/restaurant_Placeholder.jpeg";
    let recipePlacehold = "Assets/Images/recipe_Placeholder.jpeg";

    var restaurants = [];

    let resultsCount = 3;
    let sortType = "rating";

    let latitude = "";
    let longitude = "";

    let userFoodSearch = document.querySelector("#homeSearch")
    let userFoodInput = document.querySelector("#homeSearchInput")

    let userFoodNavSearch = document.querySelector("#navSearch")
    let userFoodNavInput = document.querySelector("#navSearchInput")

    let test = false;

    userFoodSearch.addEventListener('click', (event) => {
        event.preventDefault();
        let foodSearchButton = event.target;
        let userFood = "";

        switch (foodSearchButton.id) {
            case "homeSearch":
                userFood = userFoodInput.value.toUpperCase();
                break;
        }
        switch (foodSearchButton.id) {
            case "homeSearchInput":
                userFood = userFoodInput.value.toUpperCase();
                break;
        }

        if (userFood == "") return;

        restaurantSearchAPI(userFood);
        recipeSearchAPI(userFood);

        userFoodInput.value = "";
        document.activeElement.blur();

    });

    userFoodNavSearch.addEventListener('click', (event) => {
        event.preventDefault();
        let foodSearchNavButton = event.target;
        let userFood = "";

        switch (foodSearchNavButton.id) {
            case "navSearch":
                userFood = userFoodNavInput.value.toUpperCase();
                break;
        }
        switch (foodSearchNavButton.id) {
            case "navSearchInput":
                userFood = userFoodNavInput.value.toUpperCase();
                break;
        }

        if (userFood == "") return;

        restaurantSearchAPI(userFood)
        recipeSearchAPI(userFood);

        userFoodNavInput.value = "";
        document.activeElement.blur();

    });

    $("#homeSearch").on("click", function(event) {
        event.preventDefault();

        $("#homePage").css("padding", "1em");
        $("#homePage").css("margin", "1em");
        $("#homePage img").attr("src", "Assets/Images/logos/R_and_R_long_text.png");
        $("#resultPage").css("display", "block");
        $(".navbar-toggler").css("display", "inline-block");
        $("#navSearch").css("display", "inline-block");
        $("#navSearchInput").css("display", "inline-block");
        $(".navbar-nav").css("display", "inline-flex")

    });

    function restaurantSearchAPI(search) {

        $.ajax({
            method: "GET",
            url: ` https://developers.zomato.com/api/v2.1/search?q=${search}&count=${resultsCount}&lat=${latitude}&lon=${longitude}&sort=${sortType} `,
            headers: {
                "user-key": "2af77d90c4f9ac3a6faf1019f8a457e6"
            },

        }).then(function(data) {
            console.log(data.restaurants)
            restaurants = data.restaurants;

            for (var i = 0; i < restaurants.length; i++) {
                const newRest = restaurants[i].restaurant;

                // let newRestName = newRest.name;
                let newRestImg = newRest.thumb;
                // let newRestAddress = newRest.location.address;
                let phone = newRest.phone_numbers;
                let newRestPhone = phone.slice(0, 14);
                // let newRestRating = newRest.user_rating.aggregate_rating + " Stars";
                // let newRestUrl = newRest.url;

                // let divId = "#rest";
                // let restDiv = document.querySelector(divId += i);

                // let restName = restDiv.querySelector(".restName");
                // restName.textContent = newRestName;



                // restImg.src = newRestImg;
                if (newRestImg === "") {
                    newRest.thumb = restPlacehold;
                }

                // let restAddress = restDiv.querySelector(".restAddress");
                // restAddress.textContent = newRestAddress;

                // let restPhone = restDiv.querySelector(".restPhone");
                // restPhone.textContent = `call ${newRestPhone}`;
                // restPhone.href = `tel:${newRestPhone}`

                // let restRating = restDiv.querySelector(".restRating");
                // restRating.textContent = newRestRating;

                // let restUrl = restDiv.querySelector(".restUrl");
                // restUrl.href = newRestUrl;
                const restAurants = document.querySelector("#restaurants")

                let newRestArticle = fragmentFromString(`<article id="rest0" class="row mx-auto">
                <div class="col-11 mx-auto p-3">
                    <div class="row">
                        <div class="col-lg-3 text-center">
                            <img id="restImg" src="${newRest.thumb}" alt="Restaurant Information" class="img-fluid restImg">
                        </div>
                        <div class="col text-center">
                            <div class="row justify-content-around">
                                <div class="col-10 col-lg-5 text-center">
                                    <h4 class="centerTxt restName">${newRest.name}</h4>
                                    <h5 class="restAddress">${newRest.location.address}</h5>
                                    <h5 class="restRating">${newRest.user_rating.aggregate_rating}</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <hr class="resultsHr" />
                                    <div class="row justify-content-around">
                                        <a href="${newRestPhone}" type="button" class="btn btn-primary col-lg-5 callPhoneButton restPhone">${newRestPhone}</a>
                                        <a href="${newRest.url}" type="button" class="btn btn-primary col-lg-5 moreInfoButton restUrl" target="_blank">Visit Website</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </article>`);

                // <h5 class="restHours">${newRest.hours}</h5> 

                restAurants.appendChild(newRestArticle)

                function fragmentFromString(strHTML) {
                    return document.createRange().createContextualFragment(strHTML);
                }

            }
        });
    };

    recipeApiKey = "9973533";
    foodTypeSearch = "Mexican";

    let mealIds = [];
    let recipeArray = [];
    let mealsArray = [];

    function recipeSearchAPI(search2) {
        $.ajax({
            method: "GET",
            url: "https://www.themealdb.com/api/json/v2/9973533/filter.php?a=" + search2,

        }).then(function(data2) {
            console.log(data2.meals)
            mealsArray = data2.meals;
            mealIds = [];
            recipeArray = [];

            for (let i = 0; i < mealsArray.length; i++) {
                const meal = mealsArray[i];
                let newMealId = meal.idMeal;
                mealIds.push(newMealId);
            }

            console.log(mealIds);
            let recipeReturns = 0;
            for (let j = 0; j < mealIds.length; j++) {
                const recipeId = mealIds[j];

                recipeApiKey = "9973533";
                $.ajax({
                    method: "GET",
                    url: "https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=" + recipeId,

                }).then(function(data3) {
                    // console.log(data3);
                    recipeArray.push(data3);
                    recipeReturns++;

                    if (recipeReturns === mealIds.length) {
                        putMyRecipesOnThePage();
                    }
                });
            };
        });
    };

    function putMyRecipesOnThePage() {
        console.log(recipeArray);

        for (var r = 0; r < 3; r++) {
            const recipe1 = recipeArray[r];
            newRecipe = recipe1.meals[0];

            // let newRecipeName = newRecipe.strMeal;
            // let newRecipeImg = newRecipe.strMealThumb;
            // let newRecipeCategory = newRecipe.strCategory;
            // let newRecipeLink = newRecipe.strSource;
            // let newRecipeVideo = newRecipe.strYoutube;

            // let divId = "#recipe";
            // let recipeDiv = document.querySelector(divId += r);

            // let recipeName = recipeDiv.querySelector(".recipeName");
            // recipeName.textContent = newRecipeName;

            // let recipeImg = recipeDiv.querySelector(".recipeImg");
            // recipeImg.src = newRecipeImg;
            // if (newRecipeImg === "") {
            //     recipeImg.src = recipePlacehold;
            // }

            // let recipeCategory = recipeDiv.querySelector(".recipeCategory");
            // recipeCategory.textContent = newRecipeCategory;

            // let recipeLink = recipeDiv.querySelector(".recipeLink");
            // recipeLink.href = newRecipeLink;

            // let recipeVideo = recipeDiv.querySelector(".recipeVideo");
            // recipeVideo.href = newRecipeVideo;

            const recipes = document.querySelector("#recipes")

            let newRecipeCard = fragmentFromString(`<div id="recipe0" class="">
                <div class="card p-3" style="width: 18rem;">
                    <img class="card-img-top recipeImg" src="${newRecipe.strMealThumb}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title centerTxt recipeName">${newRecipe.strMeal}</h5>
                        <h6 class="card-text recipeCategory">${newRecipe.strCategory}</h6>

                        <div class="row justify-content-around">
                            <a class="btn btn-primary col-lg-5 m-1 recipeLink" href="${newRecipe.strSource}" target="_blank" role="button">Recipe</a>
                            <a class="btn btn-primary col-lg-5 m-1 recipeVideo" href="${newRecipe.strYoutube}" target="_blank" role="button">Video</a>
                        </div>
                    </div>
                </div>
            </div>`)

            recipes.appendChild(newRecipeCard)

            function fragmentFromString(strHTML) {
                return document.createRange().createContextualFragment(strHTML);
            }
        };
    };

    var id, target, options;

    function success(pos) {
        var crd = pos.coords;

        latitude = crd.latitude;
        longitude = crd.longitude;

        if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
            console.log('Congratulations, you reached the target');
            navigator.geolocation.clearWatch(id);
        }
    }

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    target = {
        latitude: 0,
        longitude: 0
    };

    options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    id = navigator.geolocation.watchPosition(success, error, options);
    // console.log(latitude, "&", longitude)
});