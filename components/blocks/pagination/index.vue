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
                :class="{'block-pagination__item--active': Number(activePage) === index + 1}"
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
            length: {
                type: [Number, String],
                default: 0
            }
        },
        computed: {
            pages() {
                return Boolean(Number(this.length % 2)) ? (this.length - 1) / 2 + 1 : this.length / 2
            },
            isPaginationShow() {
                return this.length ? this.length > 2 : false
            },
            activePage() {
                return this.$route.query.page || 1
            },
            isPrevDisabled() {
                return this.$route.query.page ? this.$route.query.page === 1 : true
            },
            isNextDisabled() {
                return this.$route.query.page ? this.$route.query.page === this.pages : false
                // return this.length ? this.length.page === this.length.total_pages : false
            }
        },
        methods: {
            goToPage(count) {
                this.$emit('click', count)
            },
            goToNextOrPrev(payload) {
                payload === 'prev' ? this.$emit('click', this.activePage - 1) : this.$emit('click', this.activePage + 1)
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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            padding: 3px;
            border-bottom: 2px solid $color--primary;
            list-style: none;
            cursor: pointer;
            user-select: none;
            transition: border 0.3s ease;

            &:hover {
                color: darken($color--accent, 10%);
                border-color: darken($color--accent, 10%);
            }

            &:active {
                opacity: 0.7;
            }

            &--prev,
            &--next {
                position: relative;
                font-size: 0;

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
                        border-color: darken($color--accent, 10%);
                    }
                }
            }

            &--prev {
                position: relative;
                font-size: 0;

                &:before {
                    transform: translate(-20%, -50%) rotate(45deg);
                    border-bottom: 2px solid $color--text;
                    border-left: 2px solid $color--text;
                }
            }

            &--next {
                position: relative;
                font-size: 0;

                &:before {
                    transform: translate(-80%, -50%) rotate(45deg);
                    border-top: 2px solid $color--text;
                    border-right: 2px solid $color--text;
                }
            }

            &--active {
                color: darken($color--accent, 10%);
                border-color: darken($color--accent, 10%);
            }

            &--disabled {
                pointer-events: none;
                opacity: 0.4;
            }
        }
    }
</style>
