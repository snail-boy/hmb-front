<template>
    <div id="app">
      <router-view v-if="$route.meta.isTransition"></router-view>
      <vue-better-router-transition :keepAlive="true"></vue-better-router-transition>
    </div>
</template>

