<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<style>
body,html{
  padding: 0;
  margin: 0;
}
.flex-flaot{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex{
  display: flex;
  align-items: center;
}
.page_content{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: block;
  background: #fff;
  margin-top: 30px;
}
.justify-between {
  justify-content: space-between;
}
.flex-wrap {
  flex-wrap: wrap;
}

</style>
