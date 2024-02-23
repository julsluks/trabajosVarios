import { RouterLink } from 'vue-router'
import HelloWorld from './HelloWorld.vue'

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <HelloWorld msg="You did it!" />

            <nav>
                <RouterLink id="link" to="/">Home</RouterLink>
                <RouterLink type="button" to="/about">About</RouterLink>
            </nav>
        </div>
    </header>
</template>