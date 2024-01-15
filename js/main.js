Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
     
            <div class="product-image">
                <img v-bind:alt="altText" v-bind:src="image"/>
            </div>
     
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="onSale">on sale</p>
                <p v-if="inStock">In stock</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <product-detail></product-detail>
                <p>Shipping: {{ shipping }}</p>
                <div class="color-box" @mouseover="updateProduct(index)" :style="{ backgroundColor:variant.variantColor }" v-for="(variant, index) in variants" :key="variant.variantId"></div>
                <div v-for="size in sizes">
                    <p>{{ size }}</p>
                </div>

                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                <button v-on:click="removeFromCart">remove from cart</button>

            </div>

            <a v-bind:href="link"> {{ linkText }}</a>

        </div>`,
    data(){
        return {
            product: "Socks",
            brand: "Vue Mastery",
            desc: " A pair of warm, fuzzy socks. ",
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            linkText: "More products like this",
            inventory: 100,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    variantSale: true,
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    variantSale: false,
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0,
            selectedVariant: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index);
        },
        removeFromCart() {
            this.cart -= 1
        }     
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        onSale(){
            return this.variants[this.selectedVariant].variantSale;
        },
        shipping(){
            if(this.premium){
                return "free";
            }
            else{
                return 2.99
            }
        }
    } 
})

Vue.component('product-detail', {
    template: `
    <ul>
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>
    `,
    data(){
        return {details: ['80% cotton', '20% polyester', 'Gender-neutral']}
    }
    
})
let app = new Vue({
    el: "#app",
    data: {
        premium: true
    }
})