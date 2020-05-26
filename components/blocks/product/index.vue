<template>
    <div class="block-product">
        <img class="block-product__img" src="/assets/images/preview.jpg" alt="">
        <span class="block-product__item"><span class="block-product__item-title">Артикул:</span> {{ info.id }}</span>
        <span class="block-product__item"><span class="block-product__item-title">Название:</span> {{ info.title }}</span>
            <span class="block-product__item"><span class="block-product__item-title">Цена:</span> {{ info.price }}</span>
        <span class="block-product__item"><span class="block-product__item-title">Дата покупки:</span> {{ info.date_of_purchase }}</span>
        <span class="block-product__item"><span class="block-product__item-title">Функционал:</span> {{ info.description }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object,
                default: null
            }
        }
    }
</script>

<style scoped lang="scss">
    .block-product {
        box-shadow: 0 0 15px 2px lighten($color--base, 10%);
        border-radius: $gutter / 2;
        padding-bottom: $gutter / 2;
        &__img {
            max-width: 100%;
            height: auto;
            border-top-right-radius: $gutter / 2;
            border-top-left-radius: $gutter / 2;
        }

        &__item {
            padding: 0 $gutter / 2;
            display: block;
            margin-top: $gutter / 3;

            &-title {
                color: $color--positive
            }
        }
    }
</style>
