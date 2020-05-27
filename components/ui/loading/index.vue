<template>
    <transition name="fade">
        <div class="ui-loading">
            <span></span>
        </div>
    </transition>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
        .ui-loading {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 200;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgba($color--base, 1);

            span {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-bottom-color: currentColor;
                border-radius: 50%;
                animation: spin 1.5s linear infinite;
                pointer-events: none;

                &:before {
                    content: '';
                    display: block;
                    width: 10px;
                    height: 10px;
                    border: 2px solid currentColor;
                    border-radius: 50%;
                    animation: pulse 1s alternate ease-in-out infinite;
                }
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.3s ease;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
            transition-duration: 0.5s;
        }

</style>
