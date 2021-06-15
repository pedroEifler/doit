<template>
  <div id="app text-center">
    <div class="container">
      <div class="columns">
        <a href="#" class="col-mx-auto text-center text-bold h1">Doit!</a>
      </div>
      <div class="columns mt-2 pt-2 mb-2">
        <form class="col-mx-auto" @submit="adicionar(doit)">
          <div class="input-group">
            <input
              type="text"
              class="form-input input-lg"
              placeholder="O que você quer fazer?"
              v-model="doit.titulo"
            />
            <button class="btn btn-secondary input-group-btn btn-lg">
              Adicionar
            </button>
          </div>
        </form>
      </div>
      <doit
        v-for="d in doits"
        :key="d.id"
        @toggle="marcar"
        @click="deletar"
        @editar="editar"
        @editando="db"
        :doit="d"
      ></doit>
    </div>
  </div>
</template>

<script>
import {
  listarTodos,
  listarPorId,
  editar,
  adicionar,
  deletar,
} from "./services/api";
import Doit from "./components/Doit";

export default {
  name: "App",
  components: {
    Doit,
  },
  data() {
    return {
      doits: [],
      doit: {
        id: null,
        titulo: "",
        marcado: false,
        editando: false,
      },
    };
  },

  async created() {
    this.listarTodos();
  },

  methods: {
    async listarTodos() {
      try {
        const { data } = await listarTodos();
        this.doits = data;
      } catch (error) {
        alert("Não foi possivel buscar os dados.");
      }
    },

    async listarPorId(id) {
      try {
        const { data } = await listarPorId(id);
        this.doits.push(data);
      } catch (error) {
        alert("Não foi possivel buscar os dados.");
      }
    },

    async adicionar(doit) {
      try {
        if (this.doitValido(doit)) {
          await adicionar(doit);
          this.listarTodos();
          this.doit.titulo = "";
        }

        console.log(this.doit);
      } catch (error) {
        alert("Não foi possivel adicionar essa tarefa.");
      }
    },

    async editar(doit) {
      try {
        console.log(doit);
        doit.editando = false;
        await editar(doit);
        this.listarTodos();
      } catch (error) {
        alert("Não foi possivel editar essa tarefa.");
      }
    },

    async deletar(doit) {
      try {
        await deletar(doit);
        this.listarTodos();
      } catch (error) {
        alert("Não foi possivel deletar essa tarefa.");
      }
    },

    async marcar(doit) {
      try {
        doit.marcado = !doit.marcado;
        await this.editar(doit);
      } catch (error) {
        alert("Não foi possivel deletar essa tarefa.");
      }
    },

    doitValido(doit) {
      console.log(doit);
      if (doit.titulo) return true;
      return alert("Você não quer fazer nada?");
    },

    async db(doit) {
      doit.editando = !doit.editando;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");
#app {
  font-family: "Righteous", cursive;
}
</style>