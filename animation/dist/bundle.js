/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './src/script.ts':
      /*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
      /***/ () => {
        eval(
          '\ndocument.querySelectorAll(\'.product\').forEach(function (product) {\n    product.addEventListener(\'click\', function () {\n        // --- STEP 1: define all relevant DOM elements ---\n        // DOM: Product\n        var product = this;\n        // DOM: Product clone\t\n        var productClone = product.cloneNode(true);\n        productClone.classList.add(\'clone\');\n        document.body.appendChild(productClone);\n        // DOM: Product details (title, description, price)\n        var productTitle = productClone.querySelector(\'.product-title\');\n        var productDescription = productClone.querySelector(\'.product-description\');\n        var productPrice = this.querySelector(\'.product-price\');\n        // DOM: Product detail view\n        var productDetailView = document.getElementById(\'productDetailView\');\n        var productImageContainer = productDetailView.querySelector(\'.product-image-container\');\n        var productPriceContainer = productDetailView.querySelector(\'#detailPrice\');\n        var backButton = productDetailView.querySelector(\'#backButton\');\n        // Coords\n        var productRect = product.getBoundingClientRect();\n        var productPriceRect = productPrice.getBoundingClientRect();\n        // Remove appear animation from the productClone\n        productClone.style.animation = \'none\';\n        // --- STEP 2: Place the clone in exact the same position as the product ---\n        productClone.style.position = \'absolute\';\n        productClone.style.left = "".concat(productRect.left, "px");\n        productClone.style.top = "".concat(productRect.top, "px");\n        productClone.style.width = "".concat(productRect.width, "px");\n        productClone.style.height = "".concat(productRect.height, "px");\n        productClone.style.opacity = \'1\';\n        // Clone product price\n        var productPriceClone = productPrice.cloneNode(true);\n        productPriceClone.classList.add(\'clone\');\n        document.body.appendChild(productPriceClone);\n        // --- Place product price clone in the same position as the product price ---\n        setTimeout(function () {\n            productPriceClone.style.position = \'fixed\';\n            productPriceClone.style.left = "".concat(productPriceRect.left, "px");\n            productPriceClone.style.top = "".concat(productPriceRect.top, "px");\n            productPriceClone.style.width = "".concat(productPriceRect.width, "px");\n            productPriceClone.style.height = "".concat(productPriceRect.height, "px");\n        }, 0);\n        // --- Hide product price, description, and title ---\n        setTimeout(function () {\n            productClone.querySelector(".product-price").style.display = "none";\n            productClone.querySelector(".product-description").style.display = "none";\n            productClone.querySelector(".product-title").style.display = "none";\n        }, 0);\n        // --- STEP 3: Show the product detail view ---\n        productDetailView.style.opacity = \'1\';\n        productDetailView.style.pointerEvents = \'auto\';\n        // --- Move the product clone to the center of the product image container ---\n        setTimeout(function () {\n            var updatedProductImageContainerRect = productImageContainer.getBoundingClientRect();\n            productClone.style.left = "".concat(updatedProductImageContainerRect.left, "px");\n            productClone.style.top = "".concat(updatedProductImageContainerRect.top, "px");\n            productClone.style.width = "".concat(updatedProductImageContainerRect.width, "px");\n            productClone.style.height = "".concat(updatedProductImageContainerRect.height, "px");\n        }, 0);\n        // --- Initialize productDetailView description and title ---\n        setTimeout(function () {\n            var productTitleText = productTitle.innerHTML;\n            var productDescriptionText = productDescription.innerHTML;\n            productDetailView.querySelector("#detailTitle").innerHTML = productTitleText;\n            productDetailView.querySelector("#detailDescription").innerHTML = productDescriptionText;\n        }, 0);\n        // --- Move the product price clone to the center of the product image container ---\n        setTimeout(function () {\n            var updatedProductPriceContainerRect = productPriceContainer.getBoundingClientRect();\n            productPriceClone.style.zIndex = \'1000\';\n            productPriceClone.style.left = "".concat(updatedProductPriceContainerRect.left, "px");\n            productPriceClone.style.top = "".concat(updatedProductPriceContainerRect.top, "px");\n            productPriceClone.style.width = "".concat(updatedProductPriceContainerRect.width, "px");\n            productPriceClone.style.height = "".concat(updatedProductPriceContainerRect.height, "px");\n        }, 0);\n        // --- Add event listener to the back button ---\n        backButton.addEventListener(\'click\', function () {\n            productDetailView.style.opacity = \'0\';\n            productDetailView.style.pointerEvents = \'none\';\n            productClone.remove();\n            productPriceClone.remove();\n        });\n    });\n});\n\n\n//# sourceURL=webpack:///./src/script.ts?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = {};
  /******/ __webpack_modules__['./src/script.ts']();
  /******/
  /******/
})();
