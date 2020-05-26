<template>
    <div class="block-pagination">
        <ul class="block-pagination__list" v-if="isPaginationShow">
            <li
                :class="{'block-pagination__item--disabled': isPrevDisabled}"
                @click="goToNextOrPrev('prev')"
                class="block-pagination__item block-pagination__item--prev"
            >
                prev
            </li>

            <li
                :class="{'block-pagination__item--active': activePage === item}"
                :key="index"
                @click="goToPage(item)"
                class="block-pagination__item"
                v-for="(item, index) in pages"
            >
                {{ item }}
            </li>
            <li
                :class="{'block-pagination__item--disabled': isNextDisabled}"
                @click="goToNextOrPrev('next')"
                class="block-pagination__item block-pagination__item--next"
            >
                next
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            info: {
                type: [Number, String],
                default: 0
            }
        },
        computed: {
            pages () {
                return this.info ? Number(this.info.total_pages) : 0
            },
            isPaginationShow () {
                return this.info ? this.info.total_pages > 1 : false
            },
            activePage () {
                return this.info ? this.info.page : 1
            },
            isPrevDisabled () {
                return this.info ? this.info.page === 1 : false
            },
            isNextDisabled () {
                return this.info ? this.info.page === this.info.total_pages : false
            }
        },
        methods: {
            goToPage (count) {
                this.$emit('click', count)
            },
            goToNextOrPrev (payload) {
                let val = ''
                if (this.info) {
                    payload === 'prev' ? val = this.info.page - 1 : val = this.info.page + 1
                }
                this.$emit('click', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .block-pagination {
        display: flex;
        justify-content: center;
        &__list {
            margin: 0;
            padding: 0;
            display: inline-flex;
            justify-content: center;
            color: $color--text-light;
            border-radius: 5px;
        }
        &__item {
            height: 40px;
            padding: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            list-style: none;
            cursor: pointer;
            user-select: none;
            transition: border 0.3s ease;
            border-bottom: 2px solid $color--primary;
            width: 40px;
            &:hover {
                color: darken($color--primary, 10%);
                border-color: darken($color--primary, 10%);
            }
            &:active {
                opacity: 0.7;
            }
            &--prev,
            &--next {
                font-size: 0;
                position: relative;
                &:before {
                    height: 10px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    content: '';
                    transform: translate(-20%, -50%) rotate(45deg);
                    width: 10px;
                }
                &:hover {
                    &:before {
                        border-color: darken($color--primary, 10%);
                    }
                }
            }
            &--prev {
                font-size: 0;
                position: relative;
                &:before {
                    transform: translate(-20%, -50%) rotate(45deg);
                    border-bottom: 2px solid $color--text;
                    border-left: 2px solid $color--text;
                }
            }
            &--next {
                font-size: 0;
                position: relative;
                &:before {
                    transform: translate(-80%, -50%) rotate(45deg);
                    border-top: 2px solid $color--text;
                    border-right: 2px solid $color--text;
                }
            }
            &--active {
                color: darken($color--primary, 10%);
                border-color: darken($color--primary, 10%);
            }
            &--disabled {
                pointer-events: none;
                opacity: 0.4;
            }
        }
    }
</style>
