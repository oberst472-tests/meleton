<template>
    <section class="main-layout">
        <header class="main-layout__header">
            <SectionHeader/>
        </header>
        <main class="main-layout__content">
            <nuxt />
        </main>
        <footer class="main-layout__footer">
            <SectionFooter/>
        </footer>
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
        height: 100vh;
        display: flex;
        flex-direction: column;
        &__content {
            flex-grow: 1;
        }
    }

</style>
