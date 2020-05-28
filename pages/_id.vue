<template>
    <section class="page-product">
        <div class="wrap">
            <h1 class="page-product__title">{{ form.title }}</h1>
            <div class="page-product__box">
                <input class="page-product__item" type="text" v-model="form.title">
                <span v-if="titleValid" class="page-product__box-error">Только русские буквы</span>
            </div>
            <div class="page-product__box">
                <input class="page-product__item" type="text" v-model="form.price">
                <span v-if="priceValid" class="page-product__box-error">Только цифры</span>
            </div>
            <div class="page-product__box">
                <textarea class="page-product__item" type="text" v-model="form.description"></textarea>
            </div>
            <UiBtn :loading="isLoading"
                   @click="send"
                   class="page-product__btn" size="medium"
                   theme="positive"
                   type=button
                   :disabled="isDisabled"
            >
                Отредактировать
            </UiBtn>
        </div>
    </section>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        head() {
            return {
                title: this.form.title
            }
        },
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
            isDisabled() {
                return !this.form.title.length ||
                    !this.form.price.length ||
                    !this.form.description.length ||
                    this.priceValid ||
                    this.titleValid

            },
            priceValid() {
                return /[^\d]/.test(this.form.price)
            },
            titleValid() {
                return /[^а-яё]+/i.test(this.form.title)
            }
        },
        methods: {
            ...mapActions('products', ['stUpdateProduct']),
            ...mapActions('messages', ['message']),
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
                this.message(['positive', 'Продукт отредактирован'])
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
        &__box {
            width: 300px;
            position: relative;
                margin-top: $gutter;
            &-error {
                position: absolute;
                top: calc(100% + 5px);
                left: 0;
                background-color: $color--negative;
                color: $color--text;
                padding: 3px;
                font-size: 12px;
                border-radius: 5px;
                text-transform: lowercase;
                &:before {
                    content: '';
                    position: absolute;
                    left: 15px;
                    top: -3px;
                    width: 5px;
                    height: 5px;
                    background-color: $color--negative;
                    transform: rotate(45deg);
                }

            }

        }

        &__item {
            width: 300px;
            padding: $gutter / 2;
            font-family: $family--default;
            font-size: 14px;
            color: $color--text;
            font-weight: 400;
            border: 0;
            border-radius: 5px;
            background-color: lighten($color--base, 10%);
            resize: none;
            outline: 0;
        }

        &__btn {
            margin-top: $gutter;
        }
    }
</style>
