<template>
  <div id="nav" class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/bingo-generator">Bingo Generator</router-link> |
    <router-link to="/goals-library">Goals Library</router-link> |
    <router-link :to="{name: 'Update Log'}">Updates</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view class="px-20 py-10"/>
</template>

<style lang="postcss">
#app {
  @apply min-h-screen bg-fixed bg-gradient-to-b from-blue-300 via-gray-300 to-green-300 font-sans
    text-left text-blueGray-800 antialiased;
}

#nav {
  @apply p-3.5 text-center;
}

#nav a {
  @apply font-bold text-blueGray-800;
}

#nav a.router-link-active {
  @apply text-orange-400;
}
/* hover:text-blueGray-500 */
button.btn {
  @apply mx-2 border-2 px-2 rounded-lg border-gray-900 
}

button.primary {
  @apply font-bold bg-green-400 hover:bg-green-300 active:bg-green-600
}

button.secondary {
  @apply bg-white hover:bg-gray-50
}
</style>
