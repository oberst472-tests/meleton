<template>
    <section class="main-layout">
        <header>
            <SectionHeader/>
        </header>
        <main>
            <nuxt />
        </main>
    </section>
</template>

<script>
    import SectionHeader from '@/components/sections/header'
    export default {
        components: {
            SectionHeader
        }

    }
</script>

<style>

</style>
