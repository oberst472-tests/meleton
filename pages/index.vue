<template>
    <section class="page-main">
        <div class="wrap">
            <div class="page-main__box">
                <h1 class="page-main__title">{{ title }}</h1>
                <div class="page-main__sort">
                    <BlockSort @click="sortDate" :active="sort === 'date'" :direction="sortDirection">По дате</BlockSort>
                    <BlockSort @click="sortPrice" :active="sort === 'price'" :direction="sortDirection">По цене</BlockSort>
                </div>
            </div>
            <div class="page-main__content" v-if="items.length">
                <UiLoading v-if="isLoading"/>
                <BlockProduct :info="item" :key="item.index" @delete="deleteProduct" @goToPage="goTo" class="page-main__content-product" v-for="item in items"/>
            </div>
            <span v-else class="page-main__mock-text">Нет продуктов :(</span>
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
    import {mapActions, mapState} from 'vuex'
    import BlockProduct from '@/components/blocks/product'
    import BlockPagination from '@/components/blocks/pagination'
    import BlockForm from '@/components/blocks/form'
    import BlockSort from '@/components/blocks/sort'

    export default {
        head() {
            return {
                title: this.title
            }
        },
        components: {
            BlockProduct,
            BlockPagination,
            BlockForm,
            BlockSort
        },
        async fetch({store, query}) {
            let page = query.page || 1;
            try {
                await store.dispatch('products/stAddItems', {page})
            } catch (e) {
                console.log(e)
            } finally {
            }
        },
        data() {
            return {
                isLoading: false,
                title: 'Все продукты'
            }
        },
        computed: {
            ...mapState('products', ['items', 'totalNumber', 'isFormActive', 'sort', 'sortDirection']),
        },
        methods: {
            ...mapActions('products', ['stAddItems', 'changeFormActive', 'stAddNewProduct', 'stDeleteProduct', 'sortPrice', 'sortDate']),
            async goToPage(val) {
                this.isLoading = true;
                this.$router.push({name: 'index', query: {page: val}})
                await this.stAddItems({page: val})
                this.isLoading = false
            },
            async createProduct(form) {
                this.changeFormActive(false);
                this.isLoading = true;
                await this.stAddNewProduct(form)
                await this.stAddItems({page: 1})
                this.$router.push({name: 'index', query: {page: 1}})
                this.isLoading = false;
            },
            async deleteProduct(id) {
                this.isLoading = true;
                await this.stDeleteProduct(id)
                await this.stAddItems({page: 1})
                this.$router.push({name: 'index', query: {page: 1}})
                this.isLoading = false;

            },
            goTo(id) {
                this.$router.push(`/${id}`)
            },

        },
    }
</script>

<style lang="scss" scoped>
    .page-main {
        display: flex;
        width: 100%;

        .wrap {
            display: flex;
            flex-direction: column;
            width: 100%;

        }
        &__box {
            display: flex;
            width: 588px;
            margin-left: auto;
            margin-right: auto;
            align-items: center;
            justify-content: space-between;
        }

        &__title {
            text-align: center;
            padding: $gutter 0;
            font-size: 22px;


        }

        &__content {
            position: relative;
            display: flex;
            align-items: flex-start;
            flex-grow: 1;
            padding: $gutter / 2;
            overflow: hidden;
            justify-content: center;

            &-product {
                margin: 0 $gutter / 2;
                width: 100%;
                max-width: 30%;
            }
        }
        &__mock-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__pagination {
            margin-top: $gutter;
        }
    }
</style>
