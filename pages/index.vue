<template>
    <section class="page-main">
        <div class="wrap">
            <h1 class="page-main__title">{{ title }}</h1>
            <div class="page-main__content">
                <BlockProduct class="page-main__content-product" v-for="item in items" :key="item.index" :info="item"/>
            </div>
<!--            <BlockPagination-->
<!--                class="view-users__pagination"-->
<!--                :info="items.length"-->
<!--                @click="goToPage"-->
<!--            />-->
        </div>
    </section>
</template>

<script>
    import products from '@/mocks/products'
    import {mapState} from 'vuex'
    import BlockProduct from '@/components/blocks/product'
    // import BlockPagination from '@/components/blocks/pagination'

    export default {
        head() {
            return {
                title: this.title
            }
        },
        components: {
            BlockProduct,
            // BlockPagination
        },
        fetch ({store}) {
            store.dispatch('products/stAddItems', products)
        },
        data() {
            return {
                title: 'Все продукты'
            }
        },
        computed: {
            ...mapState('products', ['items']),
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .page-main {
        &__title {
            text-align: center;
            padding: $gutter 0;
            font-size: 22px;


        }
        &__content {
            display: flex;
            justify-content: space-between;
            &-product {
                width: 100%;
                max-width: 48%;
            }
        }
    }
</style>
