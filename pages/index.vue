<template>
    <section class="page-main">
        <div class="wrap">
            <h1 class="page-main__title">{{ title }}</h1>
            <div class="page-main__content">
                <BlockProduct class="page-main__content-product" v-for="item in items" :key="item.index" :info="item"/>
            </div>
            <BlockPagination
                class="page-main__pagination"
                :length="totalNumber"
                @click="goToPage"
            />
        </div>
    </section>
</template>

<script>
    import products from '@/mocks/products'
    import {mapState, mapActions} from 'vuex'
    import BlockProduct from '@/components/blocks/product'
    import BlockPagination from '@/components/blocks/pagination'

    export default {
        head() {
            return {
                title: this.title
            }
        },
        components: {
            BlockProduct,
            BlockPagination
        },
        async fetch (context) {
            let from = context.query.page || 0
            try {
                await context.store.dispatch('products/stAddItems', {from, limit: 2})
            } catch (e) {
                console.log(e)
            }
        },
        data() {
            return {
                title: 'Все продукты'
            }
        },
        computed: {
            ...mapState('products', ['items', 'totalNumber']),
        },
        methods: {
            ...mapActions('products', ['stAddItems']),
            async goToPage(val) {
                this.$router.push({name: 'index', query: {page: val}})
                await this.stAddItems({from: val, limit: 2})
            }
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
        &__pagination {
            margin-top: $gutter;
        }
    }
</style>
