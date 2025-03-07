document.querySelectorAll('.product').forEach((product: Element) => {
    product.addEventListener('click', function(this: HTMLElement) {
        // --- STEP 1: define all relevant DOM elements ---

        // DOM: Product
        const product = this as HTMLElement;

        // DOM: Product clone	
        const productClone = product.cloneNode(true) as HTMLElement;
        productClone.classList.add('clone');
        document.body.appendChild(productClone);

        // DOM: Product details (title, description, price)
        const productTitle = productClone.querySelector('.product-title') as HTMLElement;
        const productDescription = productClone.querySelector('.product-description') as HTMLElement;
        const productPrice = this.querySelector('.product-price') as HTMLElement;

        // DOM: Product detail view
        const productDetailView = document.getElementById('productDetailView') as HTMLElement;
        const productImageContainer = productDetailView.querySelector('.product-image-container') as HTMLElement;
        const productPriceContainer = productDetailView.querySelector('#detailPrice') as HTMLElement;
        const backButton = productDetailView.querySelector('#backButton') as HTMLElement;

        // Coords
        const productRect = product.getBoundingClientRect();
        const productPriceRect = productPrice.getBoundingClientRect();

        // Remove appear animation from the productClone
        productClone.style.animation = 'none';

        // --- STEP 2: Place the clone in exact the same position as the product ---
        productClone.style.position = 'absolute';
        productClone.style.left = `${productRect.left}px`;
        productClone.style.top = `${productRect.top}px`;
        productClone.style.width = `${productRect.width}px`;
        productClone.style.height = `${productRect.height}px`;
        productClone.style.opacity = '1';

        // Clone product price
        const productPriceClone = productPrice.cloneNode(true) as HTMLElement;
        productPriceClone.classList.add('clone');
        document.body.appendChild(productPriceClone);

        // --- Place product price clone in the same position as the product price ---
        setTimeout(() => {
            productPriceClone.style.position = 'fixed';
            productPriceClone.style.left = `${productPriceRect.left}px`;
            productPriceClone.style.top = `${productPriceRect.top}px`;
            productPriceClone.style.width = `${productPriceRect.width}px`;
            productPriceClone.style.height = `${productPriceRect.height}px`;
        }, 0);

        // --- Hide product price, description, and title ---
        setTimeout(() => {
            (productClone.querySelector(".product-price") as HTMLElement).style.display = "none";
            (productClone.querySelector(".product-description") as HTMLElement).style.display = "none";
            (productClone.querySelector(".product-title") as HTMLElement).style.display = "none";
        }, 0);

        // --- STEP 3: Show the product detail view ---
        productDetailView.style.opacity = '1';
        productDetailView.style.pointerEvents = 'auto';

        // --- Move the product clone to the center of the product image container ---
        setTimeout(() => {
            const updatedProductImageContainerRect = productImageContainer.getBoundingClientRect();

            productClone.style.left = `${updatedProductImageContainerRect.left}px`;
            productClone.style.top = `${updatedProductImageContainerRect.top}px`;
            productClone.style.width = `${updatedProductImageContainerRect.width}px`;
            productClone.style.height = `${updatedProductImageContainerRect.height}px`;
        }, 0);

        // --- Initialize productDetailView description and title ---
        setTimeout(() => {
            const productTitleText = productTitle.innerHTML;
            const productDescriptionText = productDescription.innerHTML;

            (productDetailView.querySelector("#detailTitle") as HTMLElement).innerHTML = productTitleText;
            (productDetailView.querySelector("#detailDescription") as HTMLElement).innerHTML = productDescriptionText;
        }, 0);

        // --- Move the product price clone to the center of the product image container ---
        setTimeout(() => {
            const updatedProductPriceContainerRect = productPriceContainer.getBoundingClientRect();

            productPriceClone.style.zIndex = '1000';
            productPriceClone.style.left = `${updatedProductPriceContainerRect.left}px`;
            productPriceClone.style.top = `${updatedProductPriceContainerRect.top}px`;
            productPriceClone.style.width = `${updatedProductPriceContainerRect.width}px`;
            productPriceClone.style.height = `${updatedProductPriceContainerRect.height}px`;
        }, 0);

        // --- Add event listener to the back button ---
        backButton.addEventListener('click', function() {
            productDetailView.style.opacity = '0';
            productDetailView.style.pointerEvents = 'none';

            productClone.remove();	
            productPriceClone.remove();
        });

    });
});
