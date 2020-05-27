<template>
    <section class="page-main">
        <div class="wrap">
            <h1 class="page-main__title">{{ title }}</h1>
            <div class="page-main__content">
                <UiLoading v-if="isLoading || $fetchState.pending"/>
                <BlockProduct class="page-main__content-product" v-for="item in items" :key="item.index" :info="item"/>
            </div>
            <BlockPagination
                class="page-main__pagination"
                :length="totalNumber"
                @click="goToPage"
            />
            <transition name="fade">
                <BlockForm v-if="isFormActive" @hide="changeFormActive(false)" @submit="createProduct"/>
            </transition>
        </div>
    </section>
</template>

<script>
    import products from '@/mocks/products'
    import {mapState, mapActions} from 'vuex'
    import BlockProduct from '@/components/blocks/product'
    import BlockPagination from '@/components/blocks/pagination'
    import BlockForm from '@/components/blocks/form'

    export default {
        head() {
            return {
                title: this.title
            }
        },
        components: {
            BlockProduct,
            BlockPagination,
            BlockForm
        },
        async fetch (context) {
            this.isLoading = true
            let page = context.query.page || 0
            try {
                await context.store.dispatch('products/stAddItems', {page, limit: 2})
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoading = false
            }
        },
        data() {
            return {
                isLoading: false,
                title: 'Все продукты'
            }
        },
        computed: {
            ...mapState('products', ['items', 'totalNumber', 'isFormActive']),
        },
        methods: {
            ...mapActions('products', ['stAddItems', 'changeFormActive', 'stAddNewProduct']),
            async goToPage(val) {
                this.$router.push({name: 'index', query: {page: val}})
                await this.stAddItems({page: val, limit: 2})
            },
            async createProduct(form) {
                await this.stAddNewProduct(form)
            }
        },
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
            overflow: hidden;
            position: relative;
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
