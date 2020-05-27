<template>
    <section class="section-header" :class="`section-header-${$route.name}`">
        <div class="wrap">
            <div class="section-header__content">
                <UiBtn @click="$router.push({name: 'index'})" circle size="small" theme="accent" icon="home" v-if="$route.name !== 'index'" title="На главную">
                    Назад
                </UiBtn>
                <span class="section-header__logo">logo</span>
                <div class="section-header__options">
                    <UiBtn theme="positive" size="medium" @click="changeFormActive(true)">Добавить товар</UiBtn>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        methods: {
            ...mapActions('products', ['changeFormActive'])
        }
    }
</script>

<style lang="scss" scoped>
    .section-header {
        background-color: darken($color--primary, 5%);

        &__logo {
            @include adaptiveFont(15px, 20px);
            margin: 0 0 0 $gutter / 2;
        }

        &__content {
            padding: $gutter / 2 0;
            display: flex;
            align-items: center;
            @include md() {
                padding: $gutter / 2 0;
                justify-content: space-between;
            }
        }

        &__options {
            margin-left: auto;
            display: flex;

            & > * {
                @include md() {
                    margin-left: $gutter / 2;
                }
            }
        }

        &-edit {
            .section-header__content {
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .section-header__options {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-top: $gutter / 3;
                @include md() {
                    width: auto;
                    margin-top: 0;
                }
            }

            .section-header__btn {
                font-size: 10px;
                @include sm() {
                    font-size: 12px;
                }
                @include md() {
                    margin: 0 0 0 $gutter / 3;
                }
            }
        }
    }
</style>
