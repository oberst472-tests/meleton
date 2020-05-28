<template>
    <button class="block-sort" @click="$emit('click')" :class="[{'block-sort--active': active}, [`block-sort--${direction}`] ]">
        <span class="block-sort__text"><slot/></span>
        <svg class="block-sort__svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 384 384" style="enable-background:new 0 0 384 384;" xml:space="preserve">
			<polygon class="block-sort__svg-top" points="128,0 42.667,85.12 106.667,85.12 106.667,234.667 149.333,234.667 149.333,85.12 213.333,85.12"/>
            <polygon class="block-sort__svg-bottom" points="277.333,298.88 277.333,149.333 234.667,149.333 234.667,298.88 170.667,298.88 256,384 341.333,298.88"/>
        </svg>
    </button>
</template>

<script>
    export default {
        props: {
            active: {
                type: Boolean,
                default: false
            },
            direction: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style scoped lang="scss">
.block-sort {
    background-color: transparent;
    padding: 5px;
    border: 1px solid $color--text;
    display: inline-flex;
    text-transform: lowercase;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    &:active {
        opacity: 0.5;
    }
    &__text {color: $color--text}
    &__svg {width: 20px}
    &__svg-top {
        fill: $color--text
    }
    &__svg-bottom {
        fill: $color--text
    }
    &__svg-active {
        color: $color--positive
    }
    &--active {
        border-color: $color--accent
    }
    &--active.block-sort--top {
        .block-sort__svg-top {
            fill: $color--accent
        }
        .block-sort__svg-bottom {
            fill: rgba($color--text, 0.4)
        }
    }
    &--active.block-sort--bottom {
        .block-sort__svg-top {
            fill: rgba($color--text, 0.4)
        }
        .block-sort__svg-bottom {
            fill: $color--accent
        }
    }

}
</style>
