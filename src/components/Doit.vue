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
          <span>
            {{ doit.titulo }}
          </span>
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
#doit {
  width: 500px;
  margin: auto;
}
</style>