<template>
  <div id="nav" class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/updates">Updates</router-link>
  </div>
  <router-view/>
</template>

<style lang="postcss">
#app {
  @apply min-h-screen bg-gradient-to-b from-blue-300 via-gray-300 to-green-300 font-sans
    text-left text-blueGray-800 antialiased;
}

#nav {
  @apply p-3.5 text-center;
}

#nav a {
  @apply font-bold text-blueGray-800;
}

#nav a.router-link-exact-active {
  @apply text-red-400;
}
</style>
