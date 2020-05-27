<template>
    <div class="block-form" @click.self="$emit('hide')">
        <form class="block-form__form" @submit.prevent="send($event)">
            <input class="block-form__item" type="text" placeholder="Название продукта" v-model="form.title">
            <input class="block-form__item" type="text" placeholder="Стоимость" v-model="form.price">
            <textarea class="block-form__item" placeholder="Описание" v-model="form.description"></textarea>
            <UiBtn class="block-form__btn" theme="accent" size="default" :disabled="isDisabled">Создать продукт</UiBtn>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    title: '',
                    price: '',
                    description: ''
                }
            }
        },
        computed: {
            isDisabled() {
                return !this.form.title.length ||
                    !this.form.price.length ||
                    !this.form.description.length
            }
        },
        methods: {
            send(e) {
                !this.isDisabled ? this.$emit('submit', this.form) : e.stopPropagation()
            }
        }
    }
</script>

<style scoped lang="scss">
    .block-form {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        z-index: 100;
        cursor: pointer;
        background-color: rgba(24, 33, 57, 0.6);

        &__form {
            z-index: 99;
            cursor: auto;
            width: 460px;
            padding: $gutter;
            display: flex;
            flex-direction: column;
            background-color: lighten($color--base, 10%);
            border-bottom-left-radius: $gutter / 2;
            border-bottom-right-radius: $gutter / 2;
        }

        &__item {
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.16);
            border: 1px solid rgba(255, 255, 255, 0.16);
            color: $color--text;
            padding: $gutter / 2;
            outline: none;
            font-family: $family--default;
            resize: none;

            &::placeholder {
                color: $color--text;
                transition-duration: 0.3s;
            }

            &:focus {
                &::placeholder {
                    color: transparent;
                }
            }

            & + & {
                margin-top: $gutter;
            }
        }

        &__btn {
            margin-top: $gutter;
        }

    }
</style>
