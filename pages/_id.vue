<template>
    <section class="page-product">
        <div class="wrap">
            <h1 class="page-product__title">{{ form.title }}</h1>
            <input class="page-product__item" type="text" v-model="form.title">
            <input class="page-product__item" type="text" v-model="form.price">
            <textarea class="page-product__item" type="text" v-model="form.description"></textarea>
            <UiBtn :loading="isLoading" @click="send" class="page-product__btn" size="medium" theme="positive" type=button>
                Отредактировать
            </UiBtn>
        </div>
    </section>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        async fetch({store, params}) {
            try {
                await store.dispatch('products/stGetProductById', params.id)
            } catch (e) {
                console.log(e)
            }
        },
        data() {
            return {
                form: {
                    title: '',
                    price: '',
                    description: '',

                },
                isLoading: false
            }
        },
        computed: {
            ...mapState('products', ['product']),
        },
        methods: {
            ...mapActions('products', ['stUpdateProduct']),
            lol(e) {
                console.log(444);
                console.log(e.target.value);
                this.form.title = e.target.value
            },
            async send() {
                this.isLoading = true;
                const data = {
                    id: this.product.id,
                    title: this.form.title.length ? this.form.title : this.product.title,
                    price: this.form.price.length ? this.form.price : this.product.price,
                    description: this.form.description.length ? this.form.description : this.product.description
                };
                await this.stUpdateProduct(data);
                this.isLoading = false
            }
        },
        mounted() {
            this.form.title = this.product.title;
            this.form.price = this.product.price;
            this.form.description = this.product.description
        }
    }
</script>

<style lang="scss" scoped>
    .page-product {
        width: 100%;
        padding: $gutter;

        .wrap {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100%;
        }

        &__item {
            width: 300px;
            margin-top: $gutter;
            padding: $gutter / 2;
            font-family: $family--default;
            font-size: 14px;
            color: $color--text;
            font-weight: 400;
            border: 0;
            border-radius: 5px;
            background-color: lighten($color--base, 10%);
            resize: none;
        }

        &__btn {
            margin-top: $gutter;
        }
    }
</style>
