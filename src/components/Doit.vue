<template>
  <div id="doit">
    <filtros
      class="pt-2 pb-2"
      :doits="doits"
      @todos="filtrar"
      @ativos="filtrar"
      @completos="filtrar"
    ></filtros>
    <div
      v-bind:class="{ 'bg-secondary': doit.marcado }"
      class="card mt-1 p-2"
      v-for="doit in filtros"
      :key="doit.id"
    >
      <div class="d-flex">
        <div class="card-header">
          <!--<label class="form-switch m-0">
            <input
              @click="marcar(doit)"
              :checked="doit.marcado"
              type="checkbox"
            />
            <i class="form-icon"></i>
          </label>-->
          <label class="form-radio m-0 form-inline">
            <input
              type="radio"
              @click="marcar(doit)"
              :checked="doit.marcado"
            /><i class="form-icon"></i>
          </label>
        </div>
        <div class="card-body">
          <div v-if="doit.editando">
            <span>
              <input
                class="form-input"
                v-model="doit.titulo"
                @keydown.enter="editar(doit)"
                @dblclick="editar(doit)"
              />
            </span>
          </div>
          <div @dblclick="editando(doit)" v-else>
            <span>
              {{ doit.titulo }}
            </span>
          </div>
        </div>

        <div @click="deletar(doit)" class="card-footer">
          <i class="icon icon-cross float-right m-1"></i>
        </div>
      </div>
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
} from "../services/api.js";
import Filtros from "./Filtros.vue";
export default {
  components: { Filtros },
  data() {
    return {
      doits: [],
      filtros: [],
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
        this.filtros = data;
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
        }
      } catch (error) {
        alert("Não foi possivel adicionar essa tarefa.");
      }
    },

    async editar(doit) {
      try {
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

    async editando(doit) {
      doit.editando = !doit.editando;
    },

    doitValido(doit) {
      if (doit.titulo) return true;
      return alert("Você não quer fazer nada?");
    },

    filtrar(doits) {
      this.filtros = doits;
    },

    deletarCompletos() {
      try {
        const completos = this.doits.filter((doit) => doit.marcado === true);
        completos.forEach((doit) => {
          this.deletar(doit);
        });
        //await deletarCompletos(completos);
        this.listarTodos();
      } catch (error) {
        alert("Não foi possivel deletar essa tarefa. " + error);
      }
    },

    marcarTodos() {
      let contador = 0;
      this.doits.forEach((doit) => {
        if (doit.marcado) {
          contador++;
        } else {
          doit.marcado = true;
          this.editar(doit);
        }
      });
      if (contador === this.doits.length) {
        this.doits.forEach((doit) => {
          doit.marcado = !doit.marcado;
          this.editar(doit);
        });
      }
    },
  },
};
</script>

<style>
.card-body input {
  height: 24px;
}
</style>