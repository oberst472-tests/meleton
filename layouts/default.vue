<template>
    <section class="main-layout">
        <header class="main-layout__header">
            <SectionHeader/>
        </header>
        <main class="main-layout__content">
            <transition mode="out-in" name="layout-fade">
                <nuxt/>
            </transition>
        </main>
        <footer class="main-layout__footer">
            <SectionFooter/>
        </footer>
        <UiMessage/>
    </section>
</template>

<script>
    import SectionHeader from '@/components/sections/header'
    import SectionFooter from '@/components/sections/footer'

    export default {
        components: {
            SectionHeader,
            SectionFooter
        }

    }
</script>

<style lang="scss" scoped>
    .main-layout {
        display: flex;
        flex-direction: column;
        height: 100vh;

        &__content {
            display: flex;
            flex-grow: 1;
        }
    }

</style>
