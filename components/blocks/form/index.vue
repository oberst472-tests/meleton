<template>
    <div class="block-form" @click.self="$emit('hide')">
        <form class="block-form__form" @submit.prevent="send($event)">
            <div class="block-form__box">
                <input class="block-form__item" type="text" placeholder="Название продукта" v-model="form.title">
                <span v-if="titleValid" class="block-form__box-error">Только русские буквы</span>
            </div>
            <div class="block-form__box">
                <input class="block-form__item" type="text" placeholder="Стоимость" v-model="form.price">
                <span v-if="priceValid" class="block-form__box-error">Только цифры</span>
            </div>
            <div class="block-form__box">
                <textarea class="block-form__item" placeholder="Описание" v-model="form.description"></textarea>
            </div>
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
            send(e) {
                !this.isDisabled ? this.$emit('submit', this.form) : e.stopPropagation()
            }
        }
    }
</script>

<style scoped lang="scss">
    .block-form {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 100vh;
        background-color: rgba(24, 33, 57, 0.6);
        cursor: pointer;

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

        &__box {
            width: 100%;
            position: relative;
            & + & {
                margin-top: $gutter;
            }
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
            width: 100%;
            padding: $gutter / 2;
            font-family: $family--default;
            font-size: 14px;
            color: $color--text;
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 5px;
            outline: none;
            background-color: rgba(255, 255, 255, 0.16);
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
        }

        &__btn {
            margin-top: $gutter;
        }

    }
</style>
