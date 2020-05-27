<template>
    <div class="section-footer">
        <div class="wrap">
            <div class="section-footer__content">
                <span>&copy;2020</span>
                <span>Не пытайтесь повторить!</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    .section-footer {
        margin-top: $gutter * 2;
        background-color: darken($color--primary, 5%);

        &__content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
        }
    }
</style>
