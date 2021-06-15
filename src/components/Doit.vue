<template>
  <div id="doit">
    <div v-bind:class="{ 'bg-secondary': doit.marcado }" class="card mt-1 p-2">
      <div class="d-flex">
        <div class="card-header">
          <label class="form-switch m-0">
            <input
              @click="$emit('toggle', doit)"
              :checked="doit.marcado"
              type="checkbox"
            />
            <i class="form-icon"></i>
          </label>
        </div>
        <div class="card-body">
          <div v-if="doit.editando">
            <span>
              <input
                class="form-input"
                v-model="doit.titulo"
                @keydown.enter="$emit('editar', doit)"
                @dblclick="$emit('editar', doit)"
              />
            </span>
          </div>
          <div @dblclick="$emit('editando', doit)" v-else>
            <span>
              {{ doit.titulo }}
            </span>
          </div>
        </div>

        <div @click="$emit('click', doit)" class="card-footer">
          <i class="icon icon-cross float-right m-1"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    doit: { type: Object, required: true },
  },
};
</script>

<style>
.card-body input {
  height: 24px;
}
</style>