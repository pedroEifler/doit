<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <a href="#" class="col-mx-auto text-center text-bold h1">Doit!</a>
      </div>
      <div class="columns mt-2 pt-2 mb-2">
        <form class="col-11">
          <div class="input-group has-icon-left">
            <i
              title="Marcar todos"
              class="form-icon icon icon-arrow-down"
              @click.prevent="marcarTodos()"
            ></i>
            <input
              type="text"
              class="form-input input-lg"
              placeholder="O que você quer fazer?"
              v-model="doit.titulo"
              @keydown.enter.prevent="adicionar(doit)"
            />
            <button
              @click.prevent="adicionar(doit)"
              class="btn btn-secondary input-group-btn btn-lg"
            >
              Adicionar
            </button>
          </div>
          <div class="mt-2 pt-2">
            <doit ref="doit" @animacao="animacao"></doit>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Doit from "./components/Doit";

export default {
  name: "App",
  components: {
    Doit,
  },

  data() {
    return {
      doit: {
        id: null,
        titulo: "",
        marcado: false,
        editando: false,
      },
    };
  },
  methods: {
    adicionar: function () {
      this.$refs.doit.adicionar(this.doit);
      this.doit.titulo = "";
      const input = document.querySelector("#app input");
      input.focus();
    },

    marcarTodos: function () {
      this.$refs.doit.marcarTodos();
    },

    animacao() {
      const app = document.querySelector("#app");
      app.className.add("animacao");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");
#app {
  font-family: "Righteous", cursive;
  margin-top: 9%;
  transition: 300ms;
}
#app form {
  margin: auto;
  max-width: 500px;
}
</style>