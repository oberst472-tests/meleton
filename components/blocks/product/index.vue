<template>
    <div class="block-product">
        <img class="block-product__img" src="/assets/images/preview.jpg" alt="">
        <span class="block-product__item"><span class="block-product__item-title">Артикул:</span> {{ info.id }}</span>
        <span class="block-product__item"><span class="block-product__item-title">Название:</span> {{ info.title }}</span>
        <span class="block-product__item"><span class="block-product__item-title">Цена:</span> {{ info.price | formatPrice }} р.</span>
        <span class="block-product__item"><span class="block-product__item-title">Дата покупки:</span> {{ info.date_of_purchase | formatDate }}</span>
        <span class="block-product__item"><span class="block-product__item-title">Функционал:</span> {{ info.description | croppedDesc }}</span>
        <div class="block-product__options">
            <UiBtn @click="$emit('delete', info.id)" size="small" theme="negative">Удалить</UiBtn>
            <UiBtn @click="$emit('goToPage', info.translate_title)" size="small" theme="positive">Редактировать</UiBtn>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object,
                default: null
            }
        },
        filters: {
            croppedDesc(value) {
                return value.length > 15 ? value.substring(0, 15) + ' ...' : value
            },
            formatPrice(value) {
                return Math.round(value).toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ')
            },
            formatDate(value) {
                const date = new Date(Number(value));
                return date.toLocaleString().substring(0, 17).split(',').join(' ')
            }
        },
    }
</script>

<style scoped lang="scss">
    .block-product {
        padding-bottom: $gutter / 2;
        border-radius: $gutter / 2;
        box-shadow: 0 0 15px 4px darken($color--base, 7%);

        &:hover {
            .block-product__options {
                height: 50px;
            }
        }

        &__img {
            max-width: 100%;
            height: auto;
            border-top-right-radius: $gutter / 2;
            border-top-left-radius: $gutter / 2;
        }

        &__item {
            display: block;
            margin-top: $gutter / 3;
            padding: 0 $gutter / 2;
            font-size: 12px;

            span {
                font-size: 16px;
            }

            &-title {
                color: $color--positive
            }
        }

        &__options {
            display: flex;
            justify-content: space-between;
            height: 0;
            padding: 15px;
            padding-bottom: 0;
            overflow: hidden;
            transition-duration: 0.3s;

            & > * {
                width: 48% !important;
            }
        }
    }
</style>
