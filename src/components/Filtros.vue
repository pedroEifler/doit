<template>
  <div id="filtros">
    <div class="container pt-2">
      <div class="columns text-center">
        <div class="column col-12">
          <div class="btn-group btn-group-block">
            <button
              class="btn btn-primary btn-sm"
              @click.prevent="$emit('todos', filtrarTodos(doits))"
            >
              Todos
            </button>
            <button
              class="btn btn-primary btn-sm"
              @click.prevent="$emit('ativos', filtrarAtivos(doits))"
            >
              Ativos
            </button>
            <button
              class="btn btn-primary btn-sm"
              @click.prevent="$emit('completos', filtrarCompletos(doits))"
            >
              Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    doits: { type: Array, required: true },
  },

  methods: {
    filtrarTodos(doits) {
      return doits.filter((doit) => doit);
    },
    filtrarAtivos(doits) {
      return doits.filter((doit) => !doit.marcado);
    },
    filtrarCompletos(doits) {
      return doits.filter((doit) => doit.marcado);
    },
  },
};
</script>

<style>
</style>