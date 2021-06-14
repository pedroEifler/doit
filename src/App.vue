<template>
  <div id="app"></div>
</template>

<script>
import {
  listarTodos,
  listarPorId,
  editar,
  adicionar,
  deletar,
} from "./services/api";

export default {
  name: "App",
  data() {
    return {
      doits: [],
      doit: {
        id: null,
        titulo: "",
        marcado: false,
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
        await adicionar(doit);
        this.listarTodos();
      } catch (error) {
        alert("Não foi possivel adicionar essa tarefa.");
      }
    },

    async editar(doit) {
      try {
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
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>